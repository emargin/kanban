// *** NPM ***
import express from 'express'

// *** OTHER ***
import { User } from '../db/models'
import { onlyAuthenticated } from '../middleware/authentication'

const router = express.Router()

router.get('/', onlyAuthenticated, async (req, res) => {
    const users = await User.find().select('-password')
    return res.status(200).json(users)
})

export default router
