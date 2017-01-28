//Model for our comments 

var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author:  {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        username: String
    }
});

//send this out of the file 
module.exports = mongoose.model("Comment", commentSchema);