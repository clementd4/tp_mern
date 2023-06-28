const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    // id: {
    //     type:String,
    // },
    firstName: {
        type:String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
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

module.exports = Users = mongoose.model('users', UsersSchema, "users");
