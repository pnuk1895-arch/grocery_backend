const mongoose = require('mongoose')

const signUpSchema = mongoose.Schema(
    {
        UserName: {
            type: String,
            required: true
        },
        PhoneNumber: {
            type: Number,
            required: true
        },
        Email: {
            type: String,
            required: true
        },
        Password: {
            type: String,
            required: true
        },
        ComfirmPassword: {
            type: String,
            required: true
        }
    }
)

const SignUpModel = mongoose.model("SignUpCollection", signUpSchema)

module.exports = SignUpModel