// *** NPM ***
import express from 'express'

// *** OTHER ***
import { onlyAuthenticated } from '../middleware/authentication'

const router = express.Router()

router.get('/', onlyAuthenticated, async (req, res) => {
    const { _id, username, email } = req.user
    return res.status(200).json({ _id, username, email })
})

export default router
