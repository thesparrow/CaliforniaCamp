//Seed file to create campgrounds for our database
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

//separate the data layer 

var users = [{
        username: "anna",
        password: "anna"
    }, 
    {
        username: "Dav",
        password: "dav"
    }]; 
var data = [{
    name: "Big Sur",
    image: "https://farm9.staticflickr.com/8536/28665253540_b7f64a5837.jpg",
    description: "Big Sur offers some if the most spectacular hiking anywhere. Three amazing state parks are all within a short drive along Highway One, and together boast miles of hiking trails with gorgeous views of the coast, the mountains and the Big Sur valley.",
    createdBy: { 
        username: "anna"} 
    
}, {
    name: "Anza-Borrego Desert",
    image: "https://farm8.staticflickr.com/7423/10005265405_1a4ea5d7c0.jpg",
    description: "Anza-Borrego Desert State Park is tucked into the southeastern corner of California. Running about 25 miles east to west and 50 miles north to south, it is California's largest state park encompassing more than 600,000 acres. The park is framed by, and includes many rugged mountain ranges: the Bucksnorts and the Santa Rosas on the north, the Jacumba Mountains on the south and the Vallecito and Pinyon Mountains on the west. To the east, the Borrego Mountains taper into the Carrizo Badlands before falling away into the Salton Trough."
}, {
    name: "Tuolumne Meadows Campground",
    image: "https://farm9.staticflickr.com/8580/15165636023_e5bd9ce611.jpg",
    description: "Tuolumne Meadows Campground is located in breathtaking Yosemite National Park in Central California's rugged Sierra Nevada Mountain Range at an elevation of 8,600 feet. The site is situated along the scenic Tioga Road just five miles from the Tioga Pass Entrance Station. Within Yosemite, visitors can gaze upon waterfalls, sheer granite cliffs, deep valleys, grand meadows, ancient giant sequoias, vast wilderness areas, and so much more."
}, {
    name: "Kirk Creek Campground",
    image: "https://farm5.staticflickr.com/4109/5609622712_99fdf9a816.jpg",
    description: "Kirk Creek Campground is an oceanside paradise, with each site overlooking the Pacific Ocean. It offers a variety of opportunities for relaxation and recreation. The campground is within walking distance of the area's largest sandy beach and is close to a variety of scenic trails that lead visitors into the Los Padres National Forest.The campground is located on a bluff overlooking the Pacific Ocean, at an elevation of about 100 feet. It offers fantastic views of the Big Sur coastline. Campsites are spacious, open and grassy. Each site has a view of the ocean, where sunrises and sunsets are outstanding. Wildlife in the area includes fox, bobcat, deer and raccoon. Mountain lions and bears are occasionally seen, although they have never entered the campground. From November to February each year, whales migrate along the coast and can frequently be viewed from the campground."
}, {
    name: "Furnace Creek",
    image: "https://farm2.staticflickr.com/1525/26567031245_791e4b99f1.jpg",
    description: "Joshua Tree National Park, east of Palm Springs, is know for the spiky, twisted yucca tree that gave the park its name, and for some excellent rock climbing and bouldering. The park's elevation ranges from 900 feet to nearly 5,000 feet, resulting in a wide variety of plant and animal life. There are nine campgrounds in the park, several of which are first-come, first-served."
}]; 




function seedDB() {

    //Remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }else {
            console.log("Removing all campgrounds");
        }
        //add a few campgrounds
        data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Added a campground " + campground.name);
                      // add a user 
                    //   Comment.create(users, function(err, user) {
                    //      if(err){
                    //          console.log(err);
                    //      } else {
                    //          console.log("Added a user " + user.username);
                    //      }
                    //   });
                    
                      //add a few comments 
                    // Comment.create(
                    //     {
                    //         text: "This place is great!",
                    //         author: "GregariousGary"
                    //     }, function(err,comment){
                            
                    //         if(err){ 
                    //             console.log(err);
                    //         }else {
                    //             campground.comments.push(comment);
                    //             campground.save();
                    //             console.log("Comment created!");
                    //         }
                    // });
                }
            });
        });
    });


//seed the users 

//link the user 
  

}

//send the function out
module.exports = seedDB;
