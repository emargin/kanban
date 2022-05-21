// *** NPM ***
import { Schema, model } from 'mongoose'

const prioritySchema = new Schema(
    {
        name: { type: String, unique: true, required: true },
    },
    {
        toJSON: {
            versionKey: false,
        },
    },
)

const Priority = model('Priority', prioritySchema)

export default Priority
