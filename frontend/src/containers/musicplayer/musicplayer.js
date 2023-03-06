import ReactAudioPlayer from 'react-audio-player';

import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";


const Musicplayer=({song,access})=>{
    // let {song}=useContext(AuthContext)

    return(
        <>
        <div className="w-full sticky h-[16vh] md:h-[12vh] lg:h-[12vh] bg-light mb-10 md:mb-0">
        <div className="w-full h-full">
        {access?(
            <>
         {song?(
            <>
              
                        <div  className='p-0 md:p-2 lg:p-2 w-full '>
                            <div className=' rounded-lg shadow-md hover:bg-light flex md:flex-row'>
                                <div className='hidden md:flex md:w-3/12 lg:flex flex flex-row items-center justify-betwween'>
                                 <img src={song.img} alt="coverimg" className='h-7 md:h-12 lg:h-12 w-auto shadow'/>
                                <div className=' m-2 items-start'>
                                <h1 className='text-m font-semibold text-white tracking-wide'>{song.title}</h1>
                                <h2 className='text-sm text-lightest tracking-wide pb-0'></h2>
                                </div>
                                </div> 
                                <div className='w-full md:w-9/12'>
                                <ReactAudioPlayer className='bg-white rounded w-full' src={song.song} autoPlay controls/>  
                                </div>
                            </div> 
                        </div>
        
            </>
         )
         :(
           <>
               
           </>
         )} 
         </>
         ):(<>
         <div  className='p-2 w-full h-full bg-gradient-to-b from-indigo-700'>
                            <div className=' rounded-lg shadow-md hover:bg-light flex justify-between items-center'>
                                <div className='flex flex-row items-center'>
                                
                                <div className="justify-top items-center">
                                     <i><FontAwesomeIcon icon={faMusic} className="mt-1  text-white text-3xl"/></i>
                                </div>
                                <div className=' m-2 items-start'>
                                <h1 className='text-m font-semibold text-white tracking-wide'>Preview of Aura</h1>
                                <h2 className='text-sm text-lightest tracking-wide pb-0'>Sign up to get unlimited songs.</h2>
                                </div>
                                </div>
                                <button className="bg-white rounded-full h-10 py-1 px-3 items-center" >
                                    <Link to='/signup'><p className='text-black font-semibold text-xs mr-1'>Signup</p></Link>  
                                </button> 
                                
                            </div> 
                </div>

         </>)}
         </div>  

        </div>
        </>
    )
}
const mapStateToProps = state=>({
    isAuthenticated:state.auth.isAuthenticated,
    song:state.auth.song,
    access:state.auth.access
})
export default connect(mapStateToProps,{})(Musicplayer)