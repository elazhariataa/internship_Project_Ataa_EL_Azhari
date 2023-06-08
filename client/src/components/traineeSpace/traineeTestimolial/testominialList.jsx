import './testimonialsList.css';
import  TraineDashboard  from "../traineeDashboard/traineeDashboard"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Avatar, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const cookies = new Cookies()


function TestimonialList(){
    const navigate = useNavigate()
    const userId = cookies.get('UserId');
    const [testimonilas,setTestimonials] = useState([])
    const [user,setUser] = useState({})

    useEffect(()=>{
        const getData = async()=>{
            const res = await axios.get(`http://localhost:5002/testimolial/userTestimonials/${userId}`);
            return res.data
        }
        getData()
        .then((result)=>{
            const reversedTestimonials = result.reverse();
            setTestimonials(reversedTestimonials);
            
        })
        .catch((error)=>{
            console.log("error geting data",error.response)
        })
    })

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
            console.log("error geting data",error.response)
        })
    })

    const deleteTestimonial = (id)=>{
        const config = {
            method : "delete",
            url : `http://localhost:5002/testimolial/delete/${id}`,
        }
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios(config)
                .then((res)=>{
                    Swal.fire(
                        'Deleted!',
                        'Testimonial has been deleted.',
                        'success'
                      )
                })
                .catch((error)=>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error deleting testimonial',  
                      })
                      console.log(error.response)
                })
              
              
            }
          })
    }
    return <TraineDashboard>
        <div className="testimonilaListHeader">
            <h1>Testimonials list</h1>
            <div className='TestimonialAction'>
                <Button variant="contained" sx={{backgroundColor:"#547a97",marginBottom:"3%"}}
                    component={Link}
                    to="/addTestimolial"
                >
                    + Add Testomonials
                </Button>
            </div>
        </div>
        <div className='testimonialsList'>
            {testimonilas && testimonilas.map((item,index)=>
                <div className='testiCard-action'>
                    <div className="card" key={index}>
                        <img src={require('../../images/quote.png')} alt="" className='quote'/>
                        <p className='speech'>{item.content}</p>
                        <div className="whoIsHe">
                        <Avatar
                          src={user.image}
                          sx={{
                            height: 80,
                            mb: 2,
                            width: 80,
                          }}
                        />
                        <div className="whoIsHe2">
                            <h3>{user.userName}</h3>
                            <p>{user.role}</p>
                        </div>
                        </div>
                    </div>
                    <div className='testimonialCardAction'>
                        <Button variant='outlined' onClick={()=>navigate(`/UpdateTestimonial/${item.id}`)} sx={{margin:"6px",height:"70px",width:"200px"}} startIcon={<EditIcon/>}>
                            Edite testimonial
                        </Button>
                        <Button onClick={()=>deleteTestimonial(item.id)} variant='outlined' sx={{margin:"6px",height:"70px",width:"200px"}} color='error' startIcon={<DeleteIcon/>}>
                            Delete testimonial
                        </Button>
                    </div>
                </div>
                
            )}
        </div>
    </TraineDashboard>
}

export default TestimonialList;