const bcrypt = require("bcryptjs")

const mongoose = require("mongoose")

// creating the manager schema 

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

// hasing the password

managerSchema.pre("save", function(next){
    if(!this.isModified("password")){
        return next();
    };

    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash 
    next()

})

managerSchema.methods.comparePassword = function(userPassword){
    return bcrypt.compareSync(userPassword, this.password);
}


const Manager = mongoose.model("manager", managerSchema);
module.exports =  Manager