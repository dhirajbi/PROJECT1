const express = require ("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const { validateReview, isOwner, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//Review route- add review
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.addReview));


//Delete Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);



module.exports = router;