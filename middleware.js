const Listing = require("./models/listing");
const Review = require("./models/reviews.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.orignalUrl;
        req.flash("error", "you must be login in to  create listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "you are the not owner of this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


module.exports.validateListing = (req, res, next) => {
    let{error} = listingSchema.validate(req.body);
    
    if(error) {
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError (404, errMsg);
    }else{
           next();
    }
 
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg); // Use 400 for validation errors
    }

    next();
};


module.exports.isReviewAuthor = async (req, res, next) => {
    let  { id,reviewId } = req.params;
    let review  = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currUser._id)) {
        req.flash("error", "you are the not owner of this Review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};