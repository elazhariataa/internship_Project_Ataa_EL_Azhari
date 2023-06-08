const mongoose = require('mongoose');
const {Schema} = mongoose;

const testimolialSchema = new Schema({
    id : {type : String, unique : true, required : true},
    testimolialCreator : {type : String, required : true},
    content : {type : String, required : true},
})

module.exports = mongoose.model('testimolials', testimolialSchema, 'testimolials')