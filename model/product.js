const {
    Mongoose
} = require("mongoose")

const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    Name: String,
    Id: String,
    Prize: Number,
    Img: String,
    Type: String
})

module.exports = mongoose.model("category", categorySchema)