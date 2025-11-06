const express = require("express")
const dotenv = require("dotenv")
const userRoutes = require("./Routes/userRoutes.js")
const { connectDB } = require("./Database.js")
const cookieParser=require("cookie-parser")

dotenv.config();
const app = express()



//  USING MIDDLEWARES
app.use(express.json());
app.use(cookieParser());


const port = process.env.PORT

app.use("/api/user", userRoutes)
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is started at localhost:${port}`)
        })
    })

    .catch((err) => {
        console.log("server was not connected", err);
    })



