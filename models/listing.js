const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");


const listingSchema = new Schema({
    title: {
        type: String,
        required:true,
    },
    description: String,
    image: {
        type:String,
        set: (v) =>v === "https://media.istockphoto.com/id/1550071750/photo/green-tea-tree-leaves-camellia-sinensis-in-organic-farm-sunlight-fresh-young-tender-bud.jpg?s=612x612&w=0&k=20&c=RC_xD5DY5qPH_hpqeOY1g1pM6bJgGJSssWYjVIvvoLw=" ? "default link" : v,
    },
    price:Number,
    location:String,
    country:String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        },
});

listingSchema.post("findOneAndDelete",async(listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("listing",listingSchema);
module.exports = Listing;
