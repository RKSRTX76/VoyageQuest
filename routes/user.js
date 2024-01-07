const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");
const {isLoggedin}=require("../middleware.js");

const userController=require("../controllers/users.js");

// Signup
router
.route("/signup")
.get(userController.renderSignUpForm)
.post(wrapAsync(userController.signUp))




// Login
router
.route("/login")
.get(userController.renderLoginForm)
.post(savedRedirectUrl,
passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true}),
    userController.login)

router.get("/logout",userController.logout);

router.get("/user", isLoggedin, userController.displayUser);


module.exports=router;


