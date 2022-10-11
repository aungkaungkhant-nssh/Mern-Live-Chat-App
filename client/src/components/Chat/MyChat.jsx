import React,{useState} from 'react'
import {Paper,Button, Typography,Stack,List,ListItem,ListItemAvatar,ListItemText,Avatar} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {grey } from '@mui/material/colors';
import { AuthState } from '../../context/AuthProvider';
import {getSender} from '../../config/ChatLogic'
import CreateGroupDialog from './CreateGroupDialog';

function MyChat({chats,setChats,selectForChat}) {
    const user = AuthState();
    const [showCreateGroup,setShowCreateGroup] = useState(false);
  
  return (
    <Paper sx={{padding:"15px 20px",height:"80vh"}} elevation={5}>
        <Stack display="flex" direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="bold">
                My Chat
            </Typography>
            <Button  variant="contained" color="primary" startIcon={<AddCircleIcon />} onClick={(e)=>setShowCreateGroup(true)}>
                Create Group
            </Button>
        </Stack>
        <Stack mt={2}  sx={{maxHeight:"90%",overflow:"auto"}}>
        <List sx={{padding:"5px"}}>
            {
              chats.length > 0 &&  chats.map((chat)=>(
                    <ListItem onClick={()=>selectForChat(chat)} key={chat._id} sx={{padding:"10px",marginBottom:"12px",backgroundColor:grey[200],borderRadius:"5px",cursor:"pointer"}}>
                        <ListItemAvatar>
                            <Avatar src={chat.isGroupChat ? chat.gpPic || "" : getSender(user,chat).pic} /> 
                        </ListItemAvatar>
                         <ListItemText primary={chat.isGroupChat ? chat.chatName : getSender(user,chat).name} 
                         secondary={chat.latestMessage ? (`${chat.latestMessage.sender} : ${chat.latestMessage.content}`) : ""}
                         />
                    </ListItem>
                ))
            }
           
          </List>
        </Stack>
       <CreateGroupDialog open={showCreateGroup} setOpen={setShowCreateGroup} chats={chats} setChats={setChats}/>
    </Paper>
  )
}

export default MyChat