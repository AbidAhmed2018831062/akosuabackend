const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    itemname:String,
    itemprice:String,
    images:String,
    email:String,
    desc:String,
    available:Boolean,
    menu:String
  
});

const Menu = mongoose.model('menu', menuSchema);

module.exports = Menu;