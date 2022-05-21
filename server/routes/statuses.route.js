// *** NPM ***
import express from 'express'
import { checkSchema, validationResult } from 'express-validator'

// *** OTHER ***
import { Status } from '../db/models'
import { onlyAuthenticated } from '../middleware/authentication'

const router = express.Router()

router.get('/', onlyAuthenticated, async (req, res) => {
    const statuses = await Status.find()

    return res.status(200).json(statuses)
})

router.get('/:_id', onlyAuthenticated, async (req, res) => {
    const { _id } = req.params

    const status = await Status.findById(_id)

    if (status === null) {
        return res.status(404).send()
    }

    return res.status(200).json(status)
})

router.post(
    '/',
    onlyAuthenticated,
    checkSchema({
        name: {
            in: ['body'],
            notEmpty: {
                errorMessage: 'Это обязательное поле',
                bail: true,
            },
        },
    }),
    async (req, res) => {
        const errors = validationResult(req).formatWith(({ msg }) => msg)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        const { body } = req

        const newStatus = await new Status({ name: body.name })

        try {
            await newStatus.save()
        } catch (error) {
            return res.status(400).send({ errors: [{ name: error.message }] })
        }

        return res.status(200).json(newStatus)
    },
)

router.patch(
    '/:_id',
    onlyAuthenticated,
    checkSchema({
        name: {
            in: ['body'],
            notEmpty: {
                errorMessage: 'Это обязательное поле',
                bail: true,
            },
        },
    }),
    async (req, res) => {
        const errors = validationResult(req).formatWith(({ msg }) => msg)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        const { params, body } = req

        try {
            const status = await Status.findOneAndUpdate(
                { _id: params._id },
                { name: body.name },
                { new: true },
            )

            return res.status(200).json(status)
        } catch (error) {
            return res.status(400).send({ errors: [{ name: error.message }] })
        }
    },
)

router.delete(
    '/:_id',
    onlyAuthenticated,
    checkSchema({
        _id: {
            in: ['params'],
            notEmpty: {
                errorMessage: 'Это обязательное поле',
            },
        },
    }),
    async (req, res) => {
        const errors = validationResult(req).formatWith(({ msg }) => msg)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }

        const { params } = req

        const status = await Status.findOneAndDelete({ _id: params._id })

        if (status !== null) {
            return res.status(204).send()
        } else {
            return res.status(404).send()
        }
    },
)

export default router
