import { Schema, models, model } from "mongoose"

const userSchema = new Schema({
    username: String,
    password: String,
})

const Users = models.users || model('users', userSchema)
export default Users