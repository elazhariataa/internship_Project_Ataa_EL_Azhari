import { Button } from '@mui/material';
import TraineDashboard from '../traineeDashboard/traineeDashboard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';



function UpdateTestimonial(){
    const { id } = useParams();
    const navigate = useNavigate()
    const [content,setContent] = useState('');

    useEffect(()=>{
        const getData  = async()=>{
            const res = await axios.get(`http://localhost:5002/testimolial/spcTestimonial/${id}`);
            return res.data;
        }
        getData()
        .then((testimo)=>{
            setContent(testimo.content)
        })
        .catch((error)=>{
            console.log("error geting data",error)
        })
    },[])
    const updateTesto = ()=>{
        const config = {
            method : 'put',
            url : `http://localhost:5002/testimolial/update/${id}`,
            data : {
                content : content
            }
        }
        axios(config)
        .then((result)=>{
            Swal.fire({
                icon: 'success',
                title: 'Testimolial updated successfully',
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/testimonialList')
        })
        .catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error during updating testimolial',  
            })
            console.log(error.response)
        })
    }
    return <TraineDashboard>
        <div className='addTestimolialHeader'>
            <h1>Share your testimonial with us</h1>
        </div>
        <div className='addTestimolialContent'>
            <div className='createTestimolials'>
                <textarea name="content" id="content" cols="30" rows="10" value={content} onChange={(e)=>setContent(e.target.value)} placeholder='Write your testimolial here...'>

                </textarea>
                <Button variant="contained" sx={{backgroundColor:"#547a97"}} onClick={()=>updateTesto()}>Update your Testimolial</Button>
            </div>
            <div className='addTestimolialsPic'>
                <img src={require('../../images/Feedback-bro.png')} alt="" />
            </div>
        </div>
</TraineDashboard>
}


export default UpdateTestimonial;