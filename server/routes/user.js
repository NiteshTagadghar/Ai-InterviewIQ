import  express from 'express'
import { updateuser } from '../controllers/auth/user-updates.js'

const router = express.Router()

router.patch('/updateProfile',updateuser)

export default router