import React,{useState,useEffect,useContext} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic} from '@fortawesome/free-solid-svg-icons'
import Playbutton from '../buttons/playbutton'
import axios from 'axios'
import { connect } from 'react-redux'

const Likedsongcard=({song_id,song})=>{
    let [Song,setsong]=useState([])
    let getsinglesong=async()=>{
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/song/${song_id}/`, config);
            setsong(res.data)
        } catch (err) {
            console.log('something went wrong')
        }   
    }

    useEffect(()=>{
      getsinglesong()
    },[])
    return(
        <> 
            <div className="flex flex-row items-center align-center justify-center py-2 p-6">
               <div className='w-2/12'>
                   <i className='text-white mt-2 text-white text-sm md:text-lg lg:text-lg'>
                    {Song===song?(<FontAwesomeIcon icon={faMusic} className=" text-white text-sm md:text-lg lg:text-lg"/>):(<Playbutton song={Song}/>  )}      
                   </i>
               </div>
               <div className='w-8/12'>
                   <h1 className='text-sm md:text-xl lg:text-xl font-medium text-white tracking-wide'>{Song.title}</h1>
               </div>
               <div className='w-2/12'>
               <h1 className='text-sm md:text-xl lg:text-xl font-medium text-white tracking-wide'>2:39</h1>
               </div>
         </div>
        </>
    )
}
const mapStateToProps = state=>({
    song:state.auth.song

    
  })

export default connect(mapStateToProps,{})(Likedsongcard)