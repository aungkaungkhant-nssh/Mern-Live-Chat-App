import { Dialog,DialogTitle,DialogContent,DialogActions,DialogContentText,Button,Avatar, Typography,Box, IconButton } from '@mui/material'
import React from 'react'
import { AuthState } from '../../context/AuthProvider'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
function ProfileDialog({open,setOpen}) {
  const user = AuthState();
  return (
    <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "500px", 
              },
            },
          }}
    >
        <DialogTitle id='dialog-title'>
            <Typography variant="h6" sx={{textAlign:"center"}} >Profile</Typography>
        </DialogTitle>
        <DialogContent>
            <DialogContentText id='dialog-description'>
                <Box sx={{position:"relative",width: 100, height: 100,margin:"13px auto" }}>
                    <Avatar sx={{width:"100%",height:"100%"}} src={user.image} size="large"/>
                    <IconButton sx={{postiton:"absolute",bottom:"40px",left:"70px"}}>
                            <PhotoCameraIcon color='primary'/>
                    </IconButton>
                </Box>
               
                <Typography variant="h5"  sx={{textAlign:"center",fontWeight:"bolder"}} color="darkness.main" gutterBottom>
                    {user.name}
                </Typography>
                <Typography variant="body1" sx={{textAlign:"center"}} color="dark.light">
                    Email : {user.email}
                </Typography>
             </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant='outlined' onClick={()=>setOpen(false)}>
             close
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default ProfileDialog