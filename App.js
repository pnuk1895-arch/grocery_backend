const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoute=require('./Routes/userRoute')

const App = express()
dotenv.config()

App.use(express.json())
App.use(cors({
    origin: process.env.FrontEnd_URL
    // Credential:true  
}))


App.use(userRoute)



async function mongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('mongoDB connection being sucessfully')
        App.listen(process.env.PORT, () => {
            console.log("server is listening at https://localhost:4000")
        })
    } catch (error) {
        console.log(`error while connecting: ${error}`)
    }
}
mongoDB()

