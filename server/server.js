import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import interviewRouter from './routes/interview.js'
import http from 'http'
import { Server } from 'socket.io'
import interviewSocket from './sockets/interviewSocket.js'
import jwt from 'jsonwebtoken'
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


app.use("/auth",authRouter)

app.use("/user",userRouter)

app.use("/interview",interviewRouter)

// Create a new server for socket.io
const server = http.createServer(app)

// Create instance for socket io by providing server info
const io = new Server(server,{
    cors : "*",
    methods : ["GET","POST"]
})

// Create a io middleware to get token
io.use((socket,next)=>{

    const token = socket.handshake.auth.token

    if(!token){

        socket.emit("auth", { message : "Token not provided"})
        socket.off()
    }

    try{

    const userData = jwt.verify(token,process.env.TOKEN_SECRET_KEY)

    socket.userId = userData.id

    next()

    }catch(err){

        console.log(err.message, 'error while extracting token')

        socket.off()

        // Create a error middlware and pass it there
    }


})

// Once connection io established execute callback
io.on("connection",(socket)=>{
    console.log(socket.userId,'user id in sockets')
    interviewSocket(socket)
})


const port = process.env.PORT


// Change app (express default server) to http created server with socket.io
server.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})


/* 

Step 1 : Create a folder for middlewares, then file for authMiddleware (verify jwt token and also check if token in expired)


*/