var db = require("../models");


module.exports = function (app) {


  // find tasks by location
  app.post("/api/tasks/location", function (req, res) {
    console.log(req.body)
    db.Task.findAll({
      where: {
        location: req.body.location
      }
    }).then(function (tasks) {
      res.json(tasks)
    })
  });



  // find tasks by title
  app.get("/api/tasks/:title", function (req, res) {
    db.Task.findAll({
      include: [{
        model: db.User,
      }]
    }, {
        where: {
          title: req.params.location
        }
      }).then(function (dbTask) {
        res.json(dbTask);
      });
  });


  // show my tasks status
  app.post("/api/tasks/status", function (req, res) {
    db.Task.findAll({
        where: {
          UserId: req.body.id,
          status: (!'Complete')
        }
      }).then(function (dbTask) {
        res.json(dbTask);
      });
  });

  //create a new task 
  app.post("/api/tasks", function (req, res) {
    db.Task.create(req.body).then(function (dbTask) {
      res.json(dbTask);
    })
  });


  //delete a task
  app.delete("/api/tasks/:id", function (req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  //update task
  app.put("/api/tasks", function (req, res) {
    db.Task.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbTask) {
        res.json(dbTask);
      });
  });

  //complete task 
  app.put("/api/tasks/complete", function(req,res){
    db.Task.update(
      req.body,{
        where: {
          id: req.body.id
        }
      }).then(function(dbTask){
res.json(dbTask);
      })
  })
};



