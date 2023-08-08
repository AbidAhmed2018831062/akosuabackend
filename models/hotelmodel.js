const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hotelSchme = new Schema({
    name:String,
    address:String,
    taxId:String,
    accountName:String,
    accountNumber:String,
    email:String,
    password:String,
    video:String,
    images:String,
    document:String,
    idCard:String,
    rooms:Number,
    orders:Number,
    reviews:Number,
    verified:Boolean,
    cancellationPolicy:String,
    income:Number,
    rating:Number,
    desc:String,
    phone:String,

});

const hotel = mongoose.model('hotel', hotelSchme);

module.exports = hotel;