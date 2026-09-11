const bcrypt = require('bcrypt')
const SignUpModel = require('../model/SignUpModel')
const GenToken = require('../config/GenerateToken')

async function LoginController(req, res) {
    try {
        const { formObj } = req.body

        const email = formObj.email
        const password = formObj.password

        if (!email || !password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        // applying validation to chek wheatehr the client data in in correct fomat or not
        //2.Email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Please enter a valid email (e.g., user@example.com).'
                }
            )
        }

        //3.Password strength: min 8 chars, at least one uppercase, one lowercase, one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Password must be at least 8 characters and include uppercase, lowercase, and a number.'
                }
            )
        }

        const SavedUser= await SignUpModel.findOne(
            {
                Email:email
            }
        )

        if(!SavedUser)
        {
            res.status(401).json(
                {
                    success:false,
                    messages: "user doesn't exit. please SignUp"
                }
            )
        }

        const savePassword= SavedUser.Password 

        const IsCorrect=await bcrypt.compare(password,savePassword)
        
        if(IsCorrect)
        {
            const Token= await GenToken(SavedUser._id, email)
            if(Token.success)
            {
                res.cookie("Token",Token.message, {
                    httpOnly:true,
                    secure:true,
                    sameSite:"none",
                    expires:new Date(Date.now() + + 24 * 60 * 60 * 1000 )
                })

                res.status(200).json(
                    {
                        success:true,
                        message:"Login Successfully"
                    }
                )
            }
            
            
        }else{
            return res.status(402).json(
                {
                    success:false,
                    message:"Password do not match"
                }
            )
        }


    } catch (error) {
         console.log(`error spoted ${error.code}, message: ${error.message}, stack: ${error.stack}`)
        res.status(400).json(
            {
                success: false,
                message: "Try again later"
            }
        )
    }


}

async function SignUpController(req, res) {
    try {
        const { formObj } = req.body

        const email = formObj.email
        const Password = formObj.Password
        const ComfirmPassword = formObj.ComfirmPassword
        const userName = formObj.userName
        const PhoneNumber = formObj.PhoneNumber

        // 1.field checking
        if (!PhoneNumber || !Password || !ComfirmPassword || !userName || !email) {
            return res.status(400).json(
                {
                    success: false,
                    message: "all fields are required"
                }
            )
        }

        //2.Email format
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Please enter a valid email (e.g., user@example.com).'
                }
            )
        }
        //3.Password strength: min 8 chars, at least one uppercase, one lowercase, one number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(Password)) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Password must be at least 8 characters and include uppercase, lowercase, and a number.'
                }
            )
        }

        if (Password !== ComfirmPassword) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Comfirm Password do not match'
                }
            )
        }

        // bcrypt the password 
        const hashPassword = await bcrypt.hash(Password, 10)
        const hashComfirmPassword = await bcrypt.hash(ComfirmPassword, 10)

        // save user signup data into mongoDb 
        const User = await SignUpModel.create(
            {
                UserName: userName,
                PhoneNumber: PhoneNumber,
                Email: email,
                ComfirmPassword: hashComfirmPassword,
                Password: hashPassword,
            }
        )

        const Token = await GenToken(User._id, User.Email)
        //  console.log(Token)
        if (Token.success) {
            res.cookie("Token", Token.message,
                {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
                }
            )
            return res.status(201).json(
                {
                    success: true,
                    message: "Sign in Successfully"
                }
            )
        }


    } catch (error) {
        console.log(`error spoted ${error.code}, message: ${error.message}, stack: ${error.stack}`)
        res.status(400).json(
            {
                success: false,
                message: "Try again later"
            }
        )
    }
}


module.exports = {
    LoginController,
    SignUpController
}