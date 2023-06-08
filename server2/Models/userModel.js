const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    id : {type : String,unique:true},
    userName : {type:String,required:true,unique:true},
    firstName : {type : String},
    lastName : {type : String},
    email : {type:String,required:true,unique:true},
    password : {type:String,required:true},
    phone : {type : Number},
    address : {type : String},
    role : {type : String, required:true, default : "Trainee"},
    isPaid : {type : Boolean},
    membershipId : {type: String},
    image : {type : String},
})

module.exports = mongoose.model("users",userSchema,"users");