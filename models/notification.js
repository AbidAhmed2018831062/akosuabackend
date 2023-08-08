const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notiSchema = new Schema({
    roomname:String,
    roomprice:String,
    images:String,
    email:String,
    desc:String,
    hotelEmail:String,
    dateBooked:String,
    totalPrice:String,
    hotelName:String,
    notidesc:String
  
});

const notification = mongoose.model('notification', notiSchema);

module.exports = notification;