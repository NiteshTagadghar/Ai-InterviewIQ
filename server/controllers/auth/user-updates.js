import  jwt  from "jsonwebtoken"
import { User } from "../../models/User.js"

export async function updateuser(req,res){

    // const {} = req.body {name : gopi}

    const userId = req.user.id
    const body = req.body // {name : bha}

    try{

        // Exclude password and email

        if(body.password){
            delete body.password
        }

        if(body.email){
            delete body.email
        }

        // {name :"nitesh", password : "nitesh"}

        const updatedUser = await User.findByIdAndUpdate(userId,body,{new : true ,runValidators : true, }).select('-password')

        if(!updatedUser){
            return res.status(404).json({message : "User not found"})
        }

        res.status(201).json({message : "ok", updatedUser})
        

    }catch(err){

        res.status(500).json({message : err.message})
    }

}