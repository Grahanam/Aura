import axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'

const baseURL='http://15.207.87.105'

let authTokens=localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null

const axiosInstance=axios.create({
    baseURL,
    headers:{Authorization:`Bearer ${authTokens?.access}`}
})

axiosInstance.interceptors.request.use(async req=>{
    console.log('interceptor ran')
    if(!authTokens){
        authTokens=localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null
        req.headers.Authorization=`Bearer ${authTokens?.access}`
    } 
    const user=jwt_decode(authTokens.access)
    const isExpired=dayjs.unix(user.exp).diff(dayjs())<1;
    console.log('isExpired:',isExpired)
    if(!isExpired)return req

    const response=await axios.post(`${baseURL}/api/token/refresh/`,{
        refresh:authTokens.refresh
    })

    localStorage.setItem('authTokens',JSON.stringify(response.data))
    req.headers.Authorization=`Bearer ${response.data.access}` 
    
    return req
})

export default axiosInstance