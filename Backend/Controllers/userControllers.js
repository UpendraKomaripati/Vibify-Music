const { User } = require("../Models/user.js")
const bcrypt = require("bcrypt")
const generateToken = require("../Utils/generateToken.js")
const TryCatch = require("../Utils/TryCatch.js");


////////// user Regissteer Code //////////

const registerUser = TryCatch(async (req, res) => {
    const { name, email, password } = req.body

    let user = await User.findOne({ email })

    if (user)
        return res.status(400).json({
            message: "User Already Exist"
        });

    const hashPassword = await bcrypt.hash(password, 10)

    user = await User.create({
        name,
        email,
        password: hashPassword
    })


    generateToken(user._id, res);
    res.status(201).json({
        user,
        message: "User Registred"
    })
});

///////////////Login Code///////////////

const loginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user)
        return res.status(400).json({
            message: "No user Exist"
        });

    const comparePassword = await bcrypt.compare(password, user.password)


    if (!comparePassword)
        return res.status(400).json({
            message: "Wrong Password"
        });

    generateToken(user._id, res);
    res.status(201).json({
        user,
        message: "User LoggedIN"
    })
});

/////////////// Profile Code //////////////////////
const myProfile = TryCatch(async (req, res) => {
    const user = await User.findById(req.user._id);

    res.json(user);
});
//////////////////Log Out Code //////////////////////

const LogoutUser = TryCatch(async (req, res) => {
    res.cookie("token", "", { maxAge: 0 });

    res.json({
        message: "Logged Out Successfully",
    });
});


module.exports = { registerUser, loginUser, myProfile,LogoutUser }
