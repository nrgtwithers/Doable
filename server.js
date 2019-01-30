// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport");

var db = require("./models")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up the Express app to handle body parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sets up the Express app to handle passport initializing
app.use(passport.initialize());
app.use(passport.session());

// Static directory
app.use(express.static("public"));

// Sets up Handlebars
// =============================================================
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes
// =============================================================
require("./routes/task-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);

// Starting our Express app
// =============================================================
db.sequelize.sync().then(function(){
    app.listen(PORT, function() {
        console.log("http://localhost:" + PORT);
      });
});

