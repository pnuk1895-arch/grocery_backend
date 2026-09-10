const express= require('express')
const userRoute=express.Router()
const { LoginController, SignUpController } = require('../controllers/userControllers')

userRoute.post("/login", LoginController)

userRoute.post("/Signup", SignUpController)


module.exports=userRoute