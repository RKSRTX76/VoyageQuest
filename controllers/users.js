const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");


module.exports.renderSignUpForm=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({username,email});
        const registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
        // Auto login for registred user
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to VoyageQuest");
            res.redirect("/listings");
        });
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};


module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};


module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to VoyageQuest");
    // Note   passport clear session that's why we use locals
    // res.redirect(req.session.redirectUrl);
    let redirectUrl=res.locals.redirectUrl || "/listings" ;
    res.redirect(redirectUrl);
    
};

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Logout successfully!");
        res.redirect("/listings");
    });
};

module.exports.displayUser = (req, res) => {
    res.render("users/user.ejs", { user: req.user });
};
