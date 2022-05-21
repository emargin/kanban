// *** NPM ***
import { Schema, model } from 'mongoose'

const statusSchema = new Schema(
    {
        name: { type: String, unique: true, required: true },
    },
    {
        toJSON: {
            virtuals: true,
            versionKey: false,
        },
    },
)

statusSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'status',
})

const Status = model('Status', statusSchema)

export default Status
