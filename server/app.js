// *** NPM ***
import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import logger from 'morgan'
import cors from 'cors'

// *** OTHER ***
import './passport'
import './db/connection'
import routes from './routes'

const app = express()

// settings
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// cors settings
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }),
)

// session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongoUrl: process.env.MONGO_CONNECTION_STRING,
            collection: 'sessions',
        }),
        cookie: {
            sameSite: process.env.COOKIES_SAMESITE,
            secure: +process.env.COOKIE_SECURE === 1,
            expires: new Date(Date.now() + Number(process.env.COOKIES_LIFETIME)),
        },
    }),
)

// passport init
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/', routes)

// error handler
app.use((err, req, res) => {
    // return error code
    res.status(err.status || 500).send()
})

export default app
