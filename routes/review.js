const express=require("express");
const { model } = require("mongoose");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
//import module
const Listing=require("../models/listing.js");
const { isLoggedin, isOwner, isreviewAuthor } = require("../middleware.js");
const {validateReview}=require("../middleware.js");

const reviewController=require("../controllers/reviews.js");

// Post Reviews
router.post("/",isLoggedin,validateReview,wrapAsync(reviewController.createReview));

// Delete review
 router.delete("/:reviewId",isLoggedin,isreviewAuthor,wrapAsync(reviewController.destroyReview));



 module.exports=router;