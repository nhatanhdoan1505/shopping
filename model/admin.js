const {
    Mongoose
} = require("mongoose")

const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    Name: String,
    Password: String
})

module.exports = mongoose.model("admin", adminSchema)