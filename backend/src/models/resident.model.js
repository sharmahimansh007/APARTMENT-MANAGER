const mongoose = require("mongoose");

const ResidentSchema = new mongoose.Schema({
    id:{type:mongoose.Schema.Types.ObjectId, ref:"Flat"},
    name: {type: String, required: true},
    age: {type: String, required: true},
    type:{type:String, required:true},
    gender: {type: String, required: true},

    
},{
    versionkey:false,
    timestamps:true,
});

const Resident  = mongoose.model("Resident", ResidentSchema)
module.exports = Resident;