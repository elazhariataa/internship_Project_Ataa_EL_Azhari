import './membership_plan.css';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { HashLink } from 'react-router-hash-link';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Membership_plans() {
  const navigate = useNavigate();
  const userId = cookies.get('UserId');
  const token = cookies.get('Token');
  const [memberships, setMemberships] = useState([]);
  const [prices, setPrices] = useState([]);
  const [chosenPrice, setChosenPrice] = useState(0);
  const [chosenMem, setChosenMem] = useState('');
  const [errors, setErrors] = useState('');

  // ----------------- modal ------------------------------
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'you have to login first',
      });
      return;
    }
    setChosenMem(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const subscribe = () => {
    console.log(userId);
    console.log(chosenPrice);
    console.log(chosenMem);
    if (chosenPrice <= 0) {
      setOpen(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'you have to choose an amount',
      });
      return;
    }
    const config = {
      method: 'post',
      url: 'http://localhost:5001/payment/payMember',
      data: {
        userId: userId,
        chosenPrice: chosenPrice,
        chosenMem: chosenMem,
      },
    };
    setOpen(false);
    axios(config)
      .then((result) => {
        Swal.fire({
          icon: 'success',
          title: 'payment passed successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/traineeMembership');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "payment didn't passed",
        });
        console.log(error.response);
      });
  };
  // -------------------------------------------------------
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
        console.log('no data', error);
      });
  }, []);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('http://localhost:5001/membershipPrice/all');
      return res.data;
    };
    getData()
      .then((prices) => {
        setPrices(prices);
      })
      .catch((error) => {
        console.log('no data', error);
      });
  }, []);
  return (
    <div className="membershipContent">
      <div className="membershipArticle1">
        <div className="section1">
          <h2>Reach your fitness goals with us</h2>
          <p>
            Our membership plans are designed to help you achieve your fitness
            goals, whatever they may be. With access to our state-of-the-art
            facilities and expert guidance from our trainers, you'll be well on
            your way to a healthier, happier you.
          </p>
        </div>
        <div className="section2">
          <img src={require('../images/Account.gif')} alt="" />
        </div>
      </div>
      <div className="membershipArticle2">
        <div className="membershipCards">
          {memberships &&
            memberships.map((item, index) => {
              const price =
                prices && prices.find((p) => p.membership_plan_id === item.id);
              return (
                <div className="membershipCard">
                  <div className="cardHeadre">
                    <img src={item.image} alt="" />
                    <h3>{item.name}</h3>
                  </div>
                  <div className="details">
                    {item.offers.map((offer, index) => (
                      <p key={index}>
                        <DoneAllRoundedIcon />
                        {offer}
                      </p>
                    ))}
                  </div>
                  <div className="price">
                    <p>
                      ${price?.monthlyPrice}
                      <small>/month</small>
                    </p>
                  </div>
                  <div className="actions">
                    <Button
                      variant="outlined"
                      onClick={() => handleClickOpen(item.id)}
                    >
                      Subscribe
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {'Choose membership pricing plan'}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          choose your membership payment plan: Monthly,
                          Quarterly, or Anuual
                        </DialogContentText>
                        <FormControl
                          sx={{
                            mt: 2,
                            minWidth: 120,
                            display: 'flex',
                            flexDirection: 'row',
                          }}
                        >
                          <InputLabel htmlFor="chosenPrice">Prices</InputLabel>
                          <Select
                            sx={{ width: '300px' }}
                            value={chosenPrice}
                            onChange={(e) => setChosenPrice(e.target.value)}
                            label="prices"
                            inputProps={{
                              name: 'chosenPrice',
                              id: 'chosenPrice',
                            }}
                          >
                            <MenuItem value={price?.monthlyPrice}>
                              Monthly: ${price?.monthlyPrice}
                            </MenuItem>
                            <MenuItem value={price?.quarterlyPrice}>
                              Quarterly: ${price?.quarterlyPrice}
                            </MenuItem>
                            <MenuItem value={price?.annualPrice}>
                              Annual: ${price?.annualPrice}
                            </MenuItem>
                          </Select>
                          <TextField
                            label={'$ ' + chosenPrice}
                            disabled
                            sx={{ marginLeft: '7px' }}
                          />
                        </FormControl>
                        {errors && <div className="error">*{errors}</div>}
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => handleClose()}>Cancel</Button>
                        <Button onClick={() => subscribe()}>Subscribe</Button>
                      </DialogActions>
                    </Dialog>
                    <Button
                      className="btn2"
                      variant="outlined"
                      aria-controls="auth-menu"
                      aria-haspopup="true"
                    >
                      <a href='#pricesection2'>
                        Discover Pricing Plans
                      </a>
                     
                    </Button>
                  </div>
                </div>
              );
            })}

          
            </div>
            </div>
            <div className='membershipArticle3'>
                <div className='pricesection1'>
                    <h3>PRICING PLANS TABLE</h3>
                </div>
                <div className='pricesection2' id="pricesection2">
                    <table>
                        <thead>
                            <tr>
                                <th>membership Plan</th>
                                <th>Monthly Price</th>
                                <th>Quarterly Price</th>
                                <th>Annual Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prices && prices.map((i,index)=>
                                {
                                    const membership = memberships.find((m)=>m.id === i.membership_plan_id)
                                    return(
                                        <tr key={index}>
                                            <th>{membership?.name}</th>
                                            <td>${i.monthlyPrice}</td>
                                            <td>${i.quarterlyPrice}</td>
                                            <td>${i.annualPrice}</td>
                                        </tr>
                                    )
                                }
                            )}
                            
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    
    )
}

export default Membership_plans;
