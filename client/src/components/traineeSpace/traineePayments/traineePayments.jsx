import { Box, Button, Card, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import TraineDashboard from '../traineeDashboard/traineeDashboard';
import './traineePayments.css';
import HistoryToggleOffTwoToneIcon from '@mui/icons-material/HistoryToggleOffTwoTone';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



function TraineePayments(){
    const userId = cookies.get('UserId');
    const [payments,setPayments] = useState([]);
    const [user,setUser] = useState({});
    const [loadingPDF,setLoadingPDF] = useState(false);

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get(`http://localhost:5001/payment/userPayments/${userId}`);
            return res.data;
        }
        getData()
        .then((payments)=>{
            setPayments(payments)
        })
        .catch((error)=>{
            console.log("no data",error.response)
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
            console.log("error getting user infos", error.response)
        })
    })

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const generatePdf = (payment)=>{
        const config = {
            method : "post",
            url : `http://localhost:5001/payment/postPdfPayment`,
            data : {
                userName : user.userName,
                paymentId : payment.id,
                amount : payment.amount,
                payaidAt : payment.createdAt

            }
        }
        setLoadingPDF(true)

        axios(config)
        .then(()=>axios.get("http://localhost:5001/payment/getPdfPayment",{ responseType: 'blob' }))
        .then((res)=>{
            const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

            saveAs(pdfBlob, 'MyPayment.pdf');
            setLoadingPDF(false)
        })
    }
    return (
        <TraineDashboard>
            <div className='traineePaymentsHeader'>
                <HistoryToggleOffTwoToneIcon 
                    sx={{fontWeight:"700",fontSize:"2rem",color:"#111927",lineHeight:"1.2"}}
                />
                <h1>Payment history</h1>
            </div>
            {/* ----------------------------------- table ------------------------------ */}

            <div className='paymentsTable'>
                <Card className="card">
                {/* <Scrollbar> */}
                    <Box >
                    <Table sx={{textAlign:"center"}}>
                        <TableHead >
                            <TableRow >
                                <TableCell >
                                Payment ID
                                </TableCell>
                                <TableCell>
                                First Name
                                </TableCell>
                                <TableCell>
                                Last Name
                                </TableCell>
                                <TableCell>
                                Username
                                </TableCell>
                                <TableCell>
                                amount
                                </TableCell>
                                <TableCell>
                                pay at
                                </TableCell>
                                <TableCell>
                                receipt
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payments && payments.map((item,index)=>
                                <TableRow key={index} sx={{'&:hover':{backgroundColor: "#eee"}}}>
                                    <TableCell>
                                        {item.id}
                                    </TableCell>
                                    <TableCell>
                                        {user.firstName}
                                    </TableCell>
                                    <TableCell>
                                        {user.lastName}
                                    </TableCell>
                                    <TableCell>
                                        {user.userName}
                                    </TableCell>
                                    <TableCell>
                                        $ {item.amount}
                                    </TableCell>
                                    <TableCell>
                                        {formatDate(item.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                    <Button variant="outlined" onClick={()=>generatePdf(item)} startIcon={<CloudDownloadIcon />}>
                                        {loadingPDF ? <CircularProgress size={24} /> : "PDF"}
                                    </Button>
                                    </TableCell>
                                </TableRow>
                            )}
                            
                        </TableBody>
                    </Table>
                    </Box>
                {/* </Scrollbar> */}
                </Card>
            </div>
        </TraineDashboard>
    )
}

export default TraineePayments;