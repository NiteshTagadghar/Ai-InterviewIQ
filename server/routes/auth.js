import express from 'express'
import { signup } from '../controllers/auth/user.js'

const router = express.Router()


router.post("/signup",signup)


router.post("/login",(req,res)=>{
    console.log("login")
})

export default router