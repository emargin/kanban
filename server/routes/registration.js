// *** NPM ***
import express from 'express'
import { checkSchema, validationResult } from 'express-validator'

// *** OTHER ***
import { User } from '../db/models'
import { onlyNotAuthenticated } from '../middleware/authentication'

const router = express.Router()

router.post(
    '/',
    onlyNotAuthenticated,
    checkSchema({
        '*': {
            in: ['body'],
            notEmpty: {
                errorMessage: 'Это обязательное поле',
                bail: true,
            },
        },
        email: {
            isEmail: {
                errorMessage: 'Должен быть введен корректный адрес электронной почты',
                bail: true,
            },
            custom: {
                options: (value) => {
                    return User.emailExists(value).then((user) => {
                        if (user) {
                            return Promise.reject('Этот адрес электронной почты уже используется')
                        }
                    })
                },
            },
        },
        username: {
            custom: {
                options: (value) => {
                    return User.usernameExists(value).then((user) => {
                        if (user) {
                            return Promise.reject('Такое имя пользователя уже существует')
                        }
                    })
                },
            },
        },
        password: {},
    }),
    async (req, res) => {
        const errors = validationResult(req, { strictParams: true }).formatWith(({ msg }) => msg)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        await new User(req.body).save()

        return res.sendStatus(201)
    },
)

export default router
