const router = require("express").Router();
const Member = require("../models/members.model");
const User = require('../models/user.model')
const Currentbatch = require('../models/currentbatch.model')
const Timetable = require('../models/timetabel.model')
const nodemailer = require('nodemailer')
const {cloudinary} = require('../utils/cloudinary')
const path = require('path')
require('dotenv')


const sendMail = async (id) => {

    var em;
    try{        
        const des = await Member.findOne({_id:id}).exec();
        if(!des)
            console.log('error')
        else{
            em = des.email
        }
    }catch (error){
        res.status(500).json(error);
    }

    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.SECURITY_TYPE, 
        auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
      });
    
    let info = await transporter.sendMail({
        from: `"UFC" ${process.env.EMAIL_ID}` , // sender address
        to: em, // list of receivers
        subject: 'Confirmation for UFC membership', // Subject line
        text: 'Pay using given payment link below!!', // plain text body
        // html: "<b>Hello world?</b>", // html body
    });

    // console.log("Message sent: %s", info.messageId);
    return info.messageId;
}

// fetching data from the 'MEMBER' collection
router.post("/member",async (req,res)=>{    
    try{
        console.log(req.body)
        const id = req.body.studentIDEmployeeID
        const doesExist = await Member.findOne({studentIDEmployeeID:id})
        console.log(doesExist!=null)
        if(doesExist!=null){            
            res.send('error')
            return;
        }        
        var fileStr = (req.body.pimg==='')
        console.log(fileStr)
        if(!fileStr){
            const uploadedResponse = await cloudinary.uploader.upload(req.body.pimg,{
                upload_preset : 'dev_status'
            })
            console.log(uploadedResponse)
            const firstname =req.body.firstname 
            const middlename=req.body.middlename
            const lastname=req.body.lastname
            const nameofinstitute=req.body.nameofinstitute
            const nameofDepartment=req.body.nameofDepartment
            const studentIDEmployeeID=req.body.studentIDEmployeeID
            const residentialAddress=req.body.residentialAddress
            const city=req.body.city
            const zip=req.body.zip
            const telephone=req.body.telephone
            const mobileno=req.body.mobileno
            const email=req.body.email
            const dob=req.body.dob
            const state = req.body.state
            const membertype= req.body.memberType
            const bloodgrp = req.body.bloodgrp
            const gender=req.body.gender
            const emergencyContactPerson=req.body.emergencyContactPerson
            const relation=req.body.relation
            const telephone1=req.body.telephone1
            const mobileno1=req.body.mobileno1
            const email1=req.body.email1
            const membership="Verified"
            const paymentstatus="Done"
            const pimg=uploadedResponse.url
            const MoreuserDetails = new Member({firstname,middlename,lastname,nameofinstitute,nameofDepartment,studentIDEmployeeID,residentialAddress,city,zip,telephone,mobileno,email,dob,gender:"male",emergencyContactPerson,relation,telephone1,mobileno1,email1,membership,paymentstatus,pimg,membertype,bloodgrp,state});
            const des = await MoreuserDetails.save();
            console.log(des)
            if(!des)
                res.send("Error");
            else res.send('Done');
        }else{            
            const firstname =req.body.firstname 
            const middlename=req.body.middlename
            const lastname=req.body.lastname
            const nameofinstitute=req.body.nameofinstitute
            const nameofDepartment=req.body.nameofDepartment
            const studentIDEmployeeID=req.body.studentIDEmployeeID
            const residentialAddress=req.body.residentialAddress
            const city=req.body.city
            const zip=req.body.zip
            const telephone=req.body.telephone
            const mobileno=req.body.mobileno
            const email=req.body.email
            const dob=req.body.dob
            const gender=req.body.gender
            const emergencyContactPerson=req.body.emergencyContactPerson
            const relation=req.body.relation
            const state = req.body.state
            const membertype= req.body.memberType
            const bloodgrp = req.body.bloodgrp
            const telephone1=req.body.telephone1
            const mobileno1=req.body.mobileno1
            const email1=req.body.email1
            const membership="Verified"
            const paymentstatus="Done"
            const pimg=""
            const MoreuserDetails = new Member({firstname,middlename,lastname,nameofinstitute,nameofDepartment,studentIDEmployeeID,residentialAddress,city,zip,telephone,mobileno,email,dob,gender,emergencyContactPerson,relation,telephone1,mobileno1,email1,membership,paymentstatus,pimg,membertype,bloodgrp,state});
            const des = await MoreuserDetails.save().exec();
            console.log(des)
            if(!des)
                res.send("Error");
            else res.send('Done');
        }
    }catch (error){        
        res.json(error);
    } 
});

// getting users from 'USER' collection
router.get("/getusers",async (req,res)=>{
    try{
        const data = await User.find({}).exec();
        if(!data)
            res.send('error')
        else res.send(data)
    }catch(e){
        res.send('error')
    }
}) 

// getting user count
router.get("/getuserscount",async (req,res)=>{
    try{
        const data = await User.count();
        console.log(data)        
        if(!data)
            res.send('error')
        else res.send(String(data))
    }catch(e){
        res.send('error')
    }
})

// getting member count
router.get("/getmemberscount",async (req,res)=>{
    try{
        const data = await Member.count();
        // console.log(data)        
        if(!data)
            res.send('error')
        else res.send(String(data))
    }catch(e){
        res.send('error')
    }
})

// getting pending members count
router.get("/getmemberscountpending",async (req,res)=>{
    try{
        const data = await Member.find({paymentstatus : "StillDone"}).count();
        // console.log(data)        
        if(!data)
            res.send('error')
        else res.send(String(data))
    }catch(e){
        res.send('error')
    }
})

// getting pending members full details
router.get("/verificationpending",async(req,res)=>{
    try{
        const des = await Member.find({paymentstatus:"NotDone"}).count();
        if(!des)
            res.send("Error");
        else res.send(String(des));
    }catch (error){
        res.status(500).json(error);
    } 
})

router.get("/getpendingmembers",async(req,res)=>{
    try{
        const des = await Member.find({paymentstatus:"NotDone"}).exec();
        if(!des)
            res.send("Error");
        else res.send(des);
    }catch (error){
        res.status(500).json(error);
    } 
})

router.get("/paymentpending",async(req,res)=>{
    try{
        const des = await Member.find({paymentstatus:"StillDone"}).count();
        if(!des)
            res.send("Error");
        else res.send(String(des));
    }catch (error){
        res.status(500).json(error);
    } 
})

// getting all registered users details
router.post("/getusers",async (req,res)=>{
    try{
        const des = await User.find({}).exec();
        if(!des)
            res.send("Error");
        else res.send(des);
    }catch (error){
        res.status(500).json(error);
    }
});

// fetching all details of the members
router.get("/fetchmember/:id",async (req,res)=>{
    try{        
        const des = await Member.findOne({_id:req.params.id}).exec();
        if(!des)
            res.send("Error");
        else res.send(des);
    }catch (error){
        res.status(500).json(error);
    }
});

// checking if user is admin or not
router.get("/isAdmin/:id",async (req,res)=>{
    try{        
        const des = await User.findOne({_id:req.params.id}).exec();
        if(!des)
            res.send("Error");
        else res.send(des);
    }catch (error){
        res.status(500).json(error);
    }
});

// updating the member details
router.patch("/updatemember/:id",async (req,res)=>{
    try{                
        var fileStr = (req.body.pimg==='')        
        // console.log(fileStr)
        if(!fileStr){
            const uploadedResponse = await cloudinary.uploader.upload(req.body.pimg,{
                upload_preset : 'dev_status'
            })
            // console.log(uploadedResponse)
            const des = await Member.findByIdAndUpdate({_id:req.params.id},{
                $set:{                
                    firstname :req.body.firstname ,
                    middlename:req.body.middlename,
                    lastname:req.body.lastname,
                    nameofInstitute:req.body.nameofInstitute,
                    nameofDepartment:req.body.nameofDepartment,
                    studentIDEmployeeID:req.body.studentIDEmployeeID,
                    residentialAddress:req.body.residentialAddress,
                    city:req.body.city,
                    zip:req.body.zip,
                    telephone:req.body.telephone,
                    mobileno:req.body.mobileno,
                    email:req.body.email,
                    dob:req.body.dob,
                    gender:req.body.gender,
                    emergencyContactPerson:req.body.emergencyContactPerson,
                    relation:req.body.relation,
                    telephone1:req.body.telephone1,
                    mobileno1:req.body.mobileno1,
                    email:req.body.email11,
                    state : req.body.state,
                    membertype : req.body.membertype,
                    bloodgrp : req.body.bloodgrp,
                    pimg:uploadedResponse.url
                }
            });
            if(!des)
            res.send("Error");
        else res.send(des);
        }else{            
            const des = await Member.findByIdAndUpdate({_id:req.params.id},{
                $set:{                
                    firstname :req.body.firstname ,
                    middlename:req.body.middlename,
                    lastname:req.body.lastname,
                    nameofInstitute:req.body.nameofInstitute,
                    nameofDepartment:req.body.nameofDepartment,
                    studentIDEmployeeID:req.body.studentIDEmployeeID,
                    residentialAddress:req.body.residentialAddress,
                    city:req.body.city,
                    zip:req.body.zip,
                    telephone:req.body.telephone,
                    mobileno:req.body.mobileno,
                    email:req.body.email,
                    dob:req.body.dob,
                    gender:req.body.gender,
                    emergencyContactPerson:req.body.emergencyContactPerson,
                    relation:req.body.relation,
                    telephone1:req.body.telephone1,
                    mobileno1:req.body.mobileno1,
                    email:req.body.email11, 
                    state : req.body.state,
                    membertype : req.body.membertype,
                    bloodgrp : req.body.bloodgrp                   
                }
            });
            if(!des)
            res.send("Error");
        else res.send(des);
        }
        
    }catch (error){
        console.log(error)
    }
});

// confirming the members details before verifying
router.patch("/confirmmembership/:id",async (req,res)=>{
    try{
        const des = await Member.findByIdAndUpdate({_id:req.params.id},{
            $set:{                
                membership : "Verified",
                paymentstatus : "NotDone"                
            }
        });
        if(sendMail(req.params.id))
            res.send('done');
        else res.send('something went wrong')
    }catch (error){
        res.status(500).json(error);
    }
});

// deleting the member
router.post("/deletemember/:id",async(req,res)=>{
    try {
        const deleteData = await Member.findOneAndDelete({_id:req.params.id}).exec()
        res.send('done')
    } catch (e) {
        console.log(e)
        res.json({error:e})
    }
})

// getting memberes details that are verified
router.get("/getactivemembers",async(req,res)=>{
    try{
        const des = await Member.find({paymentstatus:"Done"}).exec();
        if(!des)
            res.send("Error");
        else res.send(des);
    }catch (error){
        res.status(500).json(error);
    }
})

router.patch("/changeRole/:id",async (req,res)=>{
    // console.log(req.params.id+" "+req.body.role)
    try{
        const des = await User.findByIdAndUpdate({_id:req.params.id},{
            $set:{
                role : req.body.role
            }
        });
        if(des)
            res.send('done')
        else res.send('error')
    }catch (error){
        res.status(500).json(error);
    }
});

// to update member details that his/her data is verified and change payment status to 'Done'
router.patch("/paymentdone/:id", async (req,res) => {
    try{
        const des = await Member.findByIdAndUpdate({_id:req.params.id},{
            $set:{
                paymentstatus : "Done"
            }
        });
        if(des)
            res.send('done')
        else res.send('error')
    }catch (error){
        res.status(500).json(error);
    }
})

// members which are verified but no done payment
router.get("/paymentnotdone", async (req,res) => {
    try{
        const data = await Member.find({paymentstatus : "StillDone"}).exec();        
        if(!data)
            res.send('error')
        else res.send(data)
    }catch(e){
        res.send('error')
    }
})

router.patch("/updatetimetable/:id", async (req,res) => {
    try{
        console.log(req.body)
        const des = await Timetable.findByIdAndUpdate({_id:req.params.id},{
            $set:{
                b1monbs : req.body.b1monbs,
                b1monbe : req.body.b1monbe,
                b1mongs : req.body.b1mongs,
                b1monge : req.body.b1monge,
                b2monbs : req.body.b2monbs,
                b2monbe : req.body.b2monbe,
                b2mongs : req.body.b2mongs,
                b2monge : req.body.b2monge,
                b1tuebs : req.body.b1tuebs,
                b1tuebe : req.body.b1tuebe,
                b1tuegs : req.body.b1tuegs,
                b1tuege : req.body.b1tuege,
                b2tuebs : req.body.b2tuebs,
                b2tuebe : req.body.b2tuebe,
                b2tuegs : req.body.b2tuegs,
                b2tuege : req.body.b2tuege,
                b1wedbs : req.body.b1wedbs,
                b1wedbe : req.body.b1wedbe,
                b1wedgs : req.body.b1wedgs,
                b1wedge : req.body.b1wedge,
                b2wedbs : req.body.b2wedbs,
                b2wedbe : req.body.b2wedbe,
                b2wedgs : req.body.b2wedgs,
                b2wedge : req.body.b2wedge,
                b1thurbs: req.body.b1thurbs,
                b1thurbe: req.body.b1thurbe,
                b1thurgs: req.body.b1thurgs,
                b1thurge: req.body.b1thurge,
                b2thurbs: req.body.b2thurbs,
                b2thurbe: req.body.b2thurbe,
                b2thurgs: req.body.b2thurgs,
                b2thurge: req.body.b2thurge,
                b1fribs : req.body.b1fribs,
                b1fribe : req.body.b1fribe,
                b1frigs : req.body.b1frigs,
                b1frige : req.body.b1frige,
                b2fribs : req.body.b2fribs,
                b2fribe : req.body.b2fribe,
                b2frigs : req.body.b2frigs,
                b2frige : req.body.b2frige,
                b1satbs : req.body.b1satbs,
                b1satbe : req.body.b1satbe,
                b1satgs : req.body.b1satgs,
                b1satge : req.body.b1satge,
                b2satbs : req.body.b2satbs,
                b2satbe : req.body.b2satbe,
                b2satgs : req.body.b2satgs,
                b2satge : req.body.b2satge,
                b1sunbs : req.body.b1sunbs,
                b1sunbe : req.body.b1sunbe,
                b1sungs : req.body.b1sungs,
                b1sunge : req.body.b1sunge,
                b2sunbs : req.body.b2sunbs,
                b2sunbe : req.body.b2sunbe,
                b2sungs : req.body.b2sungs,
                b2sunge : req.body.b2sunge
            }
        })
        if(des)
            res.send('done')
        else res.send('error')
    }catch (error){
        res.status(500).json(error);
    }    
})

router.get("/gettimetable",async(req,res)=>{
    try {
        const data = await Timetable.find({}).exec();        
        if(!data)
            res.send('error')
        else res.send(data)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router;
