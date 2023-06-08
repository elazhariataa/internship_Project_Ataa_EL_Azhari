import './addTestimolial.css';
import Dashboard from '../traineeDashboard/traineeDashboard';
import { Button, TextareaAutosize } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
const cookies = new Cookies()


function AddTestimolial(){
    const navigate = useNavigate()
    const testimolialCreator = cookies.get('UserId');
    const [content,setContent] = useState('');
    const addTestimorial = ()=>{
        const config = {
            method : "post",
            url : "http://localhost:5002/testimolial/add",
            data : {
                testimolialCreator : testimolialCreator,
                content : content
            }
        }
        axios(config)
        .then((result)=>{
            Swal.fire({
                icon: 'success',
                title: 'Testimolial added successfully',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/testimonialList')
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error during adding testimolial',  
            })
            console.log(error.response)
        })
    }
    return <Dashboard>
        <div className='addTestimolialHeader'>
            <h1>Share your testimonial with us</h1>
        </div>
        <div className='addTestimolialContent'>
            <div className='createTestimolials'>
                <textarea name="content" id="content" cols="30" rows="10" value={content} onChange={(e)=>setContent(e.target.value)} placeholder='Write your testimolial here...'>

                </textarea>
                <Button variant="contained" sx={{backgroundColor:"#547a97"}} onClick={()=>addTestimorial()}>Add your Testimolial</Button>
            </div>
            <div className='addTestimolialsPic'>
                <img src={require('../../images/Feedback-bro.png')} alt="" />
            </div>
        </div>
    </Dashboard>
}

export default AddTestimolial;