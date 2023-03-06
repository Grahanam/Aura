
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { setSong } from "../../actions/auth";
const Playbutton=({song,setSong})=>{
    const play=()=>setSong(song)
    return(
        <>
           <FontAwesomeIcon className="icon-controller mt-1" icon={faPlay} onClick={play}/>
        </>
    )
}

export default connect(null,{setSong})(Playbutton)