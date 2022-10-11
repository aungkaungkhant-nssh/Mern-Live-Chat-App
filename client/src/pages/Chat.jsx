import React from 'react'
import Navbar from '../components/Navbar'
import { AuthState } from '../context/AuthProvider';
import MyChat from '../components/Chat/MyChat';
import ChatBox from '../components/Chat/ChatBox';
import {Grid, Divider} from "@mui/material"
import { makeStyles } from '@mui/styles';
import Axios from '../config/Axios';
import { useState } from 'react';
const useStyles= makeStyles({
  show:{
    display:"block !important"
  },
  hide:{
    display:"none !important"
  }
})
function Chat() {
  const classes = useStyles();
  const user= AuthState();
  const [chats,setChats] = useState([]);
  const [userSelected,setUserSelected] = useState(null);
  const [showChatBox,setShowChatBox] =useState(false);
  const accessChat = async (value)=>{
    const config = {
      headers:{
        authorization:`Bearer ${user.token}`
      }
    }
    try{
      let res = await Axios.post("/api/chat",{id:value._id},config);
        
        setChats([...chats,res.data.data])
    }catch(err){
      console.log(err);
    }
  }
  const selectForChat =(chat)=>{
    setUserSelected(chat);
    setShowChatBox(true)
  }
  return (
    <>
      {user && <Navbar accessChat={accessChat} />}
      <Grid container p={3} spacing={2}>
          <Grid item xs={12} md={4}  display={{ xs: userSelected ? "none":"block", lg: "block" }}>
            {user && <MyChat chats={chats} setChats={setChats} selectForChat={selectForChat}/>}
          </Grid>
          <Grid item  xs={12} md={8}  display={{ xs: userSelected ? "block":"none", lg: "block" }}>
            {user && <ChatBox chats={chats} setChats={setChats} userSelected={userSelected} setUserSelected={setUserSelected} />}
          </Grid>
      </Grid>
    </>
  )
}

export default Chat