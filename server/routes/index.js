// *** NPM ***
import express from 'express'

// *** ROUTES ***
import loginRouter from './login'
import logoutRouter from './logout.router'
import registrationRouter from './registration'
import authenticationRouter from './authentication'
import tasksRouter from './tasks.router'
import priorityRouter from './priority.route'
import statusesRouter from './statuses.route'
import usersRouter from './users.router'
import boardRouter from './board.router'

const router = express.Router()

// login router
router.use('/login', loginRouter)
// logout router
router.use('/logout', logoutRouter)
// registration router
router.use('/registration', registrationRouter)
// check authentication router
router.use('/authentication', authenticationRouter)
// tasks router
router.use('/tasks', tasksRouter)
// priority router
router.use('/priority', priorityRouter)
// statuses router
router.use('/statuses', statusesRouter)
// users router
router.use('/users', usersRouter)
// board router
router.use('/board', boardRouter)
// catch 404 and forward to error handler
router.use((req, res) => {
    res.status(404).send()
})

export default router
