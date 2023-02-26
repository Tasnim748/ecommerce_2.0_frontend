import LoginPage from "./loginpage";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
    let user = useSelector(state => state.sessionData);
    
    return (
        user ? props.children : <LoginPage message="Please log in first!" />
    )
}

export default PrivateRoute;