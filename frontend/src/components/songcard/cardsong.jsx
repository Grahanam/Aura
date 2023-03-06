import {  Link } from "react-router-dom";
import {useContext,Component} from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause ,faHeart,faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { useState,useEffect } from "react";
import Likebutton from "../buttons/likebutton";
import { setSong } from "../../actions/auth";
import { connect } from "react-redux";


const CardSong=({song,setSong})=>{
    // let [bool,setbool]=useState(null)
    

    const play=async()=>await setSong(song)
    // let like=async()=>{
    //     console.log('data send')
    //     let response =await fetch(`http://localhost:8000/api/like/${user.username}/`,{
    //         method:'POST',
    //         headers:{
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({'song':song.id,'username':user.username})
    //     })
    //     let data=await response.json()
    //     console.log(data)
    //     checklike()
    //   }
    //   let checklike=async()=>{
    //     let response=await api.get(`/api/likecheck/${user.username}/?song_id=${song.id}`)
    //     if (response.status===200){
    //         console.log(response.data)
    //         if(response.data===true){
    //            setbool(true)
    //         }
    //         else{
    //           setbool(false)
    //         }
          
    //     }
    //   }
    
    //   useEffect(()=>{
    //     checklike()
    //   },[])
    return(
    <>
       <div className="w-full">
                        <div  className='p-2 w-full h-14 flex flex-wrap'>
                            <div className='p-3 rounded-lg shadow-md hover:bg-light'>
                                <div className='flex flex-wrap'>
                                <img src={song.img} alt="coverimg" className='h-14 w-auto shadow'/>
                                <div className='m-2 items-start'>
                                <Link to={`/song/${song.id}`}>   
                                <h1 className='text-m font-semibold text-white tracking-wide'>{song.title}</h1>
                                </Link> 
                                <h2 className='text-sm text-white tracking-wide pb-0'></h2>
                                </div>
                                </div>   
                            </div>
                            <FontAwesomeIcon className="icon-controller" icon={faPlay} onClick={play}/>
                        </div>
                        <div>
                          {/* {bool===true ?(<FontAwesomeIcon className="icon-controller text-red-700" icon={faHeart} onClick={like}/>)
                          :
                          (<FontAwesomeIcon className="icon-controller white" icon={faHeart} onClick={like}/>)} */}
                        {/* <FontAwesomeIcon className="icon-controller text-white" icon={faHeart} onClick={like}/> */}
                         <Likebutton song_id={song.id}/>
                        </div>
       </div>
    
    </>
 )
}
export default connect(null,{setSong})(CardSong)