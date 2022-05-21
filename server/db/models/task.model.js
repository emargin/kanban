// *** NPM ***
import { Schema, model } from 'mongoose'

const taskSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        description: String,
        priority: { type: Schema.Types.ObjectId, ref: 'Priority' },
        status: { type: Schema.Types.ObjectId, ref: 'Status' },
        start_date: { type: Date, default: new Date() },
        end_date: Date,
        deadline: Date,
        implementers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        toJSON: {
            versionKey: false,
        },
    },
)

const Task = model('Task', taskSchema)

export default Task
