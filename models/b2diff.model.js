const mongoose = require('mongoose');

// Member schema
const b2diff = new mongoose.Schema({
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

const B2diff = mongoose.model('B2DIFF',b2diff);
module.exports = B2diff;

// id
// time
// date