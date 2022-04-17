const express = require("express");
// const  mongoose  = require("mongoose");

const connect = require("./configs/db")

const app = express();

const PORT = process.env.PORT || 5000;

const { Login, Register } = require("./controllers/auth.controller");

const FlatController = require("./controllers/flat.controller");

const ResidentController = require("./controllers/resident.controller")

app.use(express.json());

app.use("/register", Register);

app.use("/login", Login);

app.use("/flat", FlatController);

app.use("/resident", ResidentController);



app.listen(PORT, async() => {
    try{
        await connect(process.env.DB_CONNECTION);
        console.log(`server is runnig on port ${PORT}`)
    }catch(e){
        console.log(e.message)
    }
})