const multer = require("multer")
const express = require("express");
const router =express.Router();
const resModel=require("./models/resModel");
const Order=require("./models/resordermodel");
const { route } = require("./user");
const notification=require("./models/notification")
router.post("/createorder",async(req,res)=>{
    const {   items,
        email,
        resEmail,
        resName,
        income,
        orders,
        reviewsating,
        dateBooked,
       
        totalPrice
      }=req.body;
      let resIncome=parseFloat(income);
      resIncome+=parseFloat(totalPrice);
      console.log(resEmail)
   new Order({
    items,
        email,
        resEmail,
        resName,
        income:resIncome,
        orders,
        reviewsating,
        dateBooked,
       
        totalPrice
   }).save().then(response=>{
    resModel.updateOne({email:resEmail},{
       orders:orders+1,
       income:resIncome
    }).then(hotel=>{
        res.status(200).send("Successfully Booked");
    }).catch(err=>console.log(err))
   
   }).catch(err=>res.send(err))
   new notification({
    roomname:items,
        email,
        hotelEmail:resEmail,
        dateBooked,
        hotelName:req.body.resName,
        notidesc:"A new order has been placed at your restaurant and total price is: $"+totalPrice
   }).save().then(respo=>console.log("Successful"))
});

router.get("/getorders",async(req,res)=>{
    let email=req.query.email;
    Order.find({email}).then(response=>{
        res.status(200).send(response);
    }).catch(err=>{
        res.status(404).send("No order found with such email");
    })
});

module.exports=router;