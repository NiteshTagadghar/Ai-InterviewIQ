import  jwt  from "jsonwebtoken"

export function updateuser(req,res){

    // const {} = req.body

    const token = req.headers.authorization


    console.log(token)

    const payload = jwt.verify(token,process.env.TOKEN_SECRET_KEY)

    console.log(payload)

    res.status(200).json({message : "ok"})
}