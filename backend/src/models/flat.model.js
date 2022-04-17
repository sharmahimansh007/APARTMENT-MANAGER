const mongoose = require("mongoose");

const FlatSchema = new mongoose.Schema({
    flat_number:{type:Number, required:true},
    total_residents:{type:Number, required:true},
    block:{type:String ,required:true},
    image:[],
    status:{type:Boolean, default:true}
},{
    timestamps:true,
    versionkey:false,
});



const Flat = mongoose.model("Flat", FlatSchema);

module.exports = Flat