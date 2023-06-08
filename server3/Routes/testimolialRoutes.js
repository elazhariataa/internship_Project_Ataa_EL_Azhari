const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const testimolialModel = require('../Models/testimolialModel');

//-------------- add testimolial ------------
router.post('/add',(req,res)=>{
    const testimolial = testimolialModel ({
        id : uuid.v1(),
        testimolialCreator : req.body.testimolialCreator,
        content : req.body.content
    })
    testimolial
    .save()
    .then((result)=>{
        res.status(201).send({
            message : "testimolial created successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "error creating testimolial",
            error
        })
    })
})
//----------------------- get all tetimonials -----------
router.get('/all', (req,res)=>{
    testimolialModel.find({})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "testimonials not found",
            error
        })
    })
})
//------------------- get an user testimonials ---------
router.get('/userTestimonials/:id',(req,res)=>{
    const user = req.params.id;
    testimolialModel.find({testimolialCreator : user})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "testimonials not found",
            error
        })
    })
})
//------------- get spc testimonial ----------
router.get('/spcTestimonial/:id',(req,res)=>{
    const testimolial = req.params.id;
    testimolialModel.findOne({id : testimolial})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "testimonial not found",
            error
        })
    })
})
//-------------- update testimonial --------------
router.put('/update/:id',(req,res)=>{
    const testimolial = req.params.id;
    testimolialModel.updateOne({id : testimolial},req.body)
    .then((result)=>{
        res.status(200).send({
            message : "testimonial updated successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "error updating testimonial",
            error
        })
    })
})
//------------- delete testimonial --------------
router.delete('/delete/:id',(req,res)=>{
    const testimonial = req.params.id;
    testimolialModel.deleteOne({id : testimonial})
    .then((result)=>{
        res.status(200).send({
            message : "testimonials delete successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "error deleting testimonial",
            error
        })
    })
})
module.exports = router;