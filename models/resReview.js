const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    items:String,
  
    images:String,
    email:String,
    resEmail:String,
    totalPrice:String,
    dateBooked:String,
   
    reviewDesc:String,
    rating:Number
  
});

const Review = mongoose.model('resreview', reviewSchema);

module.exports = Review;