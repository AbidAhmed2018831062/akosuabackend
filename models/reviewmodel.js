const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    roomname:String,
    roomprice:String,
    images:String,
    email:String,
    desc:String,
    hotelEmail:String,
    
    dateBooked:String,
   
    reviewDesc:String,
    rating:Number
  
});

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;