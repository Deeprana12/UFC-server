const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Member schema
const currentbatch = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },lastname:{
        type:String,
        required:true
    },punch:{
        type:Time,
        required:true
    },dateduration:{
        type:Date,
        required:true
    },currentimg:{
        type:String,
        required:true
    }
});

const Currentbatch = mongoose.model('CURRENTBACTH',currentbatch);
module.exports = Currentbatch;