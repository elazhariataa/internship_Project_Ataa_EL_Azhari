import { Button, Divider, TextField } from '@mui/material'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import Dashboard from '../dashboard/adminDashboard'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './addMembership.css'
import { useState } from 'react'
import Swal from 'sweetalert2';


function AddMembership(){
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [offers,setOffers] = useState([]);
    const [offer,setOffer] = useState('');
    const [classesNumber,setClassesNumber] = useState('');
    const [personalClassesNumber,setPersonalClassesNumber] = useState('');
    const [image,setImage] = useState('');
    const [monthlyPrice,setMonthlyPrice] = useState('');
    const [quarterlyPrice,setQuarterlyPrice] = useState('');
    const [annualPrice,setAnnualPrice] = useState('');

    const addOffer = ()=>{
        setOffers([...offers,offer])
        setOffer('');
    }
    const deleteOffer = (offerToDelete)=>{
        setOffers((prevOffers)=> prevOffers.filter((offer)=> offer !== offerToDelete ));
    }
    const addMembership = ()=>{
        const formData = new FormData();
        formData.append('image',  image);
        axios.post("http://localhost:5001/membership/add", formData, {
            params: {
                name: name,
                offers: offers,
                classesNumber: classesNumber,
                personalClassesNumber: personalClassesNumber,

                monthlyPrice : monthlyPrice,
                quarterlyPrice : quarterlyPrice,
                annualPrice : annualPrice
              }
        }).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Membership added successfully',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/membershipList')
        }).catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'error creating membership',  
              })
              console.log(error.response)
        })
    }
    return (
        <Dashboard>
            <div className='addMembershipHeader'>
                <h1>Create a Membership</h1>
            </div>
            <div className='addMembershipForm'>
                    <div className='row'>
                        <div className='col'>
                        <TextField
                            sx={{width:"400px",margin:"10px"}}
                            label="Membership Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        </div>
                        <div className='col'>
                            <TextField
                                sx={{width:"400px",margin:"10px"}}
                                label="Classes number per week"
                                type="number"
                                value={classesNumber}
                                onChange={(e) => setClassesNumber(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                        <TextField
                            sx={{width:"400px",margin:"10px"}}
                            label="Personal classes number per week"
                            type="number"
                            value={personalClassesNumber}
                            onChange={(e) => setPersonalClassesNumber(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        </div>
                        <div className='col'>
                            <Button
                                variant="contained"
                                component="label"
                                sx={{width : "400px"}}
                            >
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e)=>setImage(e.target.files[0])}
                                />
                            </Button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <TextField
                                sx={{width:"400px",margin:"10px"}}
                                label="Offer"
                                type="text"
                                value={offer}
                                onChange={(e) => setOffer(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <button onClick={()=>addOffer()} className='addOffer'>Add offer</button>
                        </div>
                        <div className='col'>
                            {offers && offers.map((item)=>
                                <div id='offercol'>
                                    <div>
                                        <p><DoneAllRoundedIcon/> {item}</p>
                                    </div>
                                    <button className='deleteOffer' onClick={()=>deleteOffer(item)}>Delete</button>
                                    
                                </div>
                            )}
                        </div>
                    </div>
                    <h1 className='createPrices'>Create Prices</h1>
                    <div className='row'>
                        <div className='col'>
                            <TextField
                                sx={{width:"300px",margin:"5px"}}
                                label="Monthly Price"
                                type="number"
                                value={monthlyPrice}
                                onChange={(e) => setMonthlyPrice(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                            />
                        </div>
                        <div className='col'>
                            <TextField
                                sx={{width:"300px",margin:"5px"}}
                                label="Quarterly Price"
                                type="number"
                                value={quarterlyPrice}
                                onChange={(e) => setQuarterlyPrice(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                            />
                        </div>
                        <div className="col">
                            <TextField
                                sx={{width:"300px",margin:"5px"}}
                                label="Annual Price"
                                type="number"
                                value={annualPrice}
                                onChange={(e) => setAnnualPrice(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                            />
                        </div>
                        
                    </div>
                    <h1 className='createPrices'>Validate your Membership</h1>
                    <div className='row'>
                        <button className='validateMembership' onClick={()=>addMembership()}>Add Membership</button>
                    </div>
                </div>
            
        </Dashboard>
    )
}


export default AddMembership