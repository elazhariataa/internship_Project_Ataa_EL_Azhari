import { useEffect, useState } from 'react';
import TraineDashboard from '../traineeDashboard/traineeDashboard';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import './traineeMembership.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const cookies = new Cookies()



function TraineeMembership(){
    const userId = cookies.get('UserId');
    const [user,setUser] = useState({});
    const [membership,setMembership] = useState({});

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get(`http://localhost:5000/trainee/spcTrainee/${userId}`);
            return res.data;
        }
        getData()
        .then((user)=>{
            setUser(user)
        })
        .catch((error)=>{
            console.log("no data",error.response)
        })
    },[])

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get(`http://localhost:5001/membership/spcMembership/${user.membershipId}`);
            return res.data;
        }
        getData()
        .then((membership)=>{
            setMembership(membership)
            console.log(membership)
        })
        .catch((error)=>{
            console.log("no data",error.response)
        })
    },[user])
    return (
        <TraineDashboard>
            <div className="traineeMembershipHeader">
                <h1>WE ARE HAPPY YOU JOINED OUR COMMUNITY</h1>
            </div>
            <div className='traineeMembershipMain'>
                <div className='traineeMemDetails'>
                    <Card sx={{margin:"10px",marginRight:"20px"}}>
                        <CardContent  sx={{marginBottom:"10px"}}>
                        <Box
                            sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                            }}
                        >
                            <Avatar
                              src={user.image}
                            sx={{
                                height: 80,
                                mb: 2,
                                width: 80
                            }}
                            />
                            <Typography
                                gutterBottom
                                variant="h5"
                                sx={{fontWeight:"bold"}}
                            >
                            {user.userName}
                            </Typography>
                            <Typography
                                sx={{fontSize: "27px"}}
                            >
                                You subscribed for
                            </Typography>
                            <Box sx={{display:"flex",flexDirection:"row",alignItems:"center"}}>
                                {membership?.name} <img src={membership?.image} width="100px" heieght="100px"/>
                            </Box>
                            <Box sx={{marginBottom:"20px"}}>
                                <Typography sx={{color:"green",marginBottom:'10px'}}>You have right to:</Typography>
                                {membership && membership.offers?.map((item)=>
                                    <div><DoneAllRoundedIcon/> {item}</div>
                                )}
                            </Box>
                            <Box sx={{display:"flex",flexDirection:"row"}}>
                                <Typography sx={{fontSize:"20px"}}>Your membership state:</Typography>
                                {user.isPaid? <Typography sx={{color:"green",marginBottom:'10px',fontSize:"20px"}}>Paid</Typography> : <Typography sx={{color:"brown",marginBottom:'10px',fontSize:"20px"}}>Not paid</Typography>}
                            </Box>
                            <Box>
                                {!user.isPaid &&
                                    <Button variant="outlined">
                                        <Link to='/membership_plans' onClick={()=>window.scrollTo(0,0)}>
                                            PAY NOW
                                        </Link>
                                        
                                    </Button>
                                }
                            </Box>
                        </Box>
                        </CardContent>
                        <Divider />
                        <CardActions sx={{display:"flex",flexDirection:"column"}}>
                            <Button
                                fullWidth
                                variant="text"
                            >
                                <Link to='/membership_plans' onClick={()=>window.scrollTo(0,0)} >
                                    UPGREAD MY MEMBERSHIP
                                </Link>
                               
                            </Button>
                        </CardActions>
                    </Card>
                </div>
                <div className='traineeMembSVG'>
                    <img src={require('../../images/E-Wallet-rafiki.png')} alt="" />
                </div>
            </div>
        </TraineDashboard>
    )
}


export default TraineeMembership;