// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser,faEdit} from '@fortawesome/free-solid-svg-icons'
// import {Link, useParams} from 'react-router-dom'
import React from 'react'
import axios from 'axios'



class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            profile:[],
            activeItem:{
                id:null,
                name:'',
                img:'',
                description:'',
            },
            editing:false
        }
        this.handlechange=this.handlechange.bind(this)
        this.getCookie=this.getCookie.bind(this)
        this.handlesubmit=this.handlesubmit.bind(this)
        this.fetchprofile=this.fetchprofile.bind(this)
        this.startEdit=this.startEdit.bind(this)
    }
    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
        }

    componentDidMount(){
        this.fetchprofile()
    }
    async fetchprofile(){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/${this.props.params.id}`, config);
            this.setState({
                profile:res.data
            })
        } catch (err) {
            console.log('something went wrong')
        }   
      }

    handlechange(e){

        var { name, value } = e.target;

        this.setState({
            activeItem:{
              ...this.state.activeItem,
              [name]:value,
            }
          })
    }
    async handlesubmit(e){
    e.preventDefault()
    var url=`${process.env.REACT_APP_API_URL}/api/profileupdate/`

    if(this.state.editing===true){
      // url=`http://localhost:8000/api/task-update/${this.state.activeItem.id}`
      url=`${process.env.REACT_APP_API_URL}/api/profileupdate/${this.state.activeItem.id}/`
      this.setState({
        editing:false
      })
    }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.post(url, config);
            this.fetchprofile()
            this.setState({
                activeItem:{

                    id:null,
                    name:'',
                    img:null,
                    description:''
            }
        })
        } catch (err) {
            console.log('something went wrong')
        }   
    // fetch(url,{
    //     // body,
    //   method:'POST',
    //   headers:{
    //     'Content-type':'application/json',
    //     'x-CSRFToken':csrftoken,
    //   },
    //   body:JSON.stringify(this.state.activeItem)
    
    // }).then((response)=>{
    //    this.fetchprofile()
    //    this.setState({
    //     activeItem:{
    //         id:null,
    //         name:'',
    //         img:null,
    //         description:'',
    //     }
    //    })
    // }).catch(function(error){
    //   console.log('ERROR:',error)
    // })
    }

    startEdit(profile){
        this.setState({
            activeItem:profile,
            editing:true,
        })
    }
    
    
    
    render(){
        var profile=this.state.profile
        var self=this
    return(
        <>
        {/* <div className=" px-6 py-3 bg-gradient-to-b from-lightest via-light to-dark shadow-lg shadow-dark box-content h-auto">
            <div className="w-full ">
                <div className='p-5 w-full'>
                    <div className='flex flex-wrap'>
                        <div className='h-56 w-56 rounded-full flex justify-center items-center bg-light'>
                                 <i ><FontAwesomeIcon icon={faUser} className="text-white text-7xl "/></i>
                                 </div>
                               <div className='ml-2 flex flex-col justify-end p-2'>
                   
                               <h1 className='text-m font-semibold text-white tracking-wide'>{profile.id}</h1>
                               <h1 className='text-8xl font-extrabold text-white tracking-wide pb-5'>
                               {profile.name ?(
                                   <span>{profile.name}</span>
                               ):(
                                   <span>Username</span>
                               )}
                               </h1>
                               </div>
                               </div>   
                           
                       </div>
                </div>
            </div>
            <form onSubmit={this.handlesubmit}>
               <input onChange={this.handlechange} type="text" name="name" value={this.state.activeItem.name} placeholder="Profile name" className="p-2 rounded w-auto md:w-8/12 lg:w-8/12"/>
               <input onChange={this.handlechange} type="file" name="img" value={this.state.activeItem.img}/>
               <textarea onChange={this.handlechange} type="text" name="description" value={this.state.activeItem.description} placeholder="Description" className="p-2 rounded w-auto md:w-8/12 lg:w-8/12"/>
               <input type="submit" placeholder="Add" className=" rounded text-yellow-400 font-semibold border border-yellow-400 ml-1 px-2 py-2 hover:bg-yellow-400 hover:text-gray-800 delay-3 cursor-pointer"/>
               
            </form>
            <button onClick={()=>self.startEdit(profile)} className="p-0 px-1 mx-2 hover:bg-yellow-400 border rounded"><i><FontAwesomeIcon icon={faEdit} /></i></button> */}
         
            <div className='text-white flex justify-center items-center'>Page Still Under Developement Phase</div>

        </>
    )
   }
}
export default Profile