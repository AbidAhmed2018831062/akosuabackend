const { Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resSchme = new Schema({
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
    websiteLink:String,
    phone:String,

});

const Restaurant = mongoose.model('restaurant', resSchme);

module.exports = Restaurant;