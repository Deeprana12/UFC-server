const mongoose = require('mongoose');

// Member schema
const b1regular = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },title:{
        type:String,
        required:true
    },completed:{
        type:String,
        required:true
    },userId:{
        type:String,
        required:true        
    }
});

const B1regular = mongoose.model('B1REGULAR',b1regular);
module.exports = B1regular;

// id
// time
// date