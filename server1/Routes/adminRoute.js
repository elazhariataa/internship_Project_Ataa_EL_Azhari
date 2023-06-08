const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const userModel = require('../Models/userModel');
const upload = require('../Middleware/fileUploadMiddleware');


//--------------- Login ------------------------
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
                "admin-token",
                {expiresIn : "24h"}
            )
            res.status(200).send({
                message : "login successfully",
                user_id : user.id,
                userName : user.userName,
                email : user.email,
                role : user.role,
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
//------------------- update admin info ----------------
router.put('/updateAdmin/:id',(req,res)=>{
    const admin = req.params.id;
    userModel.updateOne({id : admin},req.body)
    .then((result)=>{
        res.status(200).send({
            message : "admin infos updated successfully"
        })
    })
    .catch((error)=>{
        res.status(500).send({
            message : "error updating admin infos",
            error
        })
    })
})
//--------------- update admin profile pic ----------
router.put('/updatePhoto/:id',upload.single('image'),(req,res)=>{
    const admin = req.params.id;
    const url = req.protocol + '://' + req.get('host')
    const image = url + '/public/' + req.file.filename

    // Find the trainee and get the old image filename
    userModel.findOne({ id: admin })
      .then((adminData) => {
        if (!adminData) {
          return res.status(404).send({
            message: "Admin not found"
          });
        }
  
        const oldImage = adminData.image;
  
        // Update the trainee with the new image
        userModel.updateOne({ id: admin }, { image: image })
        .then(() => {
            res.status(200).send({
              message: "Admin photo updated successfully"
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
              message: "Error updating admin photo",
              error
            });
        });
    })
    .catch((error) => {
        res.status(500).send({
          message: "Error finding admin",
          error
        });
    });
})
//---------------- get admin inf ----------------
router.get('/spcAdmin/:id', (req,res)=>{
    const admin = req.params.id
    userModel.findOne({id : admin})
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((error)=>{
        res.status(404).send({
            message : "admin not found",
            error
        })
    })
})


module.exports = router;