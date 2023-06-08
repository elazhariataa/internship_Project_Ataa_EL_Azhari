import { Button, Divider, TextField } from '@mui/material'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import Dashboard from '../dashboard/adminDashboard'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';


function UpdateMembership(){
    const { id } = useParams();
    const navigate = useNavigate()
    const [name,setName] = useState('');
    const [offers,setOffers] = useState([]);
    const [offer,setOffer] = useState('');
    const [classesNumber,setClassesNumber] = useState('');
    const [personalClassesNumber,setPersonalClassesNumber] = useState('');
    const [originPic,setOriginPic] = useState('')
    const [image,setImage] = useState('');
    const [monthlyPrice,setMonthlyPrice] = useState('');
    const [quarterlyPrice,setQuarterlyPrice] = useState('');
    const [annualPrice,setAnnualPrice] = useState('');
    const [changed,setChanged] = useState(false);

    useEffect(()=>{
        const getData = async()=>{
            const res = await axios.get(`http://localhost:5001/membership/spcMembership/${id}`);
            return res.data
        }
        getData()
        .then((membership)=>{
            setName(membership.name)
            setOffers(membership.offers)
            setClassesNumber(membership.classesNumber)
            setPersonalClassesNumber(membership.personalClassesNumber)
            setImage(membership.image)
            const getData2 = async ()=>{
                const res2 = await axios.get(`http://localhost:5001/membershipPrice/spcPrices/${membership.id}`);
                return res2.data
            }
            getData2()
            .then((prices)=>{
                setMonthlyPrice(prices.monthlyPrice)
                setQuarterlyPrice(prices.quarterlyPrice)
                setAnnualPrice(prices.annualPrice)
            })
            .catch((err)=>{
                console.log("prices error",err.response)
            })
            
        })
        .catch((error)=>{
            console.log("membership error", error.response)
        })
    },[changed])
    const addOffer = ()=>{
        setOffers([...offers,offer])
        setOffer('');
    }
    const deleteOffer = (offerToDelete)=>{
        setOffers((prevOffers)=> prevOffers.filter((offer)=> offer !== offerToDelete ));
    }
    const updateMembership = ()=>{
        const config = {
            method : "put",
            url : `http://localhost:5001/membership/updateMembershipPlan/${id}`,
            data : {
                name :name,
                offers : offers,
                classesNumber : classesNumber,
                personalClassesNumber : personalClassesNumber,
            }
        }
        axios(config)
        .then((result)=>{
            const conf = {
                method : "put",
                url : `http://localhost:5001/membershipPrice/updateMembershiPrices/${id}`,
                data : {
                    monthlyPrice : monthlyPrice,
                    quarterlyPrice : quarterlyPrice,
                    annualPrice : annualPrice
                }
            }
            axios(conf)
            .then((res)=>{
                Swal.fire({
                    icon: 'success',
                    title: 'Membership updated successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/membershipList')
            })
            .catch((err)=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'error updating membership',  
                  })
                  console.log(err.response)
            })
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'error updating membership',  
              })
              console.log(error.response)
        })
    }

    const updatePic = ()=>{
        const formData = new FormData();
        formData.append('image',  image);
        axios.put(`http://localhost:5001/membership/updatePhoto/${id}`, formData, {
            
        }).then((res) => {
            setChanged(!changed)
            Swal.fire({
                icon: 'success',
                title: 'membership photo updated successfully',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error during updating membership photo',  
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
                            
                            <img src={image} alt="" width="200px" height="200px" />
                            <Button
                                variant="contained"
                                component="label"
                                sx={{width : "400px"}}
                            >
                                Upload New Image
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e)=>setImage(e.target.files[0])}
                                />
                            </Button>
                            <Button onClick={()=>updatePic()} variant="contained" color="success" sx={{width : "400px",marginTop: "5px"}}>
                                Save uploaded image
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
                        <button className='validateMembership' onClick={()=>updateMembership()}>Update Membership</button>
                    </div>
                </div>
            
        </Dashboard>
    )
}


export default UpdateMembership;