import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    products: {
        type: String
    },
    isBuyer: {
        type: Boolean
    }
})

const User = mongoose.model('User', userSchema)
export default User