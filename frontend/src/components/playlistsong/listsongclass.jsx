import React,{Component} from 'react'
// import useAxios from '../../utils/useAxios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faX} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import Playbutton from '../buttons/playbutton';
import Playlist from '../../pages/playlist';



class Playlistsongclass extends React.Component{
    constructor(props){
      super(props);
      this.state={
        reload:false,
        song:[]
      }
      this.deletesong=this.deletesong.bind(this)
      this.getsong=this.getsong.bind(this)
      // this.naivgate=this.navigate.bind(this)
    }
    componentDidMount(){
      this.getsong()
    }
    // refreshPage = () => {
    //   this.setState(
    //     {reload: true},
    //     () => this.setState({reload: false})
    //   )
    // }
    // navigate(){
    //   const navigation=useNavigate()
    //   navigation(`/playlist/${id}`)
    // }
    async getsong(){
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`,
              'Accept': 'application/json'
          }
      };
      try {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/song/${this.props.songid}/`, config);
          this.setState({
            song:res.data
          })
      } catch (err) {
          console.log('something went wrong')
      }   
    }
    async deletesong(){
      const config = {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `JWT ${localStorage.getItem('access')}`,
              'Accept': 'application/json'
          }
      };
      try {
          const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/playlist/song/delete/${this.props.songid}`, config);
          alert('Song removed from playlist!')
          
      } catch (err) {
          console.log('something went wrong')
      }   
    }
    // getsong(){
    //   fetch(`http://15.207.87.105/api/song/${this.props.songid}`)
    //   .then(response=>response.json())
    //   .then(data=>
    //       this.setState({
    //         song:data,
    //       })
    //    )
    // }

    render(){
      var song=this.state.song
    return(
        <> 
            <div className="flex flex-row items-center align-center justify-center py-2 p-6">
<div className="w-2/12">
  <i className="mt-2 text-white text-l"><Playbutton song={song}/></i>
</div>
<div className="w-8/12">
  <h1 className="text-xl font-medium text-white tracking-wide">{song.title}</h1>
</div>
<div className="w-2/12">
  <h1 className="text-xl font-medium text-white tracking-wide">2:39</h1>
</div>
<div className="flex p-2 md:p-4 lg:p-4 items-start justify-self-end "><i onClick={this.deletesong}><FontAwesomeIcon icon={faX} className="text-white text-m  "/></i></div>
</div>
          
        </>
    )
    }
}



export default Playlistsongclass