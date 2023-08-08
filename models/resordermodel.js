const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    items:String,
    email:String,
    resEmail:String,
    resName:String,
    income:Number,
    orders:Number,
    reviewsating:Number,
    dateBooked:String,
    totalPrice:String
  
});

const Order = mongoose.model('resorder', orderSchema);

module.exports = Order;