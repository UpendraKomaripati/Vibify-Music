const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected successfully")

    }
    catch (error) {
        console.log("Something error in database", error)

    }
}
module.exports = { connectDB }
