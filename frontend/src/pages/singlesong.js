import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic,faHashtag,faClock} from '@fortawesome/free-solid-svg-icons'
import { useParams} from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import ArtistLink from '../components/buttons/artistlink'
import Playbutton from '../components/buttons/playbutton'
import Likebutton from '../components/buttons/likebutton'
import { connect } from 'react-redux'
import { getlocation } from '../actions/auth'
const SingleSong=({access,getlocation})=>{
    getlocation()
    const [song,setSong]=useState([])
    const [artistlink,setArtistlink]=useState([])
    const params=useParams()
    let getsong=async()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/song/${params.id}/`, config);
            setSong(res.data);
            const link=res.data
            setArtistlink(link.artist)

            
            // try{
            //     console.log(artistdata.artist)
            //     const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/api/artist/${artist.artist}/`, config);
            //     setArtist(res2.data)
            //     console.log(res2.data)
            // }catch(err){
            //     console.log('something went wrong')
            // }
        } catch (err) {
            console.log('something went wrong')
        }   
      }
    // let getartist=async()=>{
    //     let response=await api.get(`http://localhost:8000/api/artist/${song.artist}`)
    //     if(response.status===200){
    //         setArtist(response.data)
    //     }
    // }
    useEffect(()=>{
        getsong()
    },[])
    return(
        <>
        <div className="px-1 py-1 md:px-6 md:py-3 lg:px-6 lg:py-3 bg-light box-content h-auto">
           
           <div className="w-full ">
                       <div className='p-2 md:p-4 lg:p-5 w-full'>
                           
                               <div className='flex flex-wrap'>
                               <img src={song.img} alt="cover" className='h-32 md:h-44 lg:h-56 w-auto'/>
                               <div className='lg:ml-2 flex flex-col justify-end p-2'>
                   
                               <h1 className='text-sm md:text-md lg:text-md font-semibold text-white tracking-wide'>SINGLE</h1>
                               <h1 className='text-4xl md:text-6xl lg:text-8xl font-extrabold text-white tracking-wide pb-5'>{song.title}</h1>
                               <h2 className='text-sm text-lightest tracking-wide '>
                               
                                {artistlink.map((item)=>{
                                    return <span key={item}> <ArtistLink id={item} access={access}/> </span>
                                })} 
                              </h2>
                               {/* <h2 className='text-sm text-lightest tracking-wide '><ArtistLink id={song.artist} access={access}/></h2> */}
                               </div>
                               </div>   
                           
                        </div>
            </div>
           
           <div className='p-1 lg:p-4 flex'>
                <div className='flex w-11 rounded-full bg-green m-3 p-2 align-center justify-center'>
                    {/* <i><FontAwesomeIcon icon={faPlay} className="mt-1 text-black text-xl"/></i> */}
                    <i className='text-xl'><Playbutton song={song}/></i>
                </div>
                <div className='flex w-11 m-3 p-1 align-center justify-center'>
                    {/* <i><FontAwesomeIcon icon={faHeart} className="mt-1 text-white text-2xl"/></i> */}
                    <i className='text-2xl'><Likebutton song_id={song.id}/></i>
                    
                </div>
           </div>
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
         <div className="flex flex-row items-center align-center justify-center py-2 p-6">
               <div className='w-2/12'>
                   <i><FontAwesomeIcon icon={faMusic} className="mt-2 text-white text-sm md:text-lg lg:text-lg"/></i>
               </div>
               <div className='w-8/12'>
                   <h1 className='text-sm md:text-xl lg:text-xl font-medium text-white tracking-wide'>{song.title}</h1>
               </div>
               <div className='w-2/12'>
               <h1 className='text-sm md:text-xl lg:text-xl font-medium text-white tracking-wide'>{song.length}</h1>
               </div>
         </div>
         <br/>
         <br/>
         <div className=" flex items-center justify-between">
            <h1 className="pl-2 text-lg md:text-2xl lg:text-2xl font-semibold text-white tracking-wider hover:underline ">More Like {song.title}</h1>
            {/* <h2 className="pr-8 pt-2 text-xs text-lightest uppercase tracking-wider hover:underline mb-3" >See All</h2> */}
         </div>
         
         </div>
        </>
    )
}
const mapStateToProps = state=>({
    user:state.auth.user,
    access:state.auth.access
  })
  export default connect(mapStateToProps,{getlocation})(SingleSong)