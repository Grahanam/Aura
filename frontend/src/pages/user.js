import React,{useState,useEffect} from 'react';
// import {  Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Followartistcard from '../components/followartistcard/followartistcard';
import { connect } from 'react-redux';

const User=({user,access})=>{
    // let [profile,setprofile]=useState([])
    let [following,setfollowing]=useState([])
    
    useEffect(()=>{
        // getprofile()
        getfollowing()
    },[])
    // let getprofile=async()=>{
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `JWT ${access}`,
    //             'Accept': 'application/json'
    //         }
    //     };
    //     try {
    //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${user.id}`, config);
    //         setprofile(res.data)
    //     } catch (err) {
    //         console.log('something went wrong')
    //     }   
    // }
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
         <div className=" px-6 py-3 bg-gradient-to-b from-lightest via-light to-dark shadow-lg shadow-dark box-content h-auto">
            <div className="w-full ">
                <div className='p-5 w-full'>
                    <div className='flex flex-wrap'>
                        <div className='h-56 w-56 rounded-full flex justify-center items-center bg-light'>
                                 <i ><FontAwesomeIcon icon={faUser} className="text-white text-7xl "/></i>
                                 </div>
                               {/* <img src='https://m.media-amazon.com/images/I/71a37QykgSL._SY355_.jpg' alt="cover" className='h-56 w-auto'/> */}
                               <div className='ml-2 flex flex-col justify-end p-2'>
                   
                               <h1 className='text-m font-semibold text-white tracking-wide'>PROFILE</h1>
                               <h1 className='text-8xl font-extrabold text-white tracking-wide pb-5'>{user.name}</h1>
                               {following.length>0 ? (<h2 className='text-sm text-lightest tracking-wide '>{following.length} Following</h2>):(<></>)}
                               
                               </div>
                               </div>   
                           
                       </div>
                </div>
            </div>
            <br/>
            <div className='py-6 px-3'>
                
                { following.length>0 ?(
                <>
                <div className=" Following">
                <h1 className="pl-2 text-2xl font-semibold text-white tracking-wider hover:underline ">Following</h1>
                </div>
                <div className='flex flex-row'>
                  
                  {following.map(followings=>(
                    // <h1 className='text-white'>{song.song}</h1>
                    <Followartistcard artist_id={followings.artist} key={followings.id}/>
                  ))

                  }
                </div>
                </>
                ): (
                <></>
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

export default connect(mapStateToProps,{})(User)