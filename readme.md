#Yelp Camp

* Add landing Page 
* Add Campground Page that lists all campgrounds 

Each campground has:
* Name 
* Image
* 
Design of campground object
[
    {
        name: "",
        image:"",
        latitude: "",
        longitude: "",
        state: ""
    } 
]

#Layout and Basic Styling 
* Create our header and footer partials 
* Add in Bootstrap 

#Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser 
* Setup routes to show form 
* Add basic styled form 


#Style the campgrounds page 
* Add a better header/title
* Make campgrounds display in a grid 

#Style the Navbar and Form
* Add a navbar to all templates 
* Style the new campgrounds form

# Add Mongoose: for data persistence 
* Install and configure mongoose 
* Setup campground model 
* Use campground model inside of our routes

# Show Page 
* Review the RESTful route 
* Add description to our campground model 
* Show db.collection.drop()
* Add a show route/template 

# RESTful routes 

name    url         verb        description
=================================================================
Index   /dogs         GET        Display a list of all dogs 
New     /dogs/new     GET        Display form to make a new dog
Create  /dogs         POST       Add new dog to DB 
Show    /dogs/:id     GET        Shows info about one dog


#Refactor Mongoose Code 
* Create a models directory 
* Use module.exports
* Require everything correctly

#Add Seeds File 
* Add a seeds.js file: seed db with some data 
* Run the seeds file every time the server starts

#Add the comments model! 
* Make our errors go away! 
* Display comments on campground show page

#Comment New/Create
* Discuss nested routes 
* Add the comment new and create routes 
* Add the new comment form


Index   /campgrounds
New     /campgrounds/new
Create  /campgrounds
Show    /campgrounds/:id

New     campground/:id/comments/new    GET
Create  campgrounds/:id/comments       POST

#Add User Model
* Install all packages needed for authentication
* Define a User Model

#Authentication Part 1
* Configure Passport 
* Add register routes 
* Add register templates 


#Authentication Part 2
* Add login routes
* Add login template

#Authentication Part 3
* Add login routes
* Add login template

#Authentication Part 4 - Logout/Navbar 
* Add logout route
* Prevent user from adding a comment if not signed in 
* Add links to navbar
* Show/hide auth links correctly

#Authentication Part 5 - Show/Hide Links
* Show/hide auth links in navbar correctly

#Refactor The Routes 
* Use Express router to reorganize all routes 

#User + Comments 
* Associate users and comments
* Save author's name to a comment automatically 

# User + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# RESTful routes 
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route 

# Deleting Campgrounds
* Add Destroy Route 
* Add Delete button

#Authorization 
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons 

#Refactoring Middleware 
* Allow the middleware to be exported like a function
* Call middleware to check authentication and camp ownership

#Adding Flash: Improve User Interaction 
* Demo working version 
* Install and configure connect-flash
* Add bootstrap alerts to header 

#Deployment 
* Set up Heroku for hosting application 
* Use mLAb to host database

#Environment Variables 
* Separate production envrionment from localhost 
* Include configurations 
