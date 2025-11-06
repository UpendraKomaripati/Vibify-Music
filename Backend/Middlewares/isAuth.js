const jwt = require("jsonwebtoken");
const { User } = require("../Models/user.js")


///////////////// User Unnada ledha is Auth//////////////////
const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(400).json({
            message: "Please Login",
        });

        const decodedData = jwt.verify(token, process.env.JWT_secret)

        if (!decodedData) return res.status(403).json({
            message: "token expired"
        })

        req.user = await User.findById(decodedData.id)
        next();
    }
    catch (error) {
        res.status(500).json({
            message: "Please Login",
        });

    }

}
module.exports=isAuth;
