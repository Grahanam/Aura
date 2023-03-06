import {createContext,useState,useEffect} from 'react'
// import jwt_decode from "jwt-decode"
import {useNavigate,useLocation} from 'react-router-dom'
const AuthContext=createContext()



export default AuthContext;

export const AuthProvider=({children})=>{
    
    // let [authTokens,setauthTokens]=useState(()=>localStorage.getItem('authTokens')?JSON.parse(localStorage.getItem('authTokens')):null)
    // let [user,setUser]=useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')):null)
    let [loading,setLoading]=useState(true)
    let [searchquery,setSearchquery]=useState()
    let [display,setdisplay]=useState()
    let [song,setSong]=useState()
    let [location,setlocation]=useState()
    let [playlist,setPlaylist]=useState([])
    const navigate=useNavigate()
    const locate=useLocation()

    // let loginUser=async(e)=>{
    //     e.preventDefault()
    //     console.log('form submitted')
    //     let response =await fetch('http://15.207.87.105/api/token/',{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
    //     })
    //     let data=await response.json()
    //     if(response.status===200){
    //         setauthTokens(data)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('authTokens',JSON.stringify(data))
    //         navigate('/')
    //     }else{
    //         alert('Something went wrong')
    //     }
    // }
    // let logoutUser=()=>{
    //     setauthTokens(null)
    //     setUser(null)
    //     localStorage.removeItem('authTokens')
    //     navigate('/login')
    // }
    let getLocation=()=>{
        const path =locate.pathname
        setlocation(path)
        setdisplay(path!=="/search"?false:true)
    }
    // let updateToken=async()=>{
    //     console.log('update token called!')
    //     let response =await fetch('http://localhost:8000/api/token/refresh/',{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({'refresh':authTokens?.refresh})
    //     })

    //     let data=await response.json()
    //     if (response.status===200){
    //         setauthTokens(data)
    //         setUser(jwt_decode(data.access))
    //         localStorage.setItem('authTokens',JSON.stringify(data))
    //     }else{
    //         logoutUser()
    //     }
        
    //     if(loading){
    //         setLoading(false)
    //     }
    // } 

    let contextData={
        // user:user,
        // authTokens:authTokens,
        // setUser:setUser,
        // setauthTokens:setauthTokens,
        // loginUser:loginUser,
        // logoutUser:logoutUser,
        searchquery:searchquery,
        song:song,
        setSong:setSong,
        playlist:playlist,
        setPlaylist:setPlaylist,
        setSearchquery:setSearchquery,
        setdisplay:setdisplay,
        display:display,
        getLocation:getLocation,
        location:location
    }
    // useEffect(()=>{

    //     if(authTokens){
    //         setUser(jwt_decode(authTokens.access))
    //     }
    //     setLoading(false)
        // if(loading){
        //     updateToken()
        // }
        // let fourMinutes=1000*60*4
        // let interval=setInterval(()=>{
        //     if(authTokens){
        //         updateToken()
        //     }
        // },fourMinutes)
        // return ()=> clearInterval(interval)
    // },[authTokens,loading])
    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null:children}
        </AuthContext.Provider>
    )
}