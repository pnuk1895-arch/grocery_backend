function LoginController(req, res) {
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

    return res.status(200).json(
        {
            success: true,
            message: "validation sucessfully"
        }
    )


}

function SignUpController(req, res) {
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



    res.status(200).json(
        {
            success:true,
            message:"validation successfully of signup"
        }
    )
}



module.exports = {
    LoginController,
    SignUpController
}