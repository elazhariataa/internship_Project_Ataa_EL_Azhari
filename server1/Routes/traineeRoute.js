const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const userModel = require('../Models/userModel');
const upload = require('../Middleware/fileUploadMiddleware');
//------------------ register -------------------
router.post('/register', (req,res)=>{
    bcrypt
    .hash(req.body.password,10)
    .then((hashedPassword)=>{
        const user = userModel({
            id : uuid.v1(),
            userName : req.body.userName,
            email : req.body.email,
            password :hashedPassword,
            isPaid : false,
        })
        user
        .save()
        .then((result)=>{
            res.status(201).send({
                message : "User Created Successfully",
                result
            })
        })
        .catch((err)=>{
            res.status(500).send({
                message : "Error creating user",
                err
            })
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "Password was not hashed successfully",
            error
        })
    })
})

//---------------------- login -----------------------
router.post('/login',(req,res)=>{
    userModel.findOne({email : req.body.email})
    .then((user)=>{
        bcrypt.compare(req.body.password,user.password)
        .then((passwordChecked)=>{
            if(!passwordChecked){
                return res.status(400).send({
                    message : "password doesn't match"
                })
            }
            const token = jwt.sign(
                {
                    user_id : user.id,
                    user_email : user.email
                },
                "user-token",
                {expiresIn : "24h"}
            )
            res.status(200).send({
                message : "login successfully",
                user_id : user.id,
                userName : user.userName,
                email : user.email,
                token
            })
        })
        .catch((err)=>{
            res.status(400).send({
                message : "password doesn't match",
                err
            })
        })
    })
    .catch((error)=>{
        res.status(404).send({
            message : "email not found",
            error
        })
    })
})

//--------------- get all trainees ---------------
router.get('/all',(req,res)=>{
    userModel.find({role : "Trainee"})
    .then((trainees)=>{
        res.status(200).json(trainees)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "there is no trainees in the database",
            error
        })
    })
})
//---------------- get a spc trainee  ------------------------
router.get('/spcTrainee/:id', (req,res)=>{
    const trainee = req.params.id
    userModel.findOne({id : trainee})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "trainee not found",
            error
        })
    })
})
//------------------ update trainee info -------------
router.put('/updateTrainee/:id',(req,res)=>{
    const trainee = req.params.id;
    userModel.updateOne({id : trainee},req.body)
    .then((result)=>{
        res.status(200).send({
            message : "trainee infos updated successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "error updating trainee infos",
            error
        })
    })
})
//------------------- update trainee profile pic --------------
router.put('/updatePhoto/:id', upload.single('image'), (req, res) => {
    const trainee = req.params.id;
    const url = req.protocol + '://' + req.get('host');
    const image = url + '/public/' + req.file.filename;
  
    // Find the trainee and get the old image filename
    userModel.findOne({ id: trainee })
      .then((traineeData) => {
        if (!traineeData) {
          return res.status(404).send({
            message: "Trainee not found"
          });
        }
  
        const oldImage = traineeData.image;
  
        // Update the trainee with the new image
        userModel.updateOne({ id: trainee }, { image: image })
        .then(() => {
            res.status(200).send({
              message: "Trainee photo updated successfully"
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
              message: "Error updating trainee photo",
              error
            });
        });
    })
    .catch((error) => {
        res.status(500).send({
          message: "Error finding trainee",
          error
        });
    });
});

//-------------- delete a membership -----------------
router.delete('/delete/:id',(req,res)=>{
    const trainee = req.params.id;
    userModel.deleteOne({id : trainee})
    .then((result)=>{
        res.status(200).send({
            message : "trainee deleted successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "error deleting trainee",
            error
        })
    })
})


module.exports = router;