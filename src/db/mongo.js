import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(console.log("Connection established!"))
    .catch(error => console.log(error.message));
