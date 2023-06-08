const mongoose = require('mongoose');
const {Schema} = mongoose;

const membershipPricingSchema = new Schema({
    id : {type : String,unique:true},
    membership_plan_id : {type: String,required : true, unique:true},
    monthlyPrice : {type: Number,required : true},
    quarterlyPrice : {type: Number,required : true},
    annualPrice : {type: Number,required : true},
    isDeleted : {type : Boolean, default : false},
})

module.exports = mongoose.model('membership_pricing',membershipPricingSchema,'membership_pricing');