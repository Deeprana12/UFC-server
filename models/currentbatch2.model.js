const mongoose = require('mongoose');

// Member schema
const currentbatch2 = new mongoose.Schema({
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

const Currentbatch2 = mongoose.model('CURRENTBATCH2',currentbatch2);
module.exports = Currentbatch2;

// id
// time
// date