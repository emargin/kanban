// *** NPM ***
import express from 'express'
import passport from 'passport'

// *** OTHER ***
import { onlyNotAuthenticated } from '../middleware/authentication'

const router = express.Router()

router.post('/', onlyNotAuthenticated, (req, res, next) => {
    passport.authenticate('MongoLocal', (err, user) => {
        if (err) {
            return next(err)
        }

        if (!user) {
            return res.status(401).send()
        }

        req.logIn(user, (error) => {
            if (error) {
                return next(error)
            }
            return res.status(204).send()
        })
    })(req, res, next)
})

export default router
