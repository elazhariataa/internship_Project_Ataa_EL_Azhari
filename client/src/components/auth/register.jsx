import './login.css'
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { TextField, Button, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton,} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

function Register(){
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [userName,setUserName] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handelRegister = (e)=>{
        e.preventDefault();

        //validate form data
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }

        //form data is valid
        const config = {
            method : "post",
            url : "http://localhost:5000/trainee/register",
            data : {
                email : email,
                password : password,
                userName : userName
            }
        }
        axios(config)
        .then((result)=>{
            Swal.fire({
                icon: 'success',
                title: 'Registration passed successfully',
                showConfirmButton: false,
                timer: 1500
              })
            navigate('/login')
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Registration Error',  
              })
              console.log(error.response)
        })
    }

    const validateForm = () => {
        const errors = {};

        // Validate name
        if (userName.trim() === '') {
          errors.userName = 'Name is required';
        }
    
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
    
        // Validate confirmPassword
        if (confirmPassword.trim() === '') {
          errors.confirmPassword = 'Confirm Password is required';
        } else if (confirmPassword !== password) {
          errors.confirmPassword = 'Passwords must match';
        }
    
        return errors;
      };
    
      const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };
    return(
        <div className='LoginContent'>
            <div className='loginSection1'>
                <form >
                    <h3>Register</h3>
                    <p>Already have an account? <a href="/login">Login</a></p>
                    {errors.userName && <div className="error">*{errors.userName}</div>}
                    <TextField
                        label="Username"
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
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
                    {errors.confirmPassword && (<div className="error">*{errors.confirmPassword}</div>)}
                    <TextField
                        label="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" onClick={(e)=>handelRegister(e)} variant="contained" color="primary" className="custom-button">
                        Register
                    </Button>
                </form>
            </div>
            <div className='loginSection2'>
                <h1>Start your fitness journey today</h1>
            </div>
            
        </div>
    )
}

export default Register;