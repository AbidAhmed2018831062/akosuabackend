const multer = require("multer")
const express = require("express");
const router =express.Router();
const hotelModel=require("./models/hotelmodel");
const Review=require("./models/reviewmodel");
const ResReview=require("./models/resReview");
const resModel=require("./models/resModel");
const nodemailer = require("nodemailer");
const notification=require("./models/notification")
router.post("/createreview",async(req,res)=>{
    const {  roomname,
        roomprice,
        images,
        email,
        desc,
        hotelEmail,
        dateBooked,
        hotelRating,
        orders,reviews,income,rating,reviewDesc
      }=req.body;
     let review=reviews;
     let totalRating=hotelRating*reviews+rating;
     review++;
     let newRating=totalRating/review;

   new Review({
    roomprice,
        images,
        email,
        desc,
        hotelEmail,
        dateBooked,
        rating,
        reviewDesc
   }).save().then(response=>{
    hotelModel.updateOne({email:hotelEmail},{
      rating:newRating,
      reviews:review
    }).then(hotel=>{
        res.status(200).send(" Review Posted Successfully");
    }).catch(err=>res.send(err))
   
   }).catch(err=>res.send(err))
   new notification({
    roomname,
        images,
        email,
        hotelEmail,
        dateBooked,
        hotelName:req.body.hotelName,
      
        notidesc:"User has provided review of your hotel and provided a "+rating+" star ratimng"
   }).save().then(respo=>console.log("Successful"))
})
router.post("/rescreatereview",async(req,res)=>{
  const {  items,
      images,
      email,
      resEmail,
      totalPrice,
      dateBooked,
      resRating,
      orders,reviews,income,rating,reviewDesc
    }=req.body;
   let review=reviews;
   let totalRating=resRating*reviews+rating;
   review++;
   let newRating=totalRating/review;

 new ResReview({
  items,
      images,
      email,
      totalPrice,
      resEmail,
      dateBooked,
      rating,reviewDesc
 }).save().then(response=>{
  resModel.updateOne({email:resEmail},{
    rating:newRating,
    reviews:review
  }).then(hotel=>{
      res.status(200).send(" Review Posted Successfully");
  }).catch(err=>res.send(err))
 
 }).catch(err=>res.send(err))
 new notification({
  roomname:items,
      images,
      email,
      hotelEmail:resEmail,
      dateBooked,
      notidesc:"User has provided review of your restaurant and provided a "+rating+" star ratimng"
 }).save().then(respo=>console.log("Successful"))
});

router.get("/getreviews",async(req,res)=>{
  Review.find({hotelEmail:req.query.email}).then(response=>{
     res.send(response)
  }).catch(err=>{
      res.status(400).send(err);
  })
});
router.get("/getnotifications",async(req,res)=>{
  console.log("Hello");
  notification.find({email:req.query.email}).then(notifications=>{
    res.send(notifications);
  }).catch(err=>res.send(err))
})
router.post("/sendemail",async(req,res)=>{
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'vidal.collins@ethereal.email',
        pass: 'mjxy36CyQXtakHWfvG'
    }
});
const info = await transporter.sendMail({
  from: `"Pride App" <vidal.collins@ethereal.email>`, // sender address
  to: `${req.body.email}`, // list of receivers
  subject: "Thanking the User", // Subject line
  text: `${req.body.mainbody}` // plain text body

});
new notification({
  
      email:req.body.email,
     
      notidesc:"The hotel has thanked you for your review. View your mail to find out the thanking report"
 }).save().then(respo=>console.log("Successful"))
res.send("Email sent successfully");
})
module.exports=router;