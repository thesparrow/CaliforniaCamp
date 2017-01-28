/**
*   Routing for all of our comments 
*     Including: get, post  
*
**/

var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware");


//new comments should only be visible for authenticated users 
router.get("/new", middleware.isLoggedIn, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log(err);
            }else {
                res.render("comments/new", {campground: foundCampground});
            }
        });    
}); 

//post is only done by user who are logged in 
router.post("/", middleware.isLoggedIn, function(req, res) {
  //lookup campground with ID 
  //create a new comment 
  //connect comment to campgrounds
  //redirect campground show page
  Campground.findById(req.params.id, function(err, foundCampground) {
     if(err){
         console.log(err);
         res.redirect("/campgrounds");
     } else {
         Comment.create(req.body.comment, function(err, comment){
             if(err){
                 req.flash("error", "Something went wrong."); 
                 console.log(err);
             }else {
                 //associate the comment created to current user 
                 comment.author.id = req.user._id;
                 comment.author.username = req.user.username;
                 //save comment
                 comment.save();
                 foundCampground.comments.push(comment);
                 foundCampground.save();
                 req.flash("success", "Successfully created comment.");
                 res.redirect("/campgrounds/" + foundCampground._id);
             }
         });
     }
  });
});

//EDIT - a comment made by a user 
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, 
     function(err, foundComment) {
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.render("comments/edit", 
                    {campground_id : req.params.id, comment : foundComment}); 
        }
    })
});

//UPDATE - route to post updated comment 
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,  
        function(err, comment){
            if(err){
                console.log(err);
                res.redirect("back");
            } else {
                req.flash("success", "Comment has been updated.");
                res.redirect("/campgrounds/" + req.params.id);
        }
    }) 
});

//DESTROY - route to remove comment made by user 
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, 
        function(err, comment) {
            if(err) {
                console.log(err)
                res.redirect("back");
            } else {
                res.redirect("/campgrounds/" + req.params.id);
            }
    });
}); 


module.exports = router;