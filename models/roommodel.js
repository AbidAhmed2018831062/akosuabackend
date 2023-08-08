const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomname:String,
    roomprice:String,
    images:String,
    email:String,
    desc:String,
    available:Boolean
  
});

const Room = mongoose.model('room', roomSchema);

module.exports = Room;