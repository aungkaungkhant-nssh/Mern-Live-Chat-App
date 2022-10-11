import React,{useState} from 'react'
import {Paper,Box, Typography,Stack,Chat, IconButton} from '@mui/material'
import { getSender } from '../../config/ChatLogic'
import { AuthState } from '../../context/AuthProvider'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProfileDialog from '../User/ProfileDialog'
function ChatBox({userSelected,setUserSelected,chats,setChats}) {
  const user = AuthState();
  const [showProfileDailog,setShowProfileDailog] = useState(false);
  return (
    <Paper  sx={{padding:"15px 20px",height:"80vh"}} elevation={5}>
        {
          userSelected ? (
            <Box>
                <Stack display="flex" direction="row" justifyContent="space-between" alignItems="center">
                    <Box display="flex" direction="row" alignItems="center">
                         <IconButton sx={{display:{sm:"block",md:"none"},marginRight:".3rem"}} onClick={()=>setUserSelected(null)}>
                          <ArrowBackIcon />
                        </IconButton>
                        <Typography sx={{textTransform:"uppercase"}} variant="h5" fontWeight="bold">{userSelected.isGroupChat ? userSelected.chatName : getSender(user,userSelected).name}</Typography>
                    </Box>
                   
                    <IconButton>
                        <MoreVertIcon onClick={()=>setShowProfileDailog(true)}/>
                    </IconButton>
                </Stack>
            </Box>
          ):(
            <Box  display="flex" justifyContent="center" alignItems="center"
            minHeight="75vh" width="100%">
                <Typography variant="h5" color="darkness.middle">
                    Start With Chat Please Selected
                </Typography>
            </Box>
          )
        }
        {showProfileDailog && <ProfileDialog chats={chats} setChats={setChats} open={showProfileDailog} setOpen={setShowProfileDailog} profileUser={userSelected.isGroupChat ? userSelected :getSender(user,userSelected)}/>}
    </Paper>
  )
}

export default ChatBox