// *** NPM ***
import express from 'express'

// *** OTHER ***
import { onlyAuthenticated } from '../middleware/authentication'

const router = express.Router()

router.get('/', onlyAuthenticated, async (req, res) => {
    req.logout()
    return res.status(200).send()
})

export default router
