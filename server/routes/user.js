import  express from 'express'
import { updateuser } from '../controllers/auth/user-updates.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.patch('/updateProfile',authMiddleware,updateuser)

export default router