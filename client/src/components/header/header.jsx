import './header.css';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import React, { useState } from 'react';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
const cookies = new Cookies();

function Header(){
    const token = cookies.get("Token");
    const role = cookies.get("role");
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [toDashboard,setToDashboard] = useState('')
    // ------------ auth menu ------------
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    //------------- profile icon menu ----------------
    const [auth, setAuth] = React.useState(true);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    //---------------- to dashboard --------
    // if(role === "Trainee"){
    //     setToDashboard('/traineeProfile')
    // }else if(role === "Admin"){
    //     setToDashboard('/adminProfile')
    // }
    //--------------Logout----------------
    const logout = ()=>{
        cookies.remove("Token",{path:'/'});
        navigate('/');
    }
    return (
        <header>
            <div className='logo'>
                <img src={require('../images/Logo.png')} alt="" />
                <h1>GYM LINK</h1>
            </div>
            <div className='menu'>
                <RouterLink to='/' onClick={()=>window.scrollTo(0,0)}>
                    HOME
                </RouterLink>
                <RouterLink to='membership_plans' onClick={()=>window.scrollTo(0,0)}>
                    MEMBERSHIP PLANS
                </RouterLink>
                <HashLink to='/#services' smooth>
                    SERVICES
                </HashLink>
                <HashLink to='/#whatTheySaid' smooth>
                TESTIMONIALS
                </HashLink>
            </div>
            {token?
                <div className='auth'>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{color:"#afa99e",
                    '&:hover': {
                    backgroundColor: '#263d52', 
                },
                }}
              >
                <AccountCircle fontSize="large"/>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{zIndex:"9999"}}
                PaperProps={{
                  style: {
                    width: '200px',boxShadow: "inset 0px -1px 1px #0f263d",
                  },
                }}
              >
                {role === "Trainee" ? <MenuItem component={Link} to='/traineeProfile'><SpaceDashboardIcon/> Dashboard</MenuItem>
                 : role === "Admin" ? <MenuItem component={Link} to='/adminProfile'><SpaceDashboardIcon/> Dashboard</MenuItem>
                 : <MenuItem component={Link} to='/adminProfile'><SpaceDashboardIcon/> Dashboard</MenuItem>
                }
                
                <MenuItem onClick={()=>logout()}><LogoutIcon/> Logout</MenuItem>
              </Menu>
                </div>

                :

                <div className='auth'>
                    <Button
                    className='authBtn'
                    variant='outlined'
                    aria-controls='auth-menu'
                    aria-haspopup='true'
                    onClick={handleClick}
                    >
                    Login / Register
                </Button>
                <Menu
                    id='auth-menu'
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    sx={{zIndex:"9999"}}
                    PaperProps={{
                        style: {
                        backgroundColor: 'rgba(8, 20, 33, 0.7)', width: '200px',color: "white",boxShadow: "inset 0px -1px 1px #0f263d",
                        },
                    }}
                >
                    <MenuItem 
                        onClick={handleClose}
                        component={RouterLink}
                        to='/register'
                        sx={{
                            '&:hover': {
                            backgroundColor: '#0f263d',
                            },
                        }}
                    >
                        Register
                    </MenuItem>
                    <MenuItem 
                        onClick={handleClose}
                        component={RouterLink}
                        to='/login'
                        sx={{
                            '&:hover': {
                            backgroundColor: '#0f263d',
                            },
                        }} 
                    >
                        Login
                    </MenuItem>
                </Menu>
                </div>
            }
            
        </header>
    )
    
}

export default Header;