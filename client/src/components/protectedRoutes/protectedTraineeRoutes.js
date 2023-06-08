import { useEffect, useState } from 'react';
import {Navigate,useLocation} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ProtectedTraineeRoutes = ({children})=>{
    const token = cookies.get("Token");
    const role = cookies.get("role");
    const userId = cookies.get("UserId");
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
   
    
    
    let location = useLocation();

    useEffect(()=>{
        const getData = async () => {
            try {
              const res = await axios.get(`http://localhost:5000/trainee/spcTrainee/${userId}`);
              setUser(res.data);
            } catch (error) {
              console.log(error.response)
            } finally {
              setLoading(false);
            }
          };
      
          getData();
        
    },[userId])

    if(!token){
        return <Navigate to="/login" state={{from:location}} replace/>
    }

    if (loading) {
      return <div>Loading...</div>; 
    }
    if(user.role !== "Trainee"){
      return <Navigate to="/page401" state={{from:location}} replace/>
    }
    
    if(!user.membershipId){
        return <Navigate to="/page403" state={{from:location}} replace/>   
    }

    return children;
}


export default ProtectedTraineeRoutes;