const mongoose = require('mongoose');

// Member schema
const b2regular = new mongoose.Schema({
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

const B2regular = mongoose.model('B2REGULAR',b2regular);
module.exports = B2regular;

// id
// time
// date