const express = require ("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const { required } = require("joi");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const{storage} = require("../cloudConfig.js")
const upload = multer({ storage })

// New route - Form for creating listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Edit route - Show edit form
router.get( "/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.Edit));

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.submit)
    );


router
    .route("/:id")
    .get(wrapAsync(listingController.singleListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.Update))
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.Distroy));
    






module.exports = router;