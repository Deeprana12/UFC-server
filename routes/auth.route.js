const router  = require('express').Router()
const User = require('../models/user.model')
const {body,validationResult} = require('express-validator')
const passport = require('passport')

// login router calling passportJS 
router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {        
        if (err) { return res.send(err); }
        if (!user) { return res.json({msg:"false"}); }
        req.logIn(user, function(err) {
            if (err) { return send(err); }
            return res.send({msg:"done",userData:user._id,role:user.role,fname:user.firstname,lname:user.lastname});
        });
    })(req, res, next); 
  });

// register router that will check & verify the user
router.post('/register',async(req,res,next)=>{   
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                // console.log(errors)
                res.send({err:true,data:errors})
                return;
            }
            const {email} = req.body
            const doesExist = await User.findOne({email:email})
            if(doesExist){            
                res.json({err:true})
                return;
            }
            const user = new User({firstname:req.body.fname,lastname:req.body.lname,email:req.body.email,password:req.body.password})        
            await user.save()
            res.json({err:false})
        } catch (error) {
            console.log(error)            
            next(error)
        }
})

// router.get('/logout',ensureAuthenticated,async(req,res,next)=>{
//     req.logout()
//     res.json({err:false})
// })


module.exports = router;