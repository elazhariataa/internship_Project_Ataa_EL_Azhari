const mongoose = require('mongoose');
const {Schema} = mongoose;

const bookingSchema = new Schema({
    id : {type : String,unique:true},
    user_id : {type : String, required : true},
    class_id : {type : String, required : true},
    date : {type : Date}
})

module.exports = mongoose.model("bookings",bookingSchema,"bookings");