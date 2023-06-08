const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/public', express.static('public'));
app.use(cors());

//--------------------- Routes ------------------------
const membershipRoute = require('./Routes/membershipPlanRoute');
const membershipPrice = require('./Routes/membershipPriceRoute');
const paymentRoute = require('./Routes/paymentRoute');

//------------------ get envirement variables ------------------------
const port = process.env.PORT;
const url = process.env.URL_MONGOOSE;
const dbName = process.env.DBNAME;

//----------------- connect to database --------------------------
mongoose.connect(`${url}/${dbName}`,{useNewUrlParser:true});
const db = mongoose.connection;

db.on('error',(error)=>{
    console.log("Databse connection error", error);
})

db.once('open',function(){
    console.log("connected to dtabase successfully");
})

//----------------- use Routes -------------------------
app.use('/membership', membershipRoute);
app.use('/membershipPrice',membershipPrice);
app.use('/payment',paymentRoute);

//------------------ server listening ---------------
app.listen(port,()=>{
    console.log("server started ...")
})