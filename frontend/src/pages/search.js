import React,{useEffect,useState} from 'react'
import { connect } from 'react-redux'
import { getlocation } from '../actions/auth'
import {Link} from 'react-router-dom'
import Genre from '../components/genre/genre'
import axios from 'axios'

const Search=({getlocation,songresult,artistresult,searchquery,access})=>{
    let [artist,setartist]=useState([])
    let [songs,setsong]=useState([])
    getlocation() 
    let getartists=async()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/artist/?q=${searchquery}`, config);
            // const art=  await axios.get(`${process.env.REACT_APP_API_URL}/api/song/?q=${data}`, config);
            setartist(res.data)
        } catch (err) {
            console.log('something went wrong')
        }   
    }
    let getsongs=async()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/song/?q=${searchquery}`, config);
            // const art=  await axios.get(`${process.env.REACT_APP_API_URL}/api/song/?q=${data}`, config);
            setsong(res.data)
        } catch (err) {
            console.log('something went wrong')
        }   
    }
    useEffect(()=>{
      getartists()
      getsongs()
    },[searchquery])
    
    return (
        <>
        {searchquery?(
            <>
            {songs.length>0?(
            <div className='px-1 py-1 mb-5 md:px-6 md:py-3 lg:px-6 lg:py-3 md:mb-10 lg:mb-10'>
              <div>
                  <h1 className="pl-2 text-xl md:text-2xl lg:text-2xl font-semibold text-white tracking-wider hover:underline ">Song</h1>
              </div>
                  
                      {songs.map((song)=>(
                    <div className="w-full">
                        <Link to={`/song/${song.id}`}>
                      <div className='p-2 w-full'>
                          <div className='p-3 rounded-lg shadow-md hover:bg-light'>
                              <div className='flex flex-wrap'>
                                 <img src={song.img} alt='cover img'  className='h-14 w-auto shadow'/>
                                  <div className='m-2 items-start'>
                                     <h1 className='text-m font-semibold text-white tracking-wide'>{song.title}</h1>
                                     <h2 className='text-sm text-lightest tracking-wide pb-0'>Song</h2>
                                  </div>
                              </div>   
                          </div>
                      </div>
                      </Link>
                      </div>
                      ))}    
                  
            </div>):(<></>)}
            
            {artist.length>0 ?(<div className='px-1 py-1 md:px-6 md:py-3 lg:px-6 lg:py-3'>    
                <div>
                    <div>
                        <h1 className="pl-2 text-xl md:text-2xl lg:text-2xl font-semibold text-white tracking-wider hover:underline ">Artist</h1>
                    </div>
                    <div className="w-full flex flex-wrap">
                    {artist.map((artists)=>(
                        <Link to={`/artist/${artists.id}`} >
                          <div className='p-2 w-36 md:w-48 lg:w-48'>
                              <div className='bg-dark w-full h-auto p-5 rounded-lg shadow-md hover:bg-light'>
                                <img src={artists.img} alt='cover' className='h-auto w-full shadow mb-2'/>
                                <h1 className='text-white text-sm md:text-md lg:text-md tracking-wide font-semibold'>{artists.name}</h1>
                                <h2 className='text-xs text-lightest tracking-wide pb-1'>Artist</h2>   
                              </div>
                          </div>
                        </Link>
                    ))}
         </div>
         </div>
         </div>):(<></>)} 
            
         
         </>
         ):(
            <>
            <Genre/>
            
            </>
         )} 
        </>
    )
}
const mapStateToProps = state=>({
    searchquery:state.auth.searchquery,
    songresult:state.auth.songresult,
    artistresult:state.auth.artistresult,
    location:state.auth.location,
    access:state.auth.access
})

export default connect(mapStateToProps,{getlocation})(Search)