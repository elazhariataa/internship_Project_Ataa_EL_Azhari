const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const pdf = require('html-pdf');
const paymentModel = require('../Models/payementModel');
const userModel = require('../Models/userModel');
const pdfTemplate = require('../Documents/pdfPayment')
const path = require('path');


// -------------- pay for a membership ----------------
router.post('/payMember', async (req,res)=>{
    const payment = paymentModel({
        id : uuid.v1(),
        user_id : req.body.userId,
        amount : req.body.chosenPrice,
        membershipId : req.body.chosenMem,
    })
    payment
    .save()
    .then((result)=>{
        // res.status(200).send({message : "payment passed successfully"})
        userModel.updateOne({id : req.body.userId},{membershipId : req.body.chosenMem,isPaid : true})
        .then(()=>{
            res.status(200).send({
                message : "payment passed successfully",
            
            })
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "payment error",
            error
        })
    })
})

//-------------- get payments for spc user ---------------
router.get('/userPayments/:id',(req,res)=>{
    const user = req.params.id;
    paymentModel.find({user_id : user})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "there is no payments for this user"
        })
    })
})
//------------------------------ generate PDF --------------------------
//------- post method
router.post('/postPdfPayment',(req,res)=>{
    // const folderPath = `./Documents`;
    const filePath = path.join(__dirname, 'PDFs', 'result.pdf');
    pdf.create(pdfTemplate(req.body),{}).toFile(filePath,(err)=>{
        if(err){
            res.send(Promise.reject());
        }

        res.send(Promise.resolve());
    })
})
//--------- get method
router.get('/getPdfPayment',(req,res)=>{
    const folderPath = `./Documents`;
    const filePath = path.join(__dirname, 'PDFs', 'result.pdf');
    res.sendFile(filePath)
})

module.exports = router;