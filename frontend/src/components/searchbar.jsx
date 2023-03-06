import React,{ useState, useEffect,useContext} from "react";
// import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { search } from "../actions/auth";



const Searchbar = ({searchquery,search})=>{
    // const [search,setSearch] =useState("");
    // let {setSearchquery}=useContext(AuthContext)
    const inputEvent=(e)=>{
      const data = e.target.value;
      search(data)
      // setSearch(data)
      // setSearchquery(data)
    }
    return(
    <>
      <div className="flex mx-2 md:mx-5 lg:mx-5 bg-white rounded-full p-2">
      <i><FontAwesomeIcon className="mx-1 text-sm md:mx-2 lg:mx-2 text-" icon={faSearch}/></i>
        <form >
        <input type="text" id="search" className="w-56 md:w-56 lg:w-56 border-0 outline-0" placeholder="What do you want to listen to?" value={searchquery} onChange={inputEvent}/>
        {/* <button type="submit">search</button> */}
        
        </form>
      </div>
      <div style={{width:"100%"}}>
      {/* {search===""?null:<Sresult name={search}/>} */}
      </div>
    </>
    )
  }

const mapStateToProps = state=>({
    searchquery:state.auth.searchquery
})

export default connect(mapStateToProps,{search})(Searchbar)