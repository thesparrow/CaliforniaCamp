/**
*   Routing for all of our index and authentication 
*
**/

var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

//create the landing page
router.get("/", function(req, res) {
    res.render("landing");
});


//show register form 
router.get("/register", function(req, res) {
   res.render("register"); 
});

//post register form 
router.post("/register", function(req, res) {
    //create a new user
    var newUser = new User({username:req.body.username});
    
    //use passport to register the user 
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err.message);
            req.flash("error", err.message);
            return res.render("register");
        }
        ///redirect the user to campgrounds
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome " + user.username);
            res.redirect("/campgrounds"); 
        });
    }); 
}); 

//show login form 
router.get("/login", function(req, res) {
   res.render("login", {message: "Error login did not happen." });
});

//handle login logic, passport.authenticate is middleware 
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
        
});

//log out 
router.get("/logout", function(req, res) {
   req.logout(); 
   req.flash("success", "Logged out.");
   res.redirect("/campgrounds");
});

module.exports = router; 
    