import './addCoash.css'
import { useState } from "react";
import Dashboard from "../dashboard/adminDashboard";
import { Button, TextField } from "@mui/material";
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function AddCoash(){
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [profilePic,setProfilePic] = useState('');
    const navigate = useNavigate();

    const addCoash = ()=>{
        const config = {
            method : 'post',
            url : "http://localhost:5000/coash/add",
            data : {
                firstName : firstName,
                lastName : lastName,
                email : email,
                phone : phone,
                userName : userName,
                password : password,
            }
        }
        axios(config)
        .then((result)=>{
            Swal.fire({
                icon: 'success',
                title: 'Coash added successfully',
                showConfirmButton: false,
                timer: 1500
            })

            navigate('/coachesList');
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'error creating coash',  
              })
              console.log(error.response)
        })
    }
    return(
        <Dashboard>
            <div className="addCoashHeader">
                <h1>Add Coash</h1>
            </div>
            <div className='addCoashForm'>
                <form action="">
                        <div>
                            <TextField
                                className='textField'
                                label="First Name"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                className='textField'
                                label="Last Name"
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                            
                        </div>
                        <div>
                            <TextField
                                className='textField'
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                className='textField'
                                label="Phone"
                                type="number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div>
                            <TextField
                                className='textField'
                                label="Username"
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                className='textField'
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                                margin="normal"
                            />
                        </div>
                        <div className='addCoachSave'>
                            <Button variant="contained" disableElevation onClick={()=>addCoash()}
                                sx={{backgroundColor:"#3f5365",
                                width:"100%",
                            }}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                    <div className='addUserPic'>
                        <img src={require('../../images/Add User-rafiki.png')} alt="" />
                    </div>
            </div>
        </Dashboard>
    )
}

export default AddCoash;