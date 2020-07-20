const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://doannhatanh:dhoPQ3lemwLNCtvG@cluster0-g513c.mongodb.net/GreenGarden?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("Mongodb connected error : " + err)
    } else {
        console.log("Mongodb connected sucessfully")
    }
})