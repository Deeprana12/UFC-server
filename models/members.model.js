const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },zip:{
        type:Number,
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
    }

});

const Member = mongoose.model('MEMBER',userSchema);
module.exports = Member;