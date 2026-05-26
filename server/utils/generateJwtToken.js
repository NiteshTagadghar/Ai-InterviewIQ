import jwt from 'jsonwebtoken'


export const generateJwtToken = (payload)=>{



    const token = jwt.sign(payload,process.env.TOKEN_SECRET_KEY, {expiresIn : "7d"})

    return token
}