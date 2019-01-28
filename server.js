// var express = require("express");
// var bodyParser = require("body-parser");
// var session = require("express-session");
// var passport = require("./config/passport");

// var app = express();

// var PORT = process.env.PORT || 8080;

// var db = require("./models");

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use(express.static("public"));

// app.use(passport.initialize());
// app.use(passport.session());

// // Set Handlebars.
// const exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");


// // require("./routes/html-routes.js")(app);
// require("./routes/task-api-routes.js")(app);
// require("./routes/user-api-routes.js")(app);



// db.sequelize.sync({ force: true }).then(function() {
//   app.listen(PORT, function() {
//     console.log("App listening on PORT " + PORT);
//   });
// });


// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
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

