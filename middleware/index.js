// Middleware to run all the methods throuh this 
//  create middleWare objects, give the object methods 
// Export the object and its content 

var middlewareObj = {};

var Campground = require("../models/campground");
var Comment = require("../models/comment");

// Check if the campground belongs to the user that is actively logged in  
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log(err);
                res.redirect("back")
            } else {
                //does user own campground? 
                if(foundCampground.createdBy.id.equals(req.user._id) ){
                    next(); //move on to the next step   
                } else {
                    res.redirect("back");
                }
            }
        }); 
    } else {
        console.log("Not Authorized to do this.")
        res.redirect("back");
    }
};

// Check if the comment belongs to the user that is actively logged in
middlewareObj.checkCommentOwnership = function(req, res, next){
    if (req.isAuthenticated() ){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("Campground not found.");
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id) ){
                    next(); //carry one 
                } else {
                    req.flash("You don't have permission to do that.");
                    res.redirect("back");
                }
            }
        }); 
    } else {
        req.flash("error", "You need to be logged in to do that.")
        res.redirect("back"); 
    }
};

// check to see if the user is logged in
middlewareObj.isLoggedIn = function (req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    req.flash("error", "You need to be logged in to do that."); 
    res.redirect("/login");
}

module.exports = middlewareObj; 