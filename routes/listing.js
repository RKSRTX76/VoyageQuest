const express=require("express");
const { model } = require("mongoose");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");

//import module
const Listing=require("../models/listing.js");
const {isLoggedin,isOwner,validateListing}=require("../middleware.js");

const listingController=require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });




router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedin,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing));





//New route
router.get("/new",isLoggedin,listingController.renderNewForm);


router
.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedin,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedin,isOwner,wrapAsync(listingController.destroyListing))


//index route
// router.get("/",wrapAsync(listingController.index));



//show route
// router.get("/:id",wrapAsync(listingController.showListing));



//create route
// router.post("/",isLoggedin,validateListing,wrapAsync(listingController.createListing));

//Edit route
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingController.renderEditForm));

//update route
// router.put("/:id",isLoggedin,isOwner,validateListing,wrapAsync(listingController.updateListing));

//delete route
// router.delete("/:id",isLoggedin,isOwner,wrapAsync(listingController.destroyListing));

module.exports=router;