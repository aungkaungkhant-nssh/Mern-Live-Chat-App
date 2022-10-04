const express = require("express");
const app =express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();

const userAuthRoute = require('./routes/userAuth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user',userAuthRoute);


mongoose.connect(process.env.DB_URL)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})
