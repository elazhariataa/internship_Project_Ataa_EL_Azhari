const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');

//------------------- add a coash ------------------
router.post('/add',(req,res)=>{
    bcrypt
    .hash(req.body.password,10)
    .then((hashedPassword)=>{
        const coash = userModel({
            id : uuid.v1(),
            userName : req.body.userName,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            phone : req.body.phone,
            password :hashedPassword,
            role : "Coash",
        })
        coash.save()
        .then((result)=>{
            res.status(201).send({
                message : "coash created successfully"
            })
        })
        .catch((err)=>{
            res.status(500).send({
                message : "Error creating coash",
                err
            })
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "password was not hashed successfully",
            error
        })
    })
})
//-------------------- get Coashes -----------------------
router.get('/all',(req,res)=>{
    userModel.find({role : "Coash"})
    .then((coachs)=>{
        res.status(200).json(coachs)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "there is no coachs in the database",
            error
        })
    })
})
//------------------ delete a coash -----------------
router.delete('/delete/:id',(req,res)=>{
    const coash = req.params.id;
    userModel.deleteOne({id : coash})
    .then((result)=>{
        res.status(200).send({
            message : "coash deleted successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "error deleting coash",
            error
        })
    })
})

module.exports = router;