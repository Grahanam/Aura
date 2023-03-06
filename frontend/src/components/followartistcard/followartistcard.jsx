import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const Followartistcard=({artist_id,access})=>{
    let [artist,setartist]=useState([])
   
    // let getsingleartist=async()=>{
    //     let response=await api.get(`api/artist/${artist_id}`)
    //     if(response.status===200)
    //     {
    //         setartist(response.data)
    //         console.log(response.data)
    //     }
    // }
    let getsingleartist=async()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/artist/${artist_id}/`, config);
            setartist(res.data)
        } catch (err) {
            console.log('something went wrong')
        }   
    }
    useEffect(()=>{
      getsingleartist()
    },[])
    return(
        <>
        <Link to={`/artist/${artist.id}`}>    
            <div className='p-2 w-48'>
                <div className='bg-dark w-full h-auto p-5 rounded-lg shadow-md hover:bg-light'>
                        <img src={artist.img} className='h-auto w-full shadow mb-2'/>
                        <h1 className='text-white text-md tracking-wide font-semibold'>{artist.name}</h1>
                        <h2 className='text-xs text-lightest tracking-wide pb-1'>Artist</h2>   
                </div>
            </div>
        </Link>     
        </>
    )
}

export default Followartistcard