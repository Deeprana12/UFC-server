const router = require("express").Router();
const Member = require("../models/members.model");
const User = require('../models/user.model')
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
        console.log(req.file)
        const {firstname,middlename,lastname,nameofinstitute,nameofDepartment,studentIDEmployeeID,residentialAddress,city,zip,telephone,mobileno,email,dob,gender,emergencyContactPerson,relation,telephone1,mobileno1,email1,membership,paymentstatus,pimg} = req.body;
        const MoreuserDetails = new Member({firstname,middlename,lastname,nameofinstitute,nameofDepartment,studentIDEmployeeID,residentialAddress,city,zip,telephone,mobileno,email,dob,gender,emergencyContactPerson,relation,telephone1,mobileno1,email1,membership,paymentstatus,pimg});
        const tempMoreuserDetails = await MoreuserDetails.save();
        if(tempMoreuserDetails)
            res.json({msg:"done"});
        else res.json({error:"failed!"});
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
        console.log(data)        
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
        const data = await Member.find({membership : "NotVerified"}).count();
        console.log(data)        
        if(!data)
            res.send('error')
        else res.send(String(data))
    }catch(e){
        res.send('error')
    }
})

// getting pending members full details
router.get("/getpendingmembers",async(req,res)=>{
    try{
        const des = await Member.find({membership:"NotVerified"}).exec();
        if(!des)
            res.send("Error");
        else res.send(des);
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
        const fileStr = req.body.pimg
        const uploadedResponse = await cloudinary.uploader.upload(fileStr,{
            upload_preset : 'dev_status'
        })
        console.log(uploadedResponse)
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
                pimg:uploadedResponse.url
            }
        });
        if(!des)
            res.send("Error");
        else res.send(des);
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
        const des = await Member.find({membership:"Verified"}).exec();
        if(!des)
            res.send("Error");
        else res.send(des);
    }catch (error){
        res.status(500).json(error);
    }
})

router.patch("/changeRole/:id",async (req,res)=>{
    console.log(req.params.id+" "+req.body.role)
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
        const data = await Member.find({paymentstatus : "NotDone"}).exec();        
        if(!data)
            res.send('error')
        else res.send(data)
    }catch(e){
        res.send('error')
    }
})

module.exports = router;