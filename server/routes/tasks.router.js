// *** NPM ***
import express from 'express'
import { checkSchema, validationResult } from 'express-validator'

// *** OTHER ***
import { Task } from '../db/models'
import { onlyAuthenticated } from '../middleware/authentication'

const router = express.Router()

router.get('/', onlyAuthenticated, async (req, res) => {
    const tasks = await Task.find()
        .populate([
            { path: 'author', select: '-password' },
            { path: 'implementers', select: '-password' },
        ])
        .exec()

    return res.json(tasks)
})

router.get(
    '/:id',
    onlyAuthenticated,
    checkSchema({
        id: {
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

        const { id } = req.params

        const result = await Task.findOne({ _id: id }).populate([
            { path: 'author', select: '-password' },
            { path: 'implementers', select: '-password' },
        ])

        if (result !== null) {
            return res.status(200).json(result)
        } else {
            return res.status(404).send()
        }
    },
)

router.post(
    '/',
    onlyAuthenticated,
    checkSchema({
        '*': {
            in: ['body'],
        },
        name: {
            notEmpty: {
                errorMessage: 'Это обязательное поле',
                bail: true,
            },
        },
        description: {
            notEmpty: {
                errorMessage: 'Это обязательное поле',
                bail: true,
            },
        },
        priority: {
            notEmpty: {
                errorMessage: 'Это обязательное поле',
                bail: true,
            },
        },
        deadline: {
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

        const newTask = await new Task({ author: req.user, ...req.body })
        await newTask.save()
        await Task.populate(newTask, [
            { path: 'author', select: '-password' },
            { path: 'implementers', select: '-password' },
        ])

        return res.status(200).json(newTask)
    },
)

router.patch(
    '/:id',
    onlyAuthenticated,
    checkSchema({
        id: {
            in: ['params'],
            matches: {
                options: [/^[0-9a-fA-F]{24}$/],
                errorMessage: 'Не верный формат id',
            },
        },
        name: {
            in: ['body'],
            notEmpty: {
                errorMessage: 'Это обязательное поле',
                bail: true,
            },
        },
        description: {
            in: ['body'],
            notEmpty: {
                errorMessage: 'Это обязательное поле',
                bail: true,
            },
        },
        priority: {
            in: ['body'],
            notEmpty: {
                errorMessage: 'Это обязательное поле',
                bail: true,
            },
        },
        deadline: {
            in: ['body'],
            notEmpty: {
                errorMessage: 'Это обязательное поле',
                bail: true,
            },
        },
        implementers: {
            in: ['body'],
        },
    }),
    async (req, res) => {
        /*const errors = validationResult(req, { strictParams: true }).formatWith(({ msg }) => msg)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.mapped() })
        }*/

        const {
            user,
            params: { id },
            body: { status, title, name, description, priority, deadline, implementers },
        } = req

        const result = await Task.findOneAndUpdate(
            { _id: id, user },
            { status, title, name, description, priority, deadline, implementers },
            { new: true },
        ).populate([
            { path: 'author', select: '-password' },
            { path: 'implementers', select: '-password' },
        ])

        return res.status(200).json(result)
    },
)

router.delete(
    '/:id',
    onlyAuthenticated,
    checkSchema({
        id: {
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

        const { user, params } = req

        const result = await Task.findOneAndDelete({ _id: params.id, author: user })

        if (result !== null) {
            return res.status(204).send()
        } else {
            return res.status(404).send()
        }
    },
)

export default router
