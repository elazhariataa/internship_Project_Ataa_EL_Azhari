import './traineesList.css';
import Dashboard from '../dashboard/adminDashboard';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function TraineesList() {
  const [trainees, setTrainees] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaidFilter, setIsPaidFilter] = useState(false);
  const [notPaidFilter, setNotPaidFilter] = useState(false);
  const [isSubscribedFilter, setIsSubscribedFilter] = useState(false);
  const [notSubscribedFilter, setNotSubscribedFilter] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('http://localhost:5000/trainee/all');
      return res.data;
    };
    getData()
      .then((trainees) => {
        setTrainees(trainees);
        console.log(memberships);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [memberships]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('http://localhost:5001/membership/all');
      return res.data;
    };
    getData()
      .then((memberships) => {
        setMemberships(memberships);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const deleteTrainee = (id) => {
    const config = {
      method: 'delete',
      url: `http://localhost:5000/trainee/delete/${id}`,
    };
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios(config)
          .then((res) => {
            Swal.fire('Deleted!', 'Trainee has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error deleting trainee',
            });
            console.log(error.response);
          });
      }
    });
  };

  const membershipState = (bool, mem) => {
    const membershipName = memberships.find((m) => m.id === mem);
    if (bool === true) {
      return (
        <Button
          size="small"
          color="success"
          variant="outlined"
          sx={{
            color: '#0d825b',
            backgroundColor: '#e2f6f0',
            borderColor: '#0d825b',
            borderRadius: '15px',
          }}
        >
          {membershipName?.name}
        </Button>
      );
    } else {
      return (
        <Button
          size="small"
          color="error"
          variant="outlined"
          sx={{
            color: '#b54708',
            backgroundColor: '#fef2e1',
            borderColor: '#b54708',
            borderRadius: '15px',
          }}
        >
          not subscribed
        </Button>
      );
    }
  };

  const paymentState = (bool) => {
    if (bool === true) {
      return (
        <Button
          size="small"
          color="success"
          variant="outlined"
          sx={{
            color: '#0d825b',
            backgroundColor: '#e2f6f0',
            borderColor: '#0d825b',
            borderRadius: '15px',
          }}
        >
          Paid
        </Button>
      );
    } else {
      return (
        <Button
          size="small"
          color="error"
          variant="outlined"
          sx={{
            color: '#b42318',
            backgroundColor: '#fde8e7',
            borderColor: '#b42318',
            borderRadius: '15px',
          }}
        >
          not paid
        </Button>
      );
    }
  };
  return (
    <Dashboard>
      <div className="traineesListHearder">
        <h1>Trainees List</h1>
        <div className="impExp">
          <Button
            color="inherit"
            startIcon={
              <SvgIcon fontSize="small">
                <KeyboardDoubleArrowUpIcon />
              </SvgIcon>
            }
          >
            Import
          </Button>
          <Button
            color="inherit"
            startIcon={
              <SvgIcon fontSize="small">
                <KeyboardDoubleArrowDownIcon />
              </SvgIcon>
            }
          >
            Export
          </Button>
        </div>
        <div className="traineeSreachBar">
          <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Search customer"
            type="text"
            name="searchQuery"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon color="action" fontSize="small">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            }
            sx={{ maxWidth: 500 }}
          />
        </div>
        <div>
          <Card sx={{ boxShadow: 'none' }} className="debug">
            <CardHeader
              subheader="You can filter with multiple choices"
              title="Filter"
            />
            <CardContent>
              <Checkbox
                checked={isPaidFilter}
                onChange={(event) => setIsPaidFilter(event.target.checked)}
              />
              <label>Paid</label>

              <Checkbox
                checked={notPaidFilter}
                onChange={(event) => setNotPaidFilter(event.target.checked)}
              />
              <label>Not paid</label>

              <Checkbox
                checked={isSubscribedFilter}
                onChange={(event) =>
                  setIsSubscribedFilter(event.target.checked)
                }
              />
              <label>Subscribed</label>

              <Checkbox
                checked={notSubscribedFilter}
                onChange={(event) =>
                  setNotSubscribedFilter(event.target.checked)
                }
              />
              <label>Not subscribed</label>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* ------------------------------------ table ------------------------- */}
      <div className="traineesTable">
        <Card className='debug'>
          {/* <Scrollbar> */}
          <Box >
            <Table>
              <TableHead>
                <TableRow sx={{ textAlign: 'center' }}>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Has membership</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trainees &&
                  trainees
                    .filter((item) => {
                      if (isPaidFilter && !item.isPaid) {
                        return false;
                      }
                      if (notPaidFilter && item.isPaid) {
                        return false;
                      }
                      if (isSubscribedFilter && !item.membershipId) {
                        return false;
                      }
                      if (notSubscribedFilter && item.membershipId) {
                        return false;
                      }
                      if (
                        searchQuery &&
                        !item.userName
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      ) {
                        return false;
                      }
                      return true;
                    })
                    .map((item, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:hover': { backgroundColor: '#eee' } }}
                      >
                        <TableCell>{item.userName}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>
                          {item.membershipId
                            ? membershipState(true, item.membershipId)
                            : membershipState(false)}
                        </TableCell>
                        <TableCell>
                          {item.isPaid
                            ? paymentState(true)
                            : paymentState(false)}
                        </TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => deleteTrainee(item.id)}
                            variant="outlined"
                            color="error"
                            size="small"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </Box>
          {/* </Scrollbar> */}
        </Card>
      </div>
    </Dashboard>
  );
}

export default TraineesList;
