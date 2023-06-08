import './login.css';
import React, { useState } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton,} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
const cookies = new Cookies();




function Login(){
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handelLogin = (e)=>{
        e.preventDefault();

        const formErrors = validateLoginForm();

        if (Object.keys(formErrors).length > 0) {
            // Form is invalid, set the errors state
            setErrors(formErrors);
            return;
            
        }

        // form data is valid 
        const config = {
            method : "post",
            url : "http://localhost:5000/admin/login",
            data : {
                email : email,
                password : password,
            }
        }
        axios(config)
        .then((result)=>{
            cookies.set("Token",result.data.token,{path:"/",});
            cookies.set('UserId', result.data.user_id, { path: '/' });
            cookies.set('role', result.data.role, { path: '/' });
            if(result.data.role === "Trainee"){
                navigate('/traineeProfile')
            }else if(result.data.role === "Admin"){
                navigate('/adminProfile')
            }
            
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.response.data.message}`,  
              })
            console.log(error.response.data.message);
        })
    }

    const validateLoginForm = () => {
        const errors = {};
      
        // Validate email
        if (email.trim() === '') {
            errors.email = 'Email is required';
        } else if (!isValidEmail(email)) {
            errors.email = 'Invalid email';
        }
      
        // Validate password
        if (password.trim() === '') {
          errors.password = 'Password is required';
        }
      
        return errors;
    };
    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    return (
        <div className='LoginContent'>
            <div className='loginSection1'>
                <form >
                    <h3>Login</h3>
                    <p>Don't have an account? <a href="/register">Register</a></p>

                    {errors.email && <div className="error">*{errors.email}</div>}
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    {errors.password && <div className="error">*{errors.password}</div>}
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" onClick={(e)=>handelLogin(e)} variant="contained" color="primary" className="custom-button">
                        Login
                    </Button>
                </form>
            </div>
            <div className='loginSection2'>
                <h1>Start your fitness journey today</h1>
            </div>
            
        </div>
    )
}

export default Login;