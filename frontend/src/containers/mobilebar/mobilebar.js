import {Outlet,Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome,faSearch,faBarChart ,faAdd,faHeart} from '@fortawesome/free-solid-svg-icons'

import { connect } from "react-redux"

const Mobilebar = ({location,access})=>{
    return(
        <>
        {access?(
          <div className="w-full fixed bottom-0 inset-x-0 justify-between flex bg-black  md:hidden lg:hidden">
          {/* <div className="h-10 p-5 pb-10 mb-5 text-center">
          <Link to="" className="" activeClassName="active" >
              <span className="text-4xl font-extrabold text-white">AURA.</span>
          </Link>
          </div> */}
          <div className="flex justify-between w-full">
              <Link to="/" className="" activeClassName="active" >
                <button className={` text-lg font-semibold text-${location==='/'?'white':'lightest'} hover:text-white rounded px-3 py-2 flex items-center justify-start`}>
                <i ><FontAwesomeIcon icon={faHome} className="mx-2 text-2xl"/></i>
                  {/* <p>Home</p> */}
                </button>
              </Link>
              <Link to="/search" className="" activeClassName="active" >
                <button className={` text-lg font-semibold text-${location==='/search'?'white':'lightest'} hover:text-white rounded px-3 py-2 flex items-center justify-start`}>
                <i><FontAwesomeIcon icon={faSearch} className="mx-2 text-2xl"/></i>
                  {/* <p>Search</p> */}
                </button>
              </Link>
              <Link to="/yourlibrary" className="" activeClassName="active" >
                <button className={` text-lg font-semibold text-${location==='/yourlibrary'?'white':'lightest'} hover:text-white rounded px-3 py-2 flex items-center justify-start`}>
                  <i><FontAwesomeIcon icon={faBarChart} className="mx-2 text-2xl"/></i>
                  {/* <p>Your Library</p> */}
                </button>
              </Link>
              <Link to="/playlist" className="" activeClassName="active" >
                <button className={`w-full text-lg font-semibold text-${location==='/playlist'?'white':'lightest'} hover:text-white rounded px-3 py-2 flex items-center justify-start`}>
                  <i><FontAwesomeIcon icon={faAdd} className="mx-2 text-2xl"/></i>
                  {/* <p>Create Playlist</p> */}
                </button>
              </Link> 
              <Link to="/like" className="" activeClassName="active" >
                <button className={` w-full text-lg font-semibold text-${location==='/like'?'white':'lightest'} rounded px-3 py-2 flex items-center justify-start hover:text-white `}>
                  <i><FontAwesomeIcon icon={faHeart} className="mx-2 text-2xl"/></i>
                  {/* <p>Liked Song</p> */}
                </button>
              </Link>  
              <Outlet/>
          </div>
      </div>
        ):(
          <></>
        )}
        
        </>
    )
}
const mapStateToProps = state=>({
  location:state.auth.location,
  access:state.auth.access
})
export default connect(mapStateToProps,{})(Mobilebar)