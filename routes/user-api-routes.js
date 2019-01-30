var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {


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
      // res.render('home', {layout: login});
      // res.render("user", { task: dbUser });
      res.json(dbUser);
    });
  });


  app.get('/user', function (req, res) {
    res.render('user', {layout: 'login'});
});


  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  //user sign up 
  app.post("/api/signup/", function(req, res) {
    db.User.create(req.body).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

 // edit user profile 
  app.put("/api/users", function(req, res) {
    db.User.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

 // User login renders user page
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json("/users");
  });

// delete user 
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
