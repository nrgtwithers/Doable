var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {


  function hasProp(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  //renders the landing page
  app.get('/', (req, res) => {
    if (hasProp(req, 'user')) {
      var hbsObj = {
        username: req.user.username
      }
    }
    res.render("index", hbsObj)
  });



  app.post("/api/users", function (req, res) {
    console.log("email is " + req.body.email)
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/userinfo", function (req, res) {
    db.User.findOne({
      where: {
        id: req.body.id
      }
    }).then(function (dbUser) {
      res.json(dbUser)
    })
  })

  app.put("/api/userinfo", function (req, res) {
    db.User.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function (dbUser) {
      res.json(dbUser);
      console.log(dbUser)
    });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  //user sign up 
  app.post("/api/signup/", function (req, res) {
    db.User.create(req.body).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });

  // edit user profile 
  app.put("/api/users", function (req, res) {
    db.User.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (data) {
        res.json(data);
      });
  });

  var email;

  // User login renders user page
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    email = req.body.email;
    res.json(`/user`);
  });

  app.get(`/user`, function (req, res) {
    console.log(email)
    var userName;
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function (dbUser) {
      // console.log(dbUser.name)
      // userName = dbUser.name;
    });
    res.render('user', { name: userName, layout: 'login' });//{layout: 'login'}
  });

  // delete user 
  app.delete("/api/users/:id", function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbUser) {
      res.redirect('/')
    });
  });

  //find task owner 
  app.post("/api/user/view", function (req, res) {
    db.User.findOne({
      where: {
        id: req.body.id
      }
    }).then(function (dbUser) {
      res.json(dbUser)
    })
  });

  //find requesing doer 
app.post("/api/user/doer", function(req,res){
  db.User.findOne({
    where: {
      id: req.body.id
    }
  }).then(function(doer){
    res.json(doer)
  })
})

//find users by specialty (hirer search)
app.post("/api/user/search",function(req,res){
  db.User.findAll({
    where: {
      specialty: req.body.specialty
    }
  }).then(function(doers){
    res.json(doers)
  })
})

//update user profile photo
app.put("/api/user/imgurl", function (req, res) {
  db.User.update(
    req.body,
    {
      where: {
        id: req.body.id
      }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
});

};
