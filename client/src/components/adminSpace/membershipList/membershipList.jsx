import './membershipList.css';
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import { Button } from '@mui/material';
import Dashboard from '../dashboard/adminDashboard';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function MembershipList() {
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState([]);
  const [prices, setPrices] = useState([]);
  const fetchMembership = () => {
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
  };
  useEffect(() => {
    fetchMembership();
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
  const deleteMembership = (id) => {
    const config = {
      method: 'put',
      url: `http://localhost:5001/membership/delete/${id}`,
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
            Swal.fire('Deleted!', 'Membership has been deleted.', 'success');
            fetchMembership();
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error deleting membership',
            });
            console.log(error.response);
          });
      }
    });
  };

  const updateMembership = (id) => {
    navigate(`/updateMembership/${id}`);
  };
  return (
    <Dashboard>
      <div className="membershipListHeader">
        <h1>Memberships List</h1>
        <Button
          className="addMembership"
          variant="contained"
          sx={{ backgroundColor: '#3f5365' }}
          disableElevation
          component={Link}
          to="/addMembership"
        >
          + Add Membership
        </Button>
      </div>
      {memberships &&
        memberships.map((item, index) => {
          const price = prices.find((p) => p.membership_plan_id === item.id);
          return (
            <div key={index} className="membershipDetails">
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
              </div>
              <div className="membershipDeatils">
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
                    <tr>
                      <th>{item.name}</th>
                      <td>${price?.monthlyPrice}</td>
                      <td>${price?.quarterlyPrice}</td>
                      <td>${price?.annualPrice}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="membershipAction">
                <Button
                  variant="contained"
                  onClick={() => updateMembership(item.id)}
                  sx={{ backgroundColor: '#3f5365', margin: '10px'}}
                  disableElevation
                >
                  Edite Membership
                </Button>
                <Button
                  variant="contained"
                  onClick={() => deleteMembership(item.id)}
                  sx={{
                    backgroundColor: 'brown',
                    '&:hover': { backgroundColor: 'brown'},
                  }}
                  disableElevation
                >
                  Delete Membership
                </Button>
              </div>
            </div>
          );
        })}

      {/* <div className='membershipDetails'>
                <div className='membershipCard'>
                    <div className="cardHeadre">
                        <img src={require('../../images/premium.png')} alt="" />
                        <h3>Premium Membership</h3>
                    </div>
                    <div className='details'>
                        <p><DoneAllRoundedIcon/> Unlimited access to gym facilities during open hours</p>
                        <p><DoneAllRoundedIcon/> Access to cardio and strength equipment</p>
                        <p><DoneAllRoundedIcon/> Unlimited access to group fitness classes</p>
                        <p><DoneAllRoundedIcon/> 1 free personal training session per month</p>
                    </div>
                    <div className='price'>
                        <p>$40<small>/month</small></p>
                    </div>
                </div>
                <div className='membershipDeatils'>
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
                            <tr>
                                <th>Premium Membership</th>
                                <td>$40</td>
                                <td>$100</td>
                                <td>$360</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='membershipAction'>
                        <Button variant="contained" sx={{backgroundColor:"#3f5365",margin:"10px"}} disableElevation>Edite Membership</Button>
                        <Button variant="contained" sx={{backgroundColor:"brown",'&:hover':{backgroundColor:"brown"}}} disableElevation>Delete Membership</Button>
                    </div>
                </div>
            </div> */}
    </Dashboard>
  );
}

export default MembershipList;
