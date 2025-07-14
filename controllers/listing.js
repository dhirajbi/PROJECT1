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
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
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
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_250");
    res.render("listings/edit", { listing ,originalImageUrl});
};

//update route
module.exports.Update = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
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