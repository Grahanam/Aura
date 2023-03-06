import React,{useContext,useState,useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause ,faHeart,faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {useParams} from 'react-router-dom'
import { connect } from "react-redux";

const Followbutton=({artist_id,user,access})=>{
    
    let [bool,setbool]=useState(null)
    let params=useParams()
    let follow=async()=>{
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${access}`,
              'Accept': 'application/json'
          }
      };
      const body=JSON.stringify({'artist':artist_id,'username':user.username});
      try {
          const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/follow/${user.id}/`,body, config);
          checkfollow()
      } catch (err) {
          console.log('something went wrong')
      }   
    }
    
    let checkfollow=async()=>{
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${access}`,
              'Accept': 'application/json'
          }
      };
      try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/followcheck/${user.id}/?artist_id=${params.id}`, config);
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
        checkfollow()
      },[])
        return(
            <>
                {bool===true ?(<button className="text-white rounded border-lightest text-lg font-semibold border px-3 hover:border-white"  onClick={follow}>Following</button>)
                          :
                          (<button className="text-white rounded border-lightest text-lg font-semibold border px-3 hover:border-white"  onClick={follow}>Follow</button>)}
            </>
        )
}
const mapStateToProps = state=>({
  user:state.auth.user,
  access:state.auth.access
})

export default connect(mapStateToProps,{})(Followbutton)