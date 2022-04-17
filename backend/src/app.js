const express = require("express");
const { default: mongoose } = require("mongoose");

const connect = require("./configs/db")

const app = express();

const PORT = process.env.PORT || 80;

app.listen((PORT, async() => {
    try{
        await connect(process.env.DB_CONNECTION);
        console.log(`server is runnig on port ${PORT}`)
    }catch(e){
        console.log(e)
    }
}))