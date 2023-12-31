if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}
// console.log(process.env.SECRET);

const express=require("express");
const app=express();
const port=8080;
const mongoose = require('mongoose');
const path=require("path");
//import module
const Listing=require("./models/listing.js");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");



// require routes
const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);   //boilerpalte use
app.use(express.static(path.join(__dirname,"/public")))   //static files use (Ex- style.css)


const dbUrl=process.env.ATLASDB_URL;

main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/voyagequest');

await mongoose.connect(dbUrl);


  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const store=MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24*3600,                 //pass in seconds
});

store.on("errpr",()=>{
    console.log("Error in Mongostore",err);
});
const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
                              // day  hr   min  sec  milisec
            expires: Date.now() + 7 * 24 * 60 * 60 *1000,
            maxAge: 7 * 24 * 60 * 60 *1000,
            httpOnly:true,
    }
    
}


// app.get("/",(req,res)=>{
//     res.send("Welcome to VoyageQuest Root page");
// });



// Session
app.use(session(sessionOptions));
app.use(flash());

// authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    // we can not directly access req.user in ejs so store in locals
    res.locals.currUser=req.user;
    // console.log(res.locals.success);
    next();
});

// app.get("/dummyuser",async(req,res)=>{
//     let dummyUser=new User({
//         email:"babymonster@kr.com",
//         username:"babymons7er",            // username not created in usermodel still passport will add username
//     });
//     let registeredUser=await User.register(dummyUser,"babymonster@rora");  //last one is password
//     res.send(registeredUser);
// });


//testing route
app.get("/testListing",async (req,res)=>{
    let sampleListing=new Listing({
        title:"My new Villa",
        description:"Mannat",
        price:50000,
        location:"Kerala",
        country:"India",

    });
    await sampleListing.save();
    console.log("Sample data Saved");
    res.send("Testing Successful");
});





app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);


app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found!"));
});
// Custom error handling
app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong!"}=err;
    // res.status(statusCode).send(message);
    // res.send("Something went wrong!");
    // res.render("listings/error.ejs",{message});
    res.status(statusCode).render("listings/error.ejs",{message});
});



app.listen(port,()=>{
    console.log(`Server is listening to port ${port}`);
});