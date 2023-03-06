import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic ,faHeart,faHashtag,faPlus} from '@fortawesome/free-solid-svg-icons'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useEffect,useContext,useState } from 'react'

import {getlocation} from '../actions/auth'
import { connect } from 'react-redux'

const Playlist=({getlocation,user,access})=>{
  getlocation()
  let [playlist,setplaylist]=useState([])
  const navigate=useNavigate()
  let getplaylist=async()=>{
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/getplaylist/${user.id}`, config);
        // const art=  await axios.get(`${process.env.REACT_APP_API_URL}/api/song/?q=${data}`, config);
        console.log(res.data)
        setplaylist(res.data)
    } catch (err) {
        console.log('something went wrong')
    }   
}

let createplaylist=async(e)=>{
  e.preventDefault()
  const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${access}`,
          'Accept': 'application/json'
      },
  };
  const body =JSON.stringify({'title':e.target.title.value,'username':e.target.username.value});
  try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/playlist/`,body, config);
      const playlistdata=res.data
      navigate(`/playlist/${playlistdata.id}`)
  } catch (err) {
      console.log('something went wrong')
  }   
}

  useEffect(()=>{
    getplaylist()
  },[])
    return(
        <>
          <div className="px-1 py-1 md:px-3 md:py-2 lg:px-6 lg:py-3 bg-gradient-to-b from-purple-700 box-content h-auto">
           
            <div className="w-full ">
                        <div className='p-3 md:p-4 lg:p-5 w-full'>
                            
                                <div className='flex flex-wrap'>
                                  <div className='h-32 w-32 md:h-44 md:w-44 lg:h-56 lg:w-56  flex justify-center items-center bg-gradient-to-br from-purple-700 via-purple-500  to-purple-300'>
                                  <i ><FontAwesomeIcon icon={faMusic} className="text-white text-3xl md:text-7xl md:text-7xl"/></i>
                                  </div>
                                {/* <img src='https://m.media-amazon.com/images/I/71a37QykgSL._SY355_.jpg' alt="cover" className='h-56 w-auto'/> */}
                                <div className=' lg:ml-2 flex flex-col justify-end md:p-1 lg:p-2'>
                                <form onSubmit={createplaylist}>
                                <h1 className='text-sm md:text-md lg:text-md font-semibold text-white tracking-wide'>PLAYLIST</h1>
                                <h1 className='text-xl md:text-3xl lg:text-5xl font-extrabold tracking-wide pb-2 md:pb-3 lg:pb-5'><input type='text' name='title' placeholder='Playlist Name' required/></h1>
                                <div className='flex justify-between items-center'>
                                <h2 className='text-sm text-lightest tracking-wide '><input type='text' name='username' value={`${user.id}`} hidden></input></h2>
                                <button type='submit' className='text-white font-semibold border rounded px-2'><i><FontAwesomeIcon icon={faPlus} className="text-white text-72xl "/></i></button>
                                </div>
                                </form>
                                </div>
                                </div>   
                        </div>
                    </div>
                    
                    {playlist.map((playlists)=>(
                      <Link to={`/playlist/${playlists.id}`}>
                        <div className='md:mb-2 lg:mb-2 p-2 w-full h-14'>
                          <div className='rounded-lg shadow-md bg-light hover:md:bg-light'>
                              <div className='flex flex-wrap justify-between'>
                                  <div className='p-2 md:p-4 lg:p-4 items-start'>
                                     <h1 className='text-md font-semibold text-white tracking-wide'>{playlists.title}</h1>
                                  </div>
                              </div>   
                          </div>
                      </div>
                      </Link>
                      
                    ))}
                    
            </div>
          
        </> 
    )
}
const mapStateToProps = state=>({
  user:state.auth.user,
  access:state.auth.access
})


export default connect(mapStateToProps,{getlocation})(Playlist)