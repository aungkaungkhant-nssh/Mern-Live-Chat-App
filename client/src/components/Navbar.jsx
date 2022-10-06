import React from 'react'
import {AppBar,Toolbar,Box,IconButton,Typography,Badge} from "@mui/material";
import {Search,Notifications,More,AccountCircle,Menu} from "@mui/icons-material"
import SearchBar from '@mkyy/mui-search-bar';
import { deepPurple,grey } from '@mui/material/colors';
function Navbar() {
  return (
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
        >
          <Badge badgeContent={17} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
        //   aria-controls={menuId}
          aria-haspopup="true"
        //   onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Box>
     
    </Toolbar>
  </AppBar>
  )
}

export default Navbar