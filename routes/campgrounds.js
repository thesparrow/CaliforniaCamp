/**
*   Routing for all of our campgrounds
*     Including: get, post  
*
**/

var express     = require("express"),
    router      = express.Router(),
    sanitize    = require("express-sanitizer"),
    Campground  = require("../models/campground"),
    middleware  = require("../middleware");

// Get all our campgrounds 
router.get("/", function(req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds: allCampgrounds });
       }
    });
});

// NEW - Create a new campground 
router.post("/", middleware.isLoggedIn, function(req, res) {
    //get data from form, add to campgrounds array
    //redirect back to campgrounds 
    var name = req.body["name"];
    var price = req.body["price"];
    var image = req.body["image"];
    var desc = req.body.description;
    
    
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    
    var campground = {name:name, price: price, image:image, description: desc, createdBy: author};
    
    //insert campround to the db 
    Campground.create(campground, function(err, newlyCreated) {
        if(err){
            console.log(err);
        }else {
            console.log(newlyCreated);
            res.redirect("campgrounds");        
        }
    }); 
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new.ejs");
});

// SHOW - Shows more info about a campground 
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT - route to edit campground 
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            req.flash("error", "Campground was not found.");
            res.redirect("campgrounds")
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});    
        }
    }); 
});

//UDATE - route to update 
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground, 
    function(err, updatedBlog){
        if(err){
            console.log(err);
        } else { 
            res.redirect("/campgrounds/" + req.params.id);
        }
    }); 
}); 

//DELETE - remove campground from the database 
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err, campground){
       if(err){
            console.log(err);
            res.redirect("/campgrounds");
       }
        else 
            res.redirect("/campgrounds");
   }); 
});

module.exports = router; 