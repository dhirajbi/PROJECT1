const Listing = require("../models/listing");



//index route
module.exports.index = async (req, res) => {
    const allistings = await Listing.find({});
    res.render("listings/index", { allistings });
};

//new route 
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

//handle submit
module.exports.submit = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

//show single listing 
module.exports.singleListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested is does not exist !");
    }
    console.log(listing);
    res.render("listings/show", { listing });
};

//edit route
module.exports.Edit = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested is does not exist !");
    }
    res.render("listings/edit", { listing });
};

//update route
module.exports.Update = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", " Listing Updated!");
    res.redirect(`/listings/${id}`);
};

//Delete route
module.exports.Distroy = async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", " Listing is Deleted!");
    res.redirect("/listings");
};