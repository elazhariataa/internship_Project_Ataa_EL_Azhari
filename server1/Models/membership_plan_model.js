const mongoose = require('mongoose');
const {Schema} = mongoose;

const membershipPlanSchema = new Schema({
    id : {type : String,unique:true},
    name : {type: String, required:true},
    offers : [String],
    classesNumber : {type : Number, required : true},
    personalClassesNumber : {type:Number, required:true},
    isDeleted : {type : Boolean, default : false},
    image : {type : String} 
})

module.exports = mongoose.model('membership_plans',membershipPlanSchema,"membership_plans");