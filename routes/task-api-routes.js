var db = require("../models");


module.exports = function (app) {


  // find tasks by location
  app.post("/api/tasks/location", function (req, res) {
    console.log(req.body)
    db.Task.findAll({
      where: {
        location: req.body.location,
        vacant: true
      }
    }).then(function (tasks) {
      res.json(tasks)
    })
  });


  // find tasks by title
  app.post("/api/tasks/search", function (req, res) {
    db.Task.findAll({
        where: {
          title: req.body.title
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
        done: false,
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
  app.put("/api/tasks/complete", function (req, res) {
    db.Task.update(
      req.body, {
        where: {
          id: req.body.id
        }
      }).then(function (dbTask) {
        res.json(dbTask);
      })
  })

  //request task 
  app.put("/api/tasks/request", function (req, res) {
    db.Task.update(
      req.body, {
        where: {
          id: req.body.id
        }
      }).then(function (dbTask) {
        res.json(dbTask);
      })
  })

  //accept doer
  app.put("/api/tasks/accept", function (req, res) {
    db.Task.update(
      req.body, {
        where: {
          id: req.body.id
        }
      }).then(function (dbTask) {
        res.json(dbTask);
      })
  })

  //drop task 
  app.put("/api/task/drop", function (req, res) {
    db.Task.update(
      req.body, {
        where: {
          id: req.body.id
        }
      }).then(function (dbTask) {
        res.json(dbTask);
      })
  })

  //view jobs user has requested
  app.post("/api/user/request", function (req, res) {
    db.Task.findAll({
      where: {
        doer: req.body.id,
        done: false
      }
    }).then(function (dbTask) {
      res.json(dbTask);
    });
  });

  //decline task doer 
  app.put("/api/task/decline",function(req,res){
    db.Task.update(req.body, {
      where : {
        id: req.body.id
      }
    }).then(function(task){
      res.json(task)
    })
  })
};



