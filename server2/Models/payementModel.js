const mongoose = require('mongoose');
const {Schema} = mongoose;

const payementModel = new Schema({
    id : {type : String,unique:true},
    user_id : {type : String, required : true},
    amount : {type : Number, required :  true},
    membershipId : {type : String, required : true}
},
    {timestamps : true}
)

module.exports = mongoose.model('payements',payementModel,"payements");