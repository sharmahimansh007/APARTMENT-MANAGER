const bcrypt = require("bcryptjs")

const mongoose = require("mongoose")

const managerSchema = new mongoose.Schema({
    name:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true},
    gender:{type:String, required:true},
    mobile:{type:Number, required:true},
},{
    timestamps:true,
    versionKey:false
})