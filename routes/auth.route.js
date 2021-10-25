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
            return res.send({msg:"done",userData:user._id});
        });
    })(req, res, next);
  });

// register router that will check & verify the user
router.post('/register',[
    body('email').trim().isEmail().withMessage('Email must be valid!!')
    .normalizeEmail(),
    body('password').trim().isLength(8).withMessage('Password length must be minimum 8'),
    body('checkPass').custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error('Passwords do not match!!')
        }
        return true;
        })
    ],async(req,res,next)=>{   

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
            const user = new User({email:req.body.email,password:req.body.password})        
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