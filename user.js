const multer = require("multer")
const express = require("express");
const router =express.Router();
const User=require("./models/usermodel");
router.post("/createuser",async(req,res)=>{
    const {email,password}=req.body;
    User.findOne({email:email}).then((currentUser) => {
        if(currentUser){
            // already have this user
           // console.log('user is: ', currentUser);
          res.status(400).send("Email Already Exists");
        } else {
            // if not, create user in our db
            new User({
                email,password,orders:0,dob:"",gender:"",phone:"",location:""
              
            }).save().then((newUser) => {
                console.log('created new user: ', newUser);
               res.send(newUser);
            });
        }
    });


});
router.get("/getuser",async(req,res)=>{
  const {email}=req.query;
    User.findOne({email:email}).then((currentUser) => {
        res.send(currentUser);

    }).catch(err=>res.send(err));


});
router.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
      User.findOne({email:email, password:password}).then((currentUser) => {
          res.send(currentUser);
  
      }).catch(err=>res.send(err));
  
  
  });

router.put("/update",async(req,res)=>{
   
    const {location,phone,email,name,gender,dob}=req.body;
    User.updateOne({_id:req.body._id},{
        location,phone,email,name,gender,dob
    }).then(response=>{
      res.status(200).status(response);
    }).catch(err=>res.status(400).send(err))
});

module.exports=router;