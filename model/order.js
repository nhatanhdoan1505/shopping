const {
    Mongoose
} = require("mongoose")

const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
    Name: String,
    Item: [{}],
    Phone: String,
    Email: String,
    Total: Number,
    Date: String
})

module.exports = mongoose.model("order", orderSchema)