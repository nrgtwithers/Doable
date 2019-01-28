var db = require("../models");
var passport = require("passport");

module.exports = function(app) {

  app.get('/', function (req, res) {
    db.User.findAll({}).then(function (data) {
      console.log(data);
        res.render("index", { task: data });
      })
    })

  app.get("/api/users", function(req, res) {
    db.User.findAll({ include: [ db.Task ] }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({ include: [ db.Task ] },{
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.Signin.create( // instead of db.user it should be db.(new table for sign up/log in)
     req.body
    ).then(function() {
      // res.json({hi: `hello`})
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/users");
  });

  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};
