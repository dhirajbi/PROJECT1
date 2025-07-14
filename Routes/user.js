const express = require ("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const e = require("connect-flash");
const  passport  = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router.
    route("/signup")
    .get( userController.renderSignUpForm)
    .post(userController.Signup);


router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.login
);



router.get("/logout",userController.Logout);

module.exports = router;