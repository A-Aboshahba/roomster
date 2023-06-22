import { Navigate } from "react-router"
import { PropTypes } from 'prop-types';
function UserGurd(props) {
        if (props.getUserData.user !== null) {
            return props.children
        }
        else {
            return <Navigate to='/login' />
        }
    }
    
        UserGurd.propTypes = {
            children: PropTypes,
            getUserData: PropTypes
        }

export default UserGurd