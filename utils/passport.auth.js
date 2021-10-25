const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.model')

passport.use(
    new LocalStrategy ({
        usernameField : "email", //from member form
        passwordField : "password" //from member form
    },async (email,password,done)=>{ //done:callback function
        try {
            const user = await User.findOne({email:email})
            // if email already exists
            if(!user){
                return done(null,false,{error:"Email doesn't exists"})
            }
            // if email does not exists & now we need to verify the password,
            // the function is in the User.model file
            const isMatch = await user.isValidPassword(password)
            
            if(isMatch){
                return done(null,user)
            }else{
                return done(null,false,{error:"Incorrect Password/Username"})
            }            
        } catch (e) {
            done(e)
        }
    })
    )

// no need to worry about this thing, it's all done in behind-the-scene side

// this is for setting the user-id inside the session & sesssion will automatically
// generate the cookie
passport.serializeUser(function(user, done) {
    done(null, user.id);
    });
    
// whenever a req comes from the browser it will contain cookie then from this cookie we find the session,
// if session exists then done function will be called automatically
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

