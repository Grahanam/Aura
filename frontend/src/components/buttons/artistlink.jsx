import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"



const ArtistLink=({id,access})=>{
    let [artist,setArtist]=useState([])
let getartist=async()=>{
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/artist/${id}/`, config);
        setArtist(res.data);
    } catch (err) {
        console.log('something went wrong')
    }   
  }
    useEffect(()=>{
       getartist()
    },[])

    return(
        <>
         {artist.name}
        
        </>
    )
}
export default ArtistLink