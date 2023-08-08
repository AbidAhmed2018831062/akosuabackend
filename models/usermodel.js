const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:String,
    password:String,
    orders:Number,
    name:String,
    dob:String,
    gender:String,
    phone:String,
    location:String,
  
});

const User = mongoose.model('user', userSchema);

module.exports = User;