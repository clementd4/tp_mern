const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type:String,
    },
    description: {
        type: String,
    },
    prix: {
        type: Number,
    },
    quantity: {
        type: Number,
    }
})

module.exports = mongoose.model('product', ProductSchema, "product");



