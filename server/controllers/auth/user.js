import mongoose from "mongoose"
import { User } from "../../models/User.js"
import bcrypt from 'bcryptjs'
import { generateJwtToken } from "../../utils/generateJwtToken.js"


export const signup = async (req, res) => {
    const { name, email, password, age, phone } = req.body

    try {

        // Check if the emailId is valid from valid-users collection
        const isValidUser = await mongoose.connection.collection(process.env.VALID_USERS_COLLECTION).findOne({ email })

        if (!isValidUser) {
            return res.status(400).json({ message: "This emailid is not registered in Accio environment" })
        }

        // Check if email exists in our database already
        const isUserAlreadyExists = await User.findOne({ email })

        if (isUserAlreadyExists) {
            return res.status(400).json({ message: "emailid already exists" })
        }

        // Password hashing
        req.body.password = await bcrypt.hash(password, 10)

        // Create a new document in collection
        const newUser = await User.create(req.body)

        res.status(201).json({ message: "ok", newUser })


    } catch (err) {
        res.status(500).json({ message: err.message })
    }





}


export const login = async (req, res) => {

    // Take emailid and password
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: "email and password is required" })

    // Verify if email eixists in user
    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).json({ message: "User does not exist" })
    }

    // Verify password using bcrypt
    // bcrypt.compare(userEnteredPassword, collectionPassword)

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return res.status(400).json({ message: "Incorrect password" })
    }


    // Generate jwt token
    const token = generateJwtToken({ email: user.email, id: user._id })

    const userDetails = {
        name: user.name,
        email: user.email,
        dob: user.dob || null,
        phone: user.phone,
    }


    // Send response  
    res.status(200).json({ message: "ok", userDetails, token })
}

