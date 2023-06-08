import './coachesList.css';
import Dashboard from "../dashboard/adminDashboard";
import { Box, Button, Card, Checkbox, InputAdornment, OutlinedInput, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


function CoachesList(){
    const [coashes,setCoashes] = useState([]);
    const [searchQuery,setSearchQuery] = useState("")

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get("http://localhost:5000/coash/all")
            return res.data;
        }
        getData()
        .then((coashes)=>{
            setCoashes(coashes)
        })
        .catch((error)=>{
            console.log(error.response)
        })
    })

    const deleteCoash = (id)=>{
        const config = {
            method : "delete",
            url : `http://localhost:5000/coash/delete/${id}`
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
                        'Coash has been deleted.',
                        'success'
                      )
                })
                .catch((error)=>{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error deleting coash',  
                      })
                      console.log(error.response)
                })
              
              
            }
          })
        
    }
    return(
        <Dashboard>
            <div className="coachesListHearder">
                <h1>Coaches List</h1>
                <div className='coachesListHearderActions'>
                    <div className='impExp'>
                        <Button
                            color="inherit"
                            startIcon={(
                            <SvgIcon fontSize="small">
                                <KeyboardDoubleArrowUpIcon />
                            </SvgIcon>
                            )}
                        >
                            Import
                        </Button>
                        <Button
                            color="inherit"
                            startIcon={(
                            <SvgIcon fontSize="small">
                                <KeyboardDoubleArrowDownIcon />
                            </SvgIcon>
                            )}
                        >
                            Export
                        </Button>
                    </div>
                    <div>
                        <Button variant="contained" sx={{backgroundColor:"#3f5365"}} disableElevation
                            component={Link}
                            to="/addCoash"
                        >
                            + Add Coach
                        </Button>
                    </div>
                </div>
                <div className='coashSearchBar'>
                    <OutlinedInput
                        defaultValue=""
                        fullWidth
                        placeholder="Search customer"
                        type='text'
                        name="searchQuery"
                        onChange={(e)=>setSearchQuery(e.target.value)}
                        value={searchQuery}
                        startAdornment={(
                            <InputAdornment position="start">
                            <SvgIcon
                                color="action"
                                fontSize="small"
                            >
                                <SearchIcon />
                            </SvgIcon>
                            </InputAdornment>
                        )}
                        sx={{ maxWidth: 500}}
                    />
                </div>
            </div>
            {/* ------------------------------------ table ------------------------- */}
            <div className='coachesTable'>
                <Card>
                {/* <Scrollbar> */}
                    <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                First Name
                                </TableCell>
                                <TableCell>
                                Last Name
                                </TableCell>
                                <TableCell>
                                Email
                                </TableCell>
                                <TableCell>
                                Phone
                                </TableCell>
                                <TableCell>
                                Username
                                </TableCell>
                                <TableCell>
                                Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {coashes && 
                            coashes
                            .filter((item) =>
                                item.userName.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            .map((item,index)=>
                                <TableRow key={index} sx={{'&:hover':{backgroundColor: "#eee"}}}>
                                    <TableCell>
                                    {item.firstName}
                                    </TableCell>
                                    <TableCell>
                                    {item.lastName}
                                    </TableCell>
                                    <TableCell>
                                    {item.email}
                                    </TableCell>
                                    <TableCell>
                                    {item.phone}
                                    </TableCell>
                                    <TableCell>
                                    {item.userName}
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={()=>deleteCoash(item.id)} variant="outlined" color="error" size="small">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )}
                            
                        </TableBody>
                    </Table>
                    </Box>
                {/* </Scrollbar> */}
                </Card>
            </div>
        </Dashboard>
    )
}

export default CoachesList;