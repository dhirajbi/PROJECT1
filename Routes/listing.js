const express = require ("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const { required } = require("joi");
const listingController = require("../controllers/listing.js");

// Index route - Show all listings
router.get("/", wrapAsync(listingController.index));

// New route - Form for creating listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Create route - Handle form submission
router.post("/",isLoggedIn,validateListing, wrapAsync(listingController.submit));

// Show route - View a single listing
router.get("/:id", wrapAsync(listingController.singleListing));

// Edit route - Show edit form
router.get( "/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.Edit));

// Update route - Handle update form
router.put( "/:id",isLoggedIn, isOwner, validateListing, wrapAsync(listingController.Update));

// Delete route - Remove listing
router.delete( "/:id",isLoggedIn, isOwner, wrapAsync(listingController.Distroy));


module.exports = router;