const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const createHttpError = require('http-errors')
const {roles} = require('../utils/constants')

// user model schema
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },      
    role : {
      type:String,
      enum : [roles.admin,roles.moderator,roles.client],
      default : roles.client
    }
})

// saving user credentials in 'USER' collection in MongoDB database
userSchema.pre('save',async function(next){
    try{
      if(this.isNew){
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(this.password,salt)
        this.password = hashPass             
        if(this.email === process.env.ADMIN_EMAIL)    {
          this.role = roles.admin
        }
      }
      next()
    }catch(e){
      next(e)
    }
})

// checking if the hashedpassword stored is correct with the input password
userSchema.methods.isValidPassword = async function (password){
  try{
    return await bcrypt.compare(password,this.password)
  }catch(e){
    throw createHttpError.InternalServerError(e.message)
  }
}

const User = mongoose.model('user',userSchema)
module.exports = User 