const express = require("express");
const app =express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

app.use(cors())

const userRoute = require('./routes/userRoute');
const chatRoute = require("./routes/chatRoute");
const messageRoute = require('./routes/messageRoute');
const { Server } = require("socket.io");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user',userRoute);
app.use('/api/chat',chatRoute);
app.use('/api/message',messageRoute);

mongoose.connect(process.env.DB_URL)
.then(()=>{
   let server =  app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
    const io = new Server(server,{cors:{origin:"*"}});
    io.on("connection",(socket)=>{
        socket.on("setup",(user)=>{
           socket.join(user._id);
        })
        socket.on("joinchat",(chatId)=>{
            socket.join(chatId)
        })
        socket.on("sendMessage",(data)=>{
            const chat   = data.messages.chat;
            chat.users.map((user)=>(
                socket.in(user._id).emit("messageRecieved",data)
            ))
           
        })
        socket.on("startTyping",(data)=>{
           const users = data.users;
           users.map((user)=>(
            socket.in(user._id).emit("startTyping",data)
           ))
        })
        socket.on("stopTyping",(data)=>{
            const users = data.users;
            users.map((user)=>{
              socket.in(user._id).emit("stopTyping",data);  
            })
        })
    })
})
.catch((err)=>{
    console.log(err)
})
