import React,{useContext,useState,useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause ,faHeart,faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {useParams} from 'react-router-dom'
import { connect } from "react-redux";

const Likebutton=({song_id,access,user})=>{
    let [bool,setbool]=useState(null)
    const params=useParams()
    let like=async()=>{
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${access}`,
              'Accept': 'application/json'
          }
      };
      const body=JSON.stringify({'song':song_id,'username':user.username})
      try {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/like/${user.id}/`,body, config);
          checklike()
      } catch (err) {
          console.log('something went wrong')
      }   
    }

    let checklike=async()=>{
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${access}`,
              'Accept': 'application/json'
          }
      };
      try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/likecheck/${user.id}/?song_id=${params.id}`, config);
          if(res.data===true){
            setbool(true)
         }
         else{
           setbool(false)
         }
      } catch (err) {
          console.log('something went wrong')
      }   
  } 
      useEffect(()=>{
        checklike()
      },[])
        return(
            <>
                {bool===true ?(<FontAwesomeIcon className="icon-controller text-red-700" icon={faHeart} onClick={like}/>)
                          :
                          (<FontAwesomeIcon className="icon-controller white" icon={faHeart} onClick={like}/>)}
            </>
        )
}

const mapStateToProps = state=>({
  user:state.auth.user,
  access:state.auth.access
})

export default connect(mapStateToProps,{})(Likebutton)