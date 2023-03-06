import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMusic,faX} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const Playlistsong=({songid,playlistid,songcall})=>{
    let [song,setSong]=useState([])
    const navigate=useNavigate()
    let getsong=async()=>{
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`,
              'Accept': 'application/json'
          }
      };
      try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/song/${songid}/`, config);
          setSong(res.data)
          console.log(res.data)
          console.log(playlistid)
         

      } catch (err) {
          console.log('something went wrong')
      }   
    }

    let deletesong=async()=>{
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`,
              'Accept': 'application/json'
          }
      };
      try {
          const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/playlist/song/delete/${songid}`, config);
          // alert('Song removed from playlist!')
          songcall()
          navigate(`/playlist/${playlistid}`)
          
      } catch (err) {
          console.log('something went wrong')
      }   
    }
    useEffect(()=>{
        getsong()
    },[])
    return(
        <>
        
            <div className="flex flex-row items-center align-center justify-center py-2 p-6">
<div className="w-2/12">
  <i><FontAwesomeIcon icon={faMusic} className="mt-2 text-white text-l"/></i>
</div>
<div className="w-8/12">
  <h1 className="text-xl font-medium text-white tracking-wide">{song.title}</h1>
</div>
<div className="w-2/12">
  <h1 className="text-xl font-medium text-white tracking-wide">2:39</h1>
</div>
<div className="flex p-2 md:p-4 lg:p-4 items-start justify-self-end "><i onClick={deletesong}><FontAwesomeIcon icon={faX} className="text-white text-m  "/></i></div>

</div>
          
        </>
    )
}

export default Playlistsong