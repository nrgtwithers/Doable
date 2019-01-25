var db = require("../models");


module.exports = function(app) {

  app.get("/api/tasks", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }

    db.Task.findAll({
      include: [ db.User
      ]
  },{
      where: query
    }).then(function(dbTask) {
      res.json(dbTask);
    });
  });


  app.get("/api/tasks/:id", function(req, res) {
   
    db.Task.findOne({
      include: [{
          model: db.User,
      }]
  },{
      where: {
        id: req.params.id
      }
    }).then(function(dbTask) {
      console.log(dbtask);
      res.json(dbTask);
    });
  });

  app.post("/api/tasks", function(req, res) {
    db.Task.create(req.body).then(function(dbTask) {
      res.json(dbTask);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Posts.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Posts.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
