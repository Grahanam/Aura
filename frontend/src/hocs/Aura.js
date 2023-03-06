import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Sidebar from '../containers/sidebar/sidebar'
import Topbar from '../containers/topbar/topbar'
import Musicplayer from '../containers/musicplayer/musicplayer'
import Mobilebar from '../containers/mobilebar/mobilebar'

import Search from '../pages/search'
import YourLibrary from '../pages/YourLibrary'
import Like from '../pages/like'
import Playlist from '../pages/playlist'
import SingleArtist from '../pages/singleartist'
import SingleGenre from '../pages/singlegenre'
import Singleplaylist from '../pages/singleplaylist'
import SingleSong from '../pages/singlesong'
import Profile from '../pages/profile'
import User from '../pages/user'
import PrivateRoute from '../utils/PrivateRoute'

const  Aura=()=>{
    return(
        <>
        <div className="bg-dark h-screen">
        
        <div className="flex h-[84vh] md:h-[88vh] lg:h-[88vh]">
         <Sidebar/>
         <div className='w-full h-full relative overflow-y-scroll'>
           <Topbar/>
           
            <Routes>
              <Route path="/" exact element={<Home/>}/>
              <Route path="/search" exact element={<PrivateRoute><Search/></PrivateRoute>}/>
              <Route path="/yourlibrary" exact element={<PrivateRoute><YourLibrary/></PrivateRoute>}/>
              <Route path="/like" exact element={<PrivateRoute><Like/></PrivateRoute>}/>
              <Route path="/playlist" exact element={<PrivateRoute><Playlist/></PrivateRoute>}/>
              <Route path="/artist/:id" exact element={<PrivateRoute><SingleArtist/></PrivateRoute>}/>
              <Route path="/genre/:id" exact element={<PrivateRoute><SingleGenre/></PrivateRoute>}/>
              <Route path="/playlist/:id" exact element={<PrivateRoute><Singleplaylist/></PrivateRoute>}/>
              <Route path="/song/:id" exact element={<PrivateRoute><SingleSong/></PrivateRoute>}/>
              <Route path="/profile" exact element={<PrivateRoute><Profile/></PrivateRoute>}/> 
              <Route path="/user" exact element={<PrivateRoute><User/></PrivateRoute>}/>
              
              
            </Routes>
            
         </div>
        </div> 
         {/* music player */}
         <Musicplayer/>
        {/* <div className="w-full h-[12vh] bg-light"></div> */}
         <Mobilebar/>
      
      </div>
        </>
    )
}


export default Aura