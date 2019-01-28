var db = require("../models");

module.exports = function(app) {

  //wrapper function to check the property of existing objects (for testing purposes)
  function hasProp (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  //renders the landing page
  app.get('/', (req, res) => {
    if (hasProp(req, 'user')) {
      var hbsObj = {
          username: req.user.username
      }
  }
  res.render("index",hbsObj)
  });
  
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
    db.User.create({ // instead of db.user it should be db.(new table for sign up/log in)
      email: req.body.email,
      password: req.body.password
    }).then(function() {
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
      res.redirect('/')
    });
  });

};
