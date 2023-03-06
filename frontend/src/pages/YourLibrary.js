import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic ,faHeart,faHashtag,faClock} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

import { useEffect,useContext,useState } from 'react'
// import useAxios from '../../utils/useAxios'
import axios from 'axios'
import Followartistcard from '../components/followartistcard/followartistcard'
import { getlocation } from '../actions/auth'

import { connect } from 'react-redux'

const Yourlibrary=({getlocation,user,access})=>{
    getlocation()
  let [following,setfollowing]=useState([])
  useEffect(()=>{
    getfollowing()
    
},[])
let getfollowing=async()=>{
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/getfollow/${user.id}`, config);
        setfollowing(res.data)
    } catch (err) {
        console.log('something went wrong')
    }   
}

    return(
        <>
          <div className='py-6 px-3'>
                
                { following.length>0 ?(
                <>
                <div className=" Following">
                <h1 className="pl-2 text-2xl font-semibold text-white tracking-wider hover:underline ">Artists</h1>
                </div>
                <div className='flex flex-row' >
                  
                  {following.map(followings=>(
                    // <h1 className='text-white'>{song.song}</h1>
                    <Followartistcard artist_id={followings.artist} key={followings.id} access={access}/>
                  ))

                  }
                </div>
                </>
                ): (
                <>
                <div className="flex flex-col items-center py-2">
                  <i ><FontAwesomeIcon icon={faMusic} className="mt-10 text-white text-md md:text-xl lg:text-xl"/></i>
                  <h1 className='text-2xl md:text-3xl lg:text-3xl my-4 font-semibold text-white tracking-wide'>Follow your first artist</h1>
                  <h1 className='text-md text-center md:text-xl lg:text-xl font-medium text-white tracking-wide pb-5'>Follow artists you like by tapping the follow button.</h1>
                  <Link to="/search" className="" activeClassName="active" >
                  <button className='text-m font-semibold tracking-wide text-black py-3 px-6 bg-white rounded-full '>Find artists</button>
                  </Link>
                </div>
                </>
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

export default connect(mapStateToProps,{getlocation})(Yourlibrary);