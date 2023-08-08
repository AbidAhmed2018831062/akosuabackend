const multer = require("multer")
const express = require("express");
const router =express.Router();
const hotelModel=require("./models/hotelmodel");
const Order=require("./models/orderModel");
const { route } = require("./user");
const ResOrder=("./models/resordermodel");
const notification=require("./models/notification");
// router.get("/getorders",async(req,res)=>{
//     let email=req.query.email;
//     Order.find({email}).then(hotelOrder=>{
//         ResOrder.find({email}).then(resOrder=>{
//             res.status(200).send({hotelOrder,resOrder});
//         }).catch(err=>{
//             res.status(200).send({hotelOrder,resOrder:{}});
//         })
      
//     }).catch(err=>{
//         res.status(404).send("No order found with such email");
//     })
// });
router.post("/createorder",async(req,res)=>{
    const {  roomname,
        roomprice,
        images,
        email,
        desc,
        hotelEmail,
        startDate,
        endDate,
        children,
        adult,
        dateBooked,
        totalPrice,
        orders,reviews,income
      }=req.body;
      let hotelIncome=parseFloat(income);
      hotelIncome+=parseFloat(totalPrice);
   new Order({
    roomname,
    roomprice,
        images,
        email,
        desc,
        hotelEmail,
        startDate,
        endDate,
        children,
        adult,
        dateBooked,
        hotelName:req.body.hotelName,
        totalPrice
   }).save().then(response=>{
    hotelModel.updateOne({email:hotelEmail},{
       orders:orders+1,
       income:hotelIncome
    }).then(hotel=>{
        res.status(200).send("Successfully Booked");
    }).catch(err=>console.log(err))
   
   }).catch(err=>res.send(err))
   new notification({
    roomname,
    roomprice,
        images,
        email,
        desc,
        hotelEmail,
        dateBooked,
        hotelName:req.body.hotelName,
        totalPrice,
        notidesc:"A new order has been placed at your hotel for room name:"+roomname
   }).save().then(respo=>console.log("Successful"))
});

router.get("/getorders",async(req,res)=>{
    let email=req.query.email;
    Order.find({email}).then(hotelOrder=>{
        res.status(200).send({hotelOrder,resOrder:[]});
    }).catch(err=>{
        res.status(404).send("No order found with such email");
    })
});

module.exports=router;