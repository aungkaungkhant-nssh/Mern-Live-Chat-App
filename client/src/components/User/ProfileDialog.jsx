import { Dialog,Skeleton,DialogTitle,DialogContent,DialogActions,DialogContentText,Button,Avatar, Typography,Box, IconButton } from '@mui/material'
import React,{useState} from 'react'
import { AuthState } from '../../context/AuthProvider'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from "axios"
import Axios from '../../config/Axios';
function ProfileDialog({open,setOpen}) {
  const user = AuthState();
  const [loading,setLoading] = useState(false);
  const updateProfilePicture = async (e)=>{
    let pics = e.target.files[0];
    if(!pics) return;
    setLoading(true);
    if(pics.type==="image/jpeg" || pics.type==="image/png"){
      const data = new FormData();
      data.append("file",pics);
      data.append("upload_preset","mernchatapp");
      data.append("cloud_name", "dqlplxvtx");
      let config = {
          headers:{
              "Authorization":`Bearer ${user.token}`
          }
       }
      try{
        let res=  await axios.post("https://api.cloudinary.com/v1_1/dqlplxvtx/image/upload",data);
        let updateUser =  await Axios.put("/api/user/update/profile-picture",{pic:res.data.url},config);
        user.pic = updateUser.data.data.pic;
        localStorage.setItem("userInfo",JSON.stringify(updateUser.data.data));
        setLoading(false);
      }catch(err){
        console.log(err)
        setLoading(false);
      }
      
    }
    setLoading(false);
  }
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
                    {
                      loading ?  <Skeleton
                        variant='circular'
                        width="100%"
                        height="100%"
                        animation='wave'
                      />:(
                        <Avatar sx={{width:"100%",height:"100%"}} src={user.pic} size="large"/>
                      )
                    }
                    <input
                      id="icon-button-photo"
                      onChange={updateProfilePicture}
                      type="file"
                      style={{display:"none"}}
                    />
                  <label htmlFor="icon-button-photo">
                      <IconButton color="primary" component="span"  sx={{postiton:"absolute",bottom:"40px",left:"70px"}}> 
                          <PhotoCameraIcon />
                      </IconButton>
                  </label>
                </Box>
               
                <Typography variant="h5"  sx={{textAlign:"center",fontWeight:"bolder",textTransform:"uppercase"}} color="darkness.main" gutterBottom>
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