const express = require("express")
const dotenv = require("dotenv")
const { connectDB } = require("./Database.js")
const cookieParser=require("cookie-parser")
const cloudinary = require("cloudinary")
dotenv.config();


//// Clodinary keys//////////

cloudinary.v2.config({
    cloud_name:process.env.Cloud_Name,
    api_key:process.env.Cloud_Api,
    api_secret: process.env.Cloud_Secret,
})
const app = express()


// importing Routes
const userRoutes = require("./Routes/userRoutes")
const songRoutes=require("./Routes/SongRoutes")

//  USING MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// Using Routes//

app.use("/api/user", userRoutes)
app.use("/api/song",songRoutes)

const port = process.env.PORT

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is started at localhost:${port}`)
        })
    })

    .catch((err) => {
        console.log("server was not connected", err);
    })



