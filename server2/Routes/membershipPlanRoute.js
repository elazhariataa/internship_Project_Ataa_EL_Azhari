const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const fs = require('fs');
const membershipPlanModel = require('../Models/membership_plan_model');
const membershipPriceModel = require('../Models/membership_pricing_model');
const upload = require('../Middleware/fileUploadMiddleware');


//---------------- add a membershipPlan ---------------
router.post('/add', upload.single('image'),(req,res)=>{
    const url = req.protocol + '://' + req.get('host')
    const membershipPlan = membershipPlanModel({
        id : uuid.v1(),
        name: req.query.name,
        offers: req.query.offers,
        classesNumber: req.query.classesNumber,
        personalClassesNumber: req.query.personalClassesNumber,
        image : url + '/public/' + req.file.filename
    })
    membershipPlan
    .save()
    .then((result)=>{
        const membershipPrice = membershipPriceModel({
            id : uuid.v1(),
            membership_plan_id : result.id,
            monthlyPrice : req.query.monthlyPrice,
            quarterlyPrice : req.query.quarterlyPrice,
            annualPrice : req.query.annualPrice,
        })
        return membershipPrice.save()
    })
    .then(()=>{
        res.status(201).send({
            message : "membership added successfully",
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "error creating membershipPlan",
            error
        })
    }) 
})

//---------------- get all membershipPlans --------------
router.get('/all',(req,res)=>{
    membershipPlanModel.find({isDeleted : false})
    .then((membershipPlans)=>{
        res.status(200).json(membershipPlans)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "there is no membership plans in the database",
            error
        })
    })
})
//----------------- update a membership plan --------
router.put('/updateMembershipPlan/:id',(req,res)=>{
    const membershipPlanId = req.params.id;
    membershipPlanModel.updateOne({id : membershipPlanId},req.body)
    .then((result)=>{
        res.status(200).send({
            message : "membership plan updated successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "error updating membership plan",
            error
        })
    })
})
//-------------- update membership image -----------------
router.put('/updatePhoto/:id',upload.single('image'),(req,res)=>{
    const membership = req.params.id;
    const url = req.protocol + '://' + req.get('host')
    const image = url + '/public/' + req.file.filename

    // Find the trainee and get the old image filename
    membershipPlanModel.findOne({ id: membership })
      .then((memData) => {
        if (!memData) {
          return res.status(404).send({
            message: "membership not found"
          });
        }
  
        const oldImage = memData.image;
  
        // Update the trainee with the new image
        membershipPlanModel.updateOne({ id: membership }, { image: image })
        .then(() => {
            res.status(200).send({
              message: "membership photo updated successfully"
            });
  
            // Delete the old image file
            if (oldImage) {
              const filename = oldImage.split('/').pop();
              const filePath = 'public/' + filename;
  
              fs.unlink(filePath, (err) => {
                if (err) {
                  console.log('Error deleting old image:', err);
                } else {
                  console.log('Old image deleted successfully');
                }
              });
            }
        })
        .catch((error) => {
            res.status(500).send({
              message: "Error updating membership photo",
              error
            });
        });
    })
    .catch((error) => {
        res.status(500).send({
          message: "Error finding membership",
          error
        });
    });
})
//----------------- delete a membership plan --------------
router.put('/delete/:id',(req,res)=>{
    const membershipPlanId = req.params.id;
    membershipPlanModel.updateOne({id : membershipPlanId},{isDeleted : true})
    .then((result)=>{
        membershipPriceModel.updateOne({membership_plan_id : membershipPlanId},{isDeleted : true})
        .then(()=>{
            res.status(200).send({
                message : "membership plan deleted successfully"
            })
        })
        
    })
    .catch((error)=>{
        res.status(500).send({
            message : "error deleting membership plan",
            error
        })
    })
})
//------------------ get a spc membership ------------------
router.get('/spcMembership/:id',(req,res)=>{
    const member = req.params.id
    membershipPlanModel.findOne({id : member})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "the membership does't exists"
        })
    })
})

module.exports = router;