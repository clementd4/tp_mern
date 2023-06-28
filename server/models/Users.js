const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    firstName: {
        type:String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    }
})

module.exports = Product = mongoose.model('users', UsersSchema, "users");
