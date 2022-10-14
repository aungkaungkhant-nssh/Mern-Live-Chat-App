import React from 'react'
import Navbar from '../components/Navbar'
import { AuthState } from '../context/AuthProvider';
import MyChat from '../components/Chat/MyChat';
import ChatBox from '../components/Chat/ChatBox';
import {Grid, Stack,Box} from "@mui/material"
import { makeStyles } from '@mui/styles';
import Axios from '../config/Axios';
import { useState } from 'react';

function Chat() {

  const user= AuthState();
  const [chats,setChats] = useState([]);
  const [userSelected,setUserSelected] = useState(null);

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

  }
  return (
    <>
      {user && <Navbar accessChat={accessChat} />}
      <Box>
        <Grid container  spacing={1} p={2} >
              <Grid  item xs={12} md={4}  display={{ xs: userSelected ? "none":"block", lg: "block" }}>
                {user && <MyChat chats={chats} setChats={setChats} selectForChat={selectForChat} userSelected={userSelected}/>}
              </Grid>
              <Grid item  xs={12} md={8}  display={{ xs: userSelected ? "block":"none", lg: "block" }}>
                {user && <ChatBox chats={chats} setChats={setChats} userSelected={userSelected} setUserSelected={setUserSelected} />}
              </Grid>
          </Grid>
      </Box>
        
    </>
  )
}

export default Chat