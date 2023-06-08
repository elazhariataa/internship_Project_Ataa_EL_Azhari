const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const membershipPriceModel = require('../Models/membership_pricing_model');

//-------------------- get all membershipsPrices ------------
router.get('/all',(req,res)=>{
    membershipPriceModel.find({isDeleted : false})
    .then((prices)=>{
        res.status(200).json(prices)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "there is no prices in the database",
            error
        })
    })
})
//------------------- get spc membership prices -----------------
router.get('/spcPrices/:memershipId',(req,res)=>{
    const membershipId = req.params.memershipId;
    membershipPriceModel.findOne({membership_plan_id : membershipId})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "no prices for this membership",
            error
        })
    })
})
//------------------ update a membership Prices -----------
router.put('/updateMembershiPrices/:membershipId', (req,res)=>{
    const membershipId = req.params.membershipId;
    membershipPriceModel.updateOne({membership_plan_id : membershipId},req.body)
    .then((result)=>{
        res.status(200).send({
            message : "prices updated successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message :' error updating prices',
            error
        })
    })
})

module.exports = router;