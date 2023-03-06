import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic ,faHeart,faHashtag,faClock} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'
import Likedsongcard from '../components/likedsongcard/likedsongcard'
import { getlocation } from '../actions/auth'
import { connect } from 'react-redux'

const Like=({getlocation,user,access})=>{
  
  let [likedsong,setlikedsong]=useState([])
  
  let getlikedsong=async()=>{
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/getlike/${user.id}`, config);
        setlikedsong(res.data)
    } catch (err) {
        console.log('something went wrong')
    }   
}
getlocation()
  
  useEffect(()=>{
   
    getlikedsong()
  },[])
    return(
        <>
          <div className="px-1 py-1 md:px-6 md:py-3 lg:px-6 lg:py-3 bg-gradient-to-b from-indigo-700 box-content h-auto">
           
            <div className="w-full ">
                        <div className='p-2 md:p-5 lg:p-5 w-full'>
                            
                                <div className='flex flex-wrap'>
                                  <div className='h-32 w-32 md:h-44 md:w-44 lg:h-56 lg:w-56  flex justify-center items-center bg-gradient-to-br from-indigo-700 via-indigo-500  to-indigo-300'>
                                  <i ><FontAwesomeIcon icon={faHeart} className="text-white text-4xl md:text-7xl lg:text-7xl"/></i>
                                  </div>
                                {/* <img src='https://m.media-amazon.com/images/I/71a37QykgSL._SY355_.jpg' alt="cover" className='h-56 w-auto'/> */}
                                <div className='  lg:ml-2 flex flex-col justify-end p-2'>
                    
                                <h1 className='text-sm md:text-md lg:text-md font-semibold text-white tracking-wide'>PLAYLIST</h1>
                                <h1 className='text-4xl md:text-6xl lg:text-8xl font-extrabold text-white tracking-wide  md:pb-3 lg:pb-5'>Liked Songs</h1>
                                {user.name?(<h2 className='text-sm text-lightest tracking-wide '>{user.name}</h2>):(<></>)}
                                </div>
                                </div>   
                            
                        </div>
                    </div>
            </div>
          <div className="">
              { likedsong.length>0 ?(
                <div>
                  <div className="flex flex-row items-center py-2 align-center border-lightest border-b-2 p-6">
               <div className='w-2/12'>
                   <i><FontAwesomeIcon icon={faHashtag} className="mt-2 text-lightest text-sm md:text-lg lg:text-lg"/></i>
               </div>
               <div className='w-8/12'>
                   <h1 className='text-sm md:text-lg lg:text-lg font-medium text-lightest tracking-wide'>Title</h1>
               </div>
               <div className='w-2/12'>
                   <i><FontAwesomeIcon icon={faClock} className="mt-2 text-lightest text-sm md:text-lg lg:text-lg"/></i>
               </div>
         </div>
                  {likedsong.map(song=>(
                    // <h1 className='text-white'>{song.song}</h1>
                    <Likedsongcard song_id={song.song} key={song.id}/>
                  ))

                  }
                </div>
                ): (
                <div className="flex flex-col items-center py-2">
                  <i ><FontAwesomeIcon icon={faMusic} className="mt-5 md:mt-10 lg:mt-10 text-white text-xl"/></i>
                  <h1 className='text-xl md:text-3xl lg:text-3xl my-4 font-semibold text-white tracking-wide'>Songs you like will appear here</h1>
                  <h1 className='md:text-xl lg:text-xl text-sm font-medium text-white tracking-wide pb-5'>Save songs by tapping the heart icon.</h1>
                  <Link to="/search" className="" activeClassName="active" >
                  <button className='text-m font-semibold tracking-wide text-black py-3 px-6 bg-white rounded-full '>Find songs</button>
                  </Link>
              </div>
              )
                
                }
          </div>
        </>
    )
}

const mapStateToProps = state=>({
  user:state.auth.user,
  access:state.auth.access
  
})

export default connect(mapStateToProps,{getlocation})(Like)