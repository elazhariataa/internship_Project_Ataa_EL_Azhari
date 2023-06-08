const mongoose = require('mongoose');
const {Schema} = mongoose;

const payementModel = new Schema({
    id : {type : String,unique:true},
    user_id : {type : String, required : true},
    amount : Number,
    date : Date
})

module.exports = mongoose.model('payements',payementModel,"payements");