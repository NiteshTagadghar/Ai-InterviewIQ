import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
// import  jsonwebtoken  from 'jsonwebtoken'
// import cookieParser from 'cookie-parser'



const app = express()

app.use(express.json())

app.use(cors())


mongoose.connect(process.env.DB_URI).then(()=>{
    console.log(`DB connected`)
}).catch((err)=>{
    console.log(err.message)
})



// app.post("/auth/signup",(req,res)=>{
//     console.log("api hitting directly")
// })

app.use("/auth",authRouter)

app.use("/user",userRouter)


 /*
 req = {}


 10

 middleware -> extract user details from token

 req.user = payload
 */


const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})