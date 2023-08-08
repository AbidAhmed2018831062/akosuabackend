const express = require("express");
var bodyParser = require('body-parser')
const cors = require("cors");
const mongoose=require("mongoose");

const app = express();
var jsonParser = bodyParser.json();
const hotel=require("./hotel");
const user=require("./user");
const order=require("./orders");
const review=require("./reviews");
const restaurant=require("./restaurant");
const resOrder=require("./resOrder");

mongoose.connect("mongodb://0.0.0.0/hotelbooking",{

}).then(()=>console.log("Connection successful")).catch(err=>console.log(err));
app.use(express.json());
app.use(cors());
app.use("/user",user);
app.use("/hotel",hotel);
app.use("/order",order);
app.use("/review",review);
app.use("/restaurant",restaurant);
app.use("/resorder",resOrder);
const PUBLISHABLE_KEY = "pk_test_51N9lmKHIBvxG8JCLSb1Yqo5fBlmNA1lDqlUsd5cIbrewFEC6AUBIoZ9Sdht91PbTfZBqUYLISBySr5MTNhZh9foX00XwgE11ui";
const SECRET_KEY = "sk_test_51N9lmKHIBvxG8JCLXtUfYtTSazYZeYL4zqe9mCjS2CrnDwy6hYfaBRCboF6ytzFjMKU7x3M1E47cnazNrCKFoxa000iSR3RbTI";
const Stripe =require("stripe");

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });


app.post("/create-payment-intent", async (req, res) => {
  try {
    console.log(req.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(req.body.price), //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
app.listen("5000", () => {
    console.log("Server is running!");
  });


