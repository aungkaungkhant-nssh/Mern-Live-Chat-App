const express = require("express");
const app =express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();

const userRoute = require('./routes/userRoute');
const chatRoute = require("./routes/chatRoute");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user',userRoute);
app.use('/api/chat',chatRoute);

mongoose.connect(process.env.DB_URL)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})
