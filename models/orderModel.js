const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    roomname:String,
    roomprice:String,
    images:String,
    email:String,
    desc:String,
    hotelEmail:String,
    startDate:String,
    endDate:String,
    children:String,
    adult:String,
    dateBooked:String,
    totalPrice:String,
    hotelName:String
  
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;