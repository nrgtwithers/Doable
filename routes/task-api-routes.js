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

  app.delete("/api/tasks/:id", function(req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.put("/api/tasks", function(req, res) {
    db.Task.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbTask) {
      res.json(dbTask);
    });
  });
};
