import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMusic,faClock,faHashtag,faSearch,faPlus,faX} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import React,{ useEffect, useState } from "react";
import axios from 'axios';

import Playbutton from "../components/buttons/playbutton";

import Playlistsong from "../components/playlistsong/playlistsong";

import { connect } from "react-redux";
import { getlocation } from "../actions/auth";


const Singleplaylist = ({access,user,getlocation}) => {
  getlocation()
  const [search, setSearch] = useState("");
  let [playlist, setplaylist] = useState([]);
  let [songs, setsong] = useState([]);
  let [playlistsong,setplaylistsong]=useState([])
  const params = useParams();
  const navigate = useNavigate();
  let getplaylist=async()=>{
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/playlist/${params.id}`, config);
        setplaylist(res.data);
      let data1=res.data
      let songs=data1.songs
      setplaylistsong(songs)
    } catch (err) {
        console.log('something went wrong')
    }   
}
let getsongs=async()=>{
  const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${access}`,
          'Accept': 'application/json'
      }
  };
  try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/song/?q=${search}`, config);
      setsong(res.data);
  } catch (err) {
      console.log('something went wrong')
  }   
}
  const inputEvent = (e) => {
    const data = e.target.value;
    setSearch(data);
  }
  let updateplaylist=async(e)=>{
    e.preventDefault()
    const config = { 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            'Accept': 'application/json'
        },
    };
    const body =JSON.stringify({'songid':e.target.songid.value,});
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/playlistupdate/${params.id}`,body, config);
        
        getplaylist()
    } catch (err) {
        console.log('something went wrong')
        alert("unsuccessfull")
    }   
  }
  const playlistdelete=async()=>{
    const config = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${access}`,
          'Accept': 'application/json'
      },
  };
  
  try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/playlist/delete/${playlist.id}`, config);
      console.log(res.data)
      navigate(`/playlist`)
  } catch (err) {
      console.log('something went wrong')
  }  
  
  }

  useEffect(() => {
    getplaylist();
    getsongs();
  }, [search]); 
  return (
    <>
      <div className="border-lightest border-b-2">
        <div className=" px-6 py-3 bg-gradient-to-b from-purple-700 box-content h-auto">
          <div className="w-full ">
            <div className="p-5 w-full">
              <div className="flex flex-wrap">
                <div className="h-56 w-56  flex justify-center items-center bg-gradient-to-br from-purple-700 via-purple-500  to-purple-300">
                  <i><FontAwesomeIcon icon={faMusic} className="text-white text-7xl "/></i>
                  
                </div>
                {/* <img src='https://m.media-amazon.com/images/I/71a37QykgSL._SY355_.jpg' alt="cover" className='h-56 w-auto'/> */}
                <div className="ml-2  flex flex-col justify-end p-2">
                  
                
                  <h1 className="text-m font-semibold text-white tracking-wide"> PLAYLIST</h1>
                  <h1 className="text-6xl font-extrabold text-white tracking-wide pb-5">{playlist.title}</h1>
                  <h2 className="text-sm text-lightest tracking-wide ">{user.name}</h2>
                </div>
              </div>
            </div>
          </div>
         
          
          <div className="p-4 flex justify-between">
          {(playlistsong?.length>0)?(
            <div className="flex w-11 rounded-full bg-green m-3 p-2 align-center justify-center ">
              
              <i className="text-xl">
                <Playbutton song="song" />
                
              </i>
            </div>
            ):(<div className="flex w-11 rounded-full m-3 p-2 align-center justify-center ">
              
            </div>)}
            
            <div className="flex p-2 md:p-4 lg:p-4 items-start justify-self-end "><i onClick={playlistdelete}><FontAwesomeIcon icon={faX} className="text-white text-m  "/></i></div>
          </div>
          
          {(playlistsong?.length>0)?(
            <>
            
          <div className="flex flex-row items-center py-2 align-center border-lightest border-b-2 p-6">
            <div className="w-2/12">
              <i><FontAwesomeIcon icon={faHashtag} className="mt-2 text-lightest text-l"/></i>
            </div>
            <div className="w-8/12">
              <h1 className="text-l font-medium text-lightest tracking-wide">Title</h1>
            </div>
            <div className="w-2/12">
              <i>
                <FontAwesomeIcon
                  icon={faClock}
                  className="mt-2 text-lightest text-l"
                />
              </i>
            </div>
          </div>
          
          
          <ul>
        {playlistsong.map((item) => (
          <li key={item}>
          <Playlistsong playlistid={params.id} songid={item} songcall={getplaylist}/>
          {/* <Navigator id={item}></Navigator> */}
          {/* <Playlistsongclass  songid={item}/> */}
          </li>
        ))}
      </ul>
          </>
          ):(
            <></>
          )}
          
        </div>
      </div>
      <div className="mx-4 mt-10">
          <h1 className="pl-2 text-2xl font-semibold text-white tracking-wider hover:underline ">Let's find something for your playlist</h1>
      </div>
      <div className="flex mx-5 my-4 bg-white rounded-full p-2">
        <i><FontAwesomeIcon className="mx-2" icon={faSearch} /></i>
        <form>
          <input type="text" id="search" className="w-56 border-0 outline-0" placeholder="Search for songs" value={search} onChange={inputEvent}/>
          {/* <button type="submit">search</button> */}
        </form>
      </div>

      <div className="px-6 py-3 mb-10">
        
        <div className="w-full">
          {songs.map((song) => (
            <div className="p-2 w-full h-14 flex justify-between  items-center">
            <Link to={`/song/${song.id}`}>
                <div className="p-3 rounded-lg shadow-md w-full">
                  <div className="flex flex-wrap">
                    <img className="h-14 w-auto shadow" alt="" />
                    <div className="m-2 items-start">
                      <h1 className="text-m font-semibold text-white tracking-wide">
                        {song.title}
                      </h1>
                      <h2 className="text-sm text-lightest tracking-wide pb-0">
                        Song
                      </h2>
                    </div>
                  </div>
                </div> 
            </Link>
            <form onSubmit={updateplaylist}>
              <input type='text' name="songid" readOnly value={song.id} hidden/>
            <button type='submit' className='text-white font-semibold border rounded px-2'><i><FontAwesomeIcon icon={faPlus} className="text-white text-72xl "/></i></button>
            </form>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state=>({
  user:state.auth.user,
  access:state.auth.access
})
export default connect(mapStateToProps,{getlocation})(Singleplaylist)