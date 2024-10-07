const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://swarupmahata321:dNNCEq8XyWC25qgU@cluster0.laikv.mongodb.net/blogs?retryWrites=true&w=majority"
// const MONGO_URI = "mongodb+srv://swarupmahata321:dNNCEq8XyWC25qgU@cluster0.laikv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// for connect with DB
const connectDb = async () => {
    const connection = await mongoose.connect(MONGO_URI);
    if (connection) console.log("Database is connected successfully");
    else console.log("Database is not connected");
}

module.exports = { connectDb }