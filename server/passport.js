// *** NPM ***
import passport from 'passport'
import LocalStrategy from 'passport-local'

// *** OTHER ***
import { User } from './db/models'

passport.use(
    'MongoLocal',
    new LocalStrategy(
        {
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                const user = await User.authenticate(username, password)
                done(null, user)
            } catch (error) {
                done(error)
            }
        },
    ),
)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
        if (error) return done(error)
        return done(null, user)
    })
})
