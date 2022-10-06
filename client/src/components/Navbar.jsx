import React,{useState} from 'react'
import {AppBar,Toolbar,Box,IconButton,Typography,Badge,Menu,MenuItem,Avatar,Divider, Tooltip} from "@mui/material";
import {Search,Notifications,Logout,AccountCircle} from "@mui/icons-material";
import SearchBar from '@mkyy/mui-search-bar';
import { deepPurple,grey } from '@mui/material/colors';
import { AuthState } from '../context/AuthProvider';
import ProfileDialog from './User/ProfileDialog';

function Navbar() {

  const user= AuthState();
  const [anchorEl,setanchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showDialog,setShowDialog] = useState(false);
  const handleClick = (event) => {
    setanchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setanchorEl(null);
  };
  if(!user) return;
  return (
    <>
       <AppBar position="static" color="secondary">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 ,display:{xs:"inline-block",md:"none"}}}
        >
          <Search />
        </IconButton>
      <Box sx={{display:{xs:"none",md:"inline-block"}}}>
          <SearchBar
              disabled
              style={{backgroundColor:grey[50],color:deepPurple[500]}}
              searchIcon={<Search  />}
          />
      </Box>
      
        <Box sx={{ flexGrow: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="div"
        >
          Mern Live Chat App
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            sx={{marginRight:"10px"}}
          >
            <Badge badgeContent={17} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Tooltip title="Account setting">
              <IconButton
                size="large"
                aria-controls={open ? 'account-menu' : undefined}
                color="inherit"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Avatar src={user.image}/>
              </IconButton>
  
          </Tooltip>
          <Menu
            open={open}
            id="account-menu"
            onClose={handleClose}
            onClick={handleClose}
            anchorEl={anchorEl}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            

            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
              <MenuItem onClick={()=>setShowDialog(true)}>
                <Avatar src={user.image}  sx={{ width: 24, height: 24 }}/>  Profile
              </MenuItem>
              <Divider />
              <MenuItem>
                <Logout  sx={{marginRight:"6px"}}/>  Logout
              </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
       </AppBar>
       <ProfileDialog open={showDialog} setOpen={setShowDialog}/>
    </>
   
  )
}

export default Navbar