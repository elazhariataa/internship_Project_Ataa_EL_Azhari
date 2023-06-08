import * as React from 'react';
import './adminDashboard.css';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { Badge, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function AdminDashboard({ children }) {
  const token = cookies.get('Token');
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const toggleDrawerOnResize = () => {
      if (document.body.offsetWidth < 1216)
        setOpen( false );
      else setOpen( true );
    };

    window.addEventListener('resize', toggleDrawerOnResize);
    return () => window.removeEventListener('resize', toggleDrawerOnResize);
  }, []);

  //------------- profile icon menu ----------------
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    cookies.remove('Token', { path: '/' });
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#161e2b',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
        <Box sx={{ marginRight: '3%' }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle fontSize="large" />
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
            PaperProps={{
              style: {
                width: '200px',
                boxShadow: 'inset 0px -1px 1px #0f263d',
              },
            }}
          >
            <MenuItem component={Link} to="/adminProfile">
              <PersonIcon /> Profile
            </MenuItem>
            <MenuItem onClick={() => logout()}>
              <LogoutIcon /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: '#161e2b',
            color: '#afa99e',
          },
        }}
      >
        <DrawerHeader className="drawerHeader">
          <div>
            <img src={require('../../images/Logo.png')} alt="" />
          </div>
          <Typography
            noWrap
            component="div"
            sx={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '30px',
              marginBottom: '7px',
            }}
          >
            GYM LINK
          </Typography>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: '#afa99e',
              '&:hover': {
                backgroundColor: '#263d52',
              },
            }}
          >
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ backgroundColor: '#afa99e', marginBottom: '5%' }} />
        <List sx={{ padding: '20px' }}>
          <ListItem
            disablePadding
            sx={{ marginBottom: '5px' }}
            component={Link}
            to="/"
          >
            <ListItemButton
              sx={{
                '&:hover': {
                  backgroundColor: '#252e3e',
                  borderRadius: '5px',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#afa99e' }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home page" />
            </ListItemButton>
          </ListItem>
          {/* ------------- another item --------------- */}
          <ListItem
            disablePadding
            sx={{ marginBottom: '5px' }}
            component={Link}
            to="/adminProfile"
          >
            <ListItemButton
              sx={{
                '&:hover': {
                  backgroundColor: '#252e3e',
                  borderRadius: '5px',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#afa99e' }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Account page" />
            </ListItemButton>
          </ListItem>
          {/* ------------- another item --------------- */}
          <ListItem
            disablePadding
            sx={{ marginBottom: '5px' }}
            component={Link}
            to="/traineesList"
          >
            <ListItemButton
              sx={{
                '&:hover': {
                  backgroundColor: '#252e3e',
                  borderRadius: '5px',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#afa99e' }}>
                <SupervisedUserCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Trainees List" />
            </ListItemButton>
          </ListItem>
          {/* ------------- another item --------------- */}
          <ListItem disablePadding component={Link} to="/coachesList">
            <ListItemButton
              sx={{
                '&:hover': {
                  backgroundColor: '#252e3e',
                  borderRadius: '5px',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#afa99e' }}>
                <SupervisedUserCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Coaches List" />
            </ListItemButton>
          </ListItem>
          {/* ------------- another item --------------- */}
          <ListItem disablePadding component={Link} to="/membershipList">
            <ListItemButton
              sx={{
                '&:hover': {
                  backgroundColor: '#252e3e',
                  borderRadius: '5px',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#afa99e' }}>
                <CardMembershipIcon />
              </ListItemIcon>
              <ListItemText primary="Membership List" />
            </ListItemButton>
          </ListItem>
          {/* ------------- another item --------------- */}
        </List>
      </Drawer>
      <Main open={open} sx={{ backgroundColor: 'white' }}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
