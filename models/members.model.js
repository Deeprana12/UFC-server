const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const currentDate = new Date().toISOString().slice(0,10);
// const dueDate = new Date().setDate(someDate.getDate() + 30);
// const one_day = 1000 * 60 * 60 * 24;
// Member schema
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },middlename:{
        type:String,
        required:true
    },lastname:{
        type:String,
        required:true
    },nameofinstitute:{
        type:String,
        required:true
    },nameofDepartment:{
        type:String,
        required:true
    },studentIDEmployeeID:{
        type:String,
        required:true
    },residentialAddress:{
        type:String,
        required:true
    },city:{
        type:String,
        required:true
    },state:{
        type:String,
        required:true
    },zip:{
        type:Number,
        required:true
    },bloodgrp:{
        type:String,
        required:true
    },membertype:{
        type:String,
        required:true
    },telephone:{
        type:Number,
        required:true
    },mobileno:{
        type:Number,
        required:true
    },email:{
        type:String,
        required:true
    },dob:{
        type:Date,
        required:true
    },gender:{
        type:String,
        required:true
    },emergencyContactPerson:{
        type:String,
        required:true
    },relation:{
        type:String,
        required:true
    },telephone1:{
        type:Number,
        required:true
    },mobileno1:{
        type:Number,
        required:true
    },email1:{
        type:String,
        required:true
    },membership :{
        type:String,
        default:'NotVerified'
    },paymentstatus :{
        type:String,
        default :'NotVerified'
    },pimg:{
        type:String,
        required:false
    },
    dueDate : {
        type : String,
        required:false        
    }
});

const Member = mongoose.model('MEMBER',userSchema);
module.exports = Member;