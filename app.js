/*Using RESTful get/post requests*/

var express         = require("express"),
    sanitize        = require("express-sanitizer"),
    bodyParser      = require("body-parser"),
    app             = express(),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    
    var commentRoutes       = require("./routes/comments"),
        campgroundRoutes    = require("./routes/campgrounds"),
        authRoutes          = require("./routes/auth");

//seedDB();    
// local connection 
//mongoose.connect("mongodb://localhost/california_camps");
// production connection 
mongoose.connect("mongodb://admin:password@ds161048.mlab.com:61048/californiacamp");

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));
//the directory of the where script ran 
app.use(express.static(__dirname + "/public"));
app.use(sanitize());
app.use(flash()); 

// =======================================
//      PASSPORT CONFIGURATION 
//
// =======================================

app.use(require("express-session")({
   secret: "Never give up!",
   resave: false, 
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware: run for every single route 
app.use(function(req, res, next) {
   //pass request.user to every template
   //the current user will always be available 
    res.locals.currentUser = req.user;
   //add the message for the next request 
    res.locals.error = req.flash("error"); 
    res.locals.success = req.flash("success");
   next();
});

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

///////////////////////////////
//          ROUTES
//  
///////////////////////////////
app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

    
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp has started!");
});