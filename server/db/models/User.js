// *** NPM ***
import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
})

userSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.password = await bcrypt.hash(
            this.password,
            Number(process.env.CRYPT_PASSWORD_SALT_ROUND),
        )
    }
    next()
})

userSchema.static('usernameExists', async function (username) {
    const user = await this.findOne({ username })
    return Boolean(user)
})

userSchema.static('emailExists', async function (email) {
    const user = await this.findOne({ email })
    return Boolean(user)
})

userSchema.static('authenticate', async function (username, plainTextPassword) {
    const user = await this.findOne({ $or: [{ email: username }, { username }] })
    if (user && (await bcrypt.compare(plainTextPassword, user.password))) {
        return user
    }
    return false
})

const User = model('User', userSchema)

export default User
