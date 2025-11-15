const express=require("express")
const router=express.Router();
const isAuth=require("../Middlewares/isAuth.js")
const {registerUser,loginUser,myProfile,LogoutUser}=require("../Controllers/userControllers")


/////////////// Routes////////////////////
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/me",isAuth,myProfile)
router.get("/logout",isAuth,LogoutUser)
router.get("/register",isAuth,LogoutUser)


module.exports = router
