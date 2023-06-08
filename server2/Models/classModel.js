const mongoose = require('mongoose');
const {Schema} = mongoose;

const classSchema = new Schema({
    id : {type : String,unique:true},
    name : {type :String,required :true},
    description : {type :String, required : true},
    coach_id : {type:String, required:true},
    capacity : {type : Number},
    schedule : [{dayOfWeek : Number,startTime:String,endTime:String}]
})

module.exports = mongoose.model('classes',classSchema,'classes');