// *** NPM ***
import express from 'express'

// *** OTHER ***
import { Status } from '../db/models'
import { onlyAuthenticated } from '../middleware/authentication'

const router = express.Router()

router.get('/', onlyAuthenticated, async (req, res) => {
    const board = await Status.find().populate([
        {
            path: 'tasks',
            model: 'Status',
            populate: [
                {
                    path: 'author',
                    select: '-password',
                },
                {
                    path: 'implementers',
                    select: '-password',
                },
                'status',
                'priority',
            ],
        },
    ])

    return res.status(200).json(board)
})

export default router
