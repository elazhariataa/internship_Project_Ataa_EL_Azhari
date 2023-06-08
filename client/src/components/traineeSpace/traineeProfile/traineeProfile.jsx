import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField, Typography } from '@mui/material';
import Dashboard from '../traineeDashboard/traineeDashboard';
import '../../adminSpace/adminProfile/adminProfile.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
// import './traineeProfile.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
const cookies = new Cookies();


function TraineeProfile(){
    const userId = cookies.get('UserId');
    const [userName,setUserName] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [address,setAddress] = useState('');
    const [phone,setPhone] = useState('');
    const [profilePic,setProfilePic] = useState('')
    const [image,setImage] = useState('');
    const [changed,setChanged] = useState(false);

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get(`http://localhost:5000/trainee/spcTrainee/${userId}`);
            return res.data;
        }
        getData()
        .then((user)=>{
            setUserName(user.userName)
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setEmail(user.email)
            setAddress(user.address)
            setPhone(user.phone)
            setProfilePic(user.image)
        })
        .catch((error)=>{
            console.log("error geting data",error.response)
        })
    },[changed])

    const updateAdminInfos = ()=>{
        const config = {
            method : "put",
            url : `http://localhost:5000/trainee/updateTrainee/${userId}`,
            data : {
                userName : userName,
                firstName : firstName,
                lastName : lastName,
                email : email,
                address : address,
                phone : phone
            }
        }
        axios(config)
        .then((result)=>{
            setChanged(!changed)
            Swal.fire({
                icon: 'success',
                title: 'Profile updated successfully',
                showConfirmButton: false,
                timer: 1500
              })
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error during updating profile',  
            })
            console.log(error.response)
        })
    }

    const updatePic = ()=>{
        const formData = new FormData();
        formData.append('image',  image);
        axios.put(`http://localhost:5000/trainee/updatePhoto/${userId}`, formData, {
            
        }).then(res => {
            setChanged(!changed)
            Swal.fire({
                icon: 'success',
                title: 'Profile photo updated successfully',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error during updating profile photo',  
            })
            console.log(error.response)
        })
    }
    return (
      <Dashboard>
        <div className="profileHeader">
          <h1>Account</h1>
        </div>
        <div className="profileContainer">
          <div className="profilePart1">
            <Card sx={{ width: '300px', margin: '10px', marginRight: '20px' }}>
              <CardContent sx={{ marginBottom: '10px' }}>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Avatar
                    src={profilePic}
                    sx={{
                      height: 80,
                      mb: 2,
                      width: 80,
                    }}
                  />
                  <Typography
                    gutterBottom
                    variant="h5"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {userName}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    Somewhere in the world
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    GMT-00
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
                <Button fullWidth component="label">
                  Upload picture
                  <input
                    type="file"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Button>
                <Button fullWidth variant="text" onClick={() => updatePic()}>
                  Save
                </Button>
              </CardActions>
            </Card>
          </div>
          <div className="profilePart2">
            <Card className="Card">
              <CardHeader
                subheader="The information can be edited"
                title="Profile"
              />
              <CardContent sx={{ pt: 0 }}>
                <Box className="textBox">
                  <TextField
                    fullWidth
                    helperText="Please specify the first name"
                    label="First name"
                    type="text"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    value={firstName}
                    sx={{ margin: '10px' }}
                  />
                  <TextField
                    fullWidth
                    label="Last name"
                    type="text"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    value={lastName}
                    sx={{ margin: '10px' }}
                  />
                </Box>
                <Box className="textBox">
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    value={email}
                    sx={{ margin: '10px' }}
                  />
                  <TextField
                    fullWidth
                    label="Phone number"
                    type="number"
                    name="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    value={phone}
                    sx={{ margin: '10px' }}
                  />
                </Box>
                <Box className="textBox">
                  <TextField
                    fullWidth
                    label="Username"
                    type="text"
                    name="userName"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    value={userName}
                    sx={{ margin: '10px' }}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    type="text"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    value={address}
                    sx={{ margin: '10px' }}
                  />
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'flex-end', padding: '10px' }}>
                <Button
                  variant="contained"
                  sx={{ margin: '10px' }}
                  onClick={() => updateAdminInfos()}
                >
                  Save Changes
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      </Dashboard>
    );
}

export default TraineeProfile;