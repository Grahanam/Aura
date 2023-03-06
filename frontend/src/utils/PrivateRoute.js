import {Navigate} from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute=({children,user})=>{
    return(<>
        {!user ?<Navigate to="/"/>:children}
        </>
    )
}
const mapStateToProps = state=>({
    user:state.auth.user
})

export default connect(mapStateToProps,{})(PrivateRoute);