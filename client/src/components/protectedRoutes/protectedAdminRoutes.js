import {Navigate,useLocation} from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ProtectedAdminRoutes = ({children})=>{
    const token = cookies.get("Token");
    const role = cookies.get("role");
    let location = useLocation();

    if(!token){
        return <Navigate to="/login" state={{from:location}} replace/>
    }
    
    if(role !== "Admin"){
        return <Navigate to="/page401" state={{from:location}} replace/>
    }

    return children;
}


export default ProtectedAdminRoutes;