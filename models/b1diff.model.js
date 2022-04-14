const mongoose = require('mongoose');

// Member schema
const b1diff = new mongoose.Schema({
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

const B1diff = mongoose.model('B1DIFF',b1diff);
module.exports = B1diff;

// id
// time
// date