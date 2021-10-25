const express  = require('express');
const createHttpError = require('http-errors');
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const session = require('express-session')
const connectFlash = require('connect-flash')
const passport = require("passport")
const connectMongo = require("connect-mongo")
const isAuthenticated = require('./routes/AuthMiddleware.route').isAuth

// connecting mongo with server
mongoose.connect(process.env.MONGO_URI,{
    dbName : process.env.DB_NAME,
    useNewUrlParser: true, 
    useUnifiedTopology: true  
}).then(()=>{
    console.log('connected!!')
    app.listen(PORT,()=>console.log(`running on port ${PORT}`))
}).catch((err)=>console.log(err.message))


// Initalization
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Init Session
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie:{
        // secure:true
        maxAge : 1000 * 60 * 60 
        // httpOnly : false
    },
    store : connectMongo.create({mongoUrl: process.env.MONGO_URI,collectionName:'sessions'})
}))

// For passport JS authentication
require('./utils/passport.auth');
app.use(passport.initialize());
app.use(passport.session());

// app.use((req,res,next)=>{
//     console.log(req.session);
//     console.log(req.user);
//     res.cookie('user', req.session,{expires: new Date(Date.now()+2592000)})
//     next()
// })

// Connect flash
app.use(connectFlash())

// Routes
app.use('/',require('./routes/index.route.js'))
app.use('/auth',require('./routes/auth.route'))
app.use('/users',require('./routes/user.route'))
// app.use('/admin',connectEnsureLogin,require('./routes/user.route'))

// Handling errors
app.use((req,res,next)=>{
    next(createHttpError.NotFound())
})

// creating the express server
app.use((error,req,res,next)=>{
    error.status = error.status || 500
    res.status(error.status)
    res.send(error) 
})

// Port
const PORT = process.env.PORT || 3334

