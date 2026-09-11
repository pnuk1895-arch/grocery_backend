const JWT= require('jsonwebtoken')

async function GenToken(id, email)
{
    try
    {
        const Token=JWT.sign({ID:id,Email:email},process.env.JWT_SCRET,{expiresIn:"1d"})
        return {success:true, message:Token}        
    }catch(error){

        throw new Error({success:false, message:`Token not generated ${error.code} message:${error.message} `})
    
    }

}

module.exports=GenToken