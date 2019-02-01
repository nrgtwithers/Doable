
$(document).ready(function () {
  var name = localStorage.getItem("name")
  $("#user-name").append(" " + name + "!");
  $("#img-preview").attr("src",localStorage.getItem("imgurl"))
});


$("#sign-out").on("click", function () {
  localStorage.setItem("email", "signed out");
  location.href = '/';
});

$("#sign-out2").on("click", function () {
  localStorage.setItem("email", "signed out");
  location.href = '/';
});

// jobs by area for doer 
$("#jobs-by-area").on("click", function () {
  $("#pop-tasks").empty();
  var location = localStorage.getItem('location');
  $.ajax("/api/tasks/location", {
    type: "POST",
    data: { location: location }
  }).then(function (data) {
    console.log(data)
    var html = `<h4> Tasks in ${location} </h4>`
    html += `<hr>`
    for (var i = 0; i < data.length; i++) {
      html += `<p class='title'>Title:</p> <p class='info'>${data[i].title}</p>`
      html += `<p class='title'>Description:</p> <p class='info'>${data[i].description}</p>`
      html += `<p class='title'>Pay:</p> <p class='info'>$${data[i].rateOfPay}/hour</p>`
      html += `<button id="request-task" value="${data[i].id}">Take it</button>`
      html += `<hr>`
    }
    $("#pop-tasks").append(html);
  });
});

//doer reuest a task button
$("#pop-tasks").on("click", "#request-task", function () {
  var id = this.value;
  $.ajax("/api/tasks/request", {
    type: "PUT",
    data: { id: id, vacant: false, requested: true, doer: localStorage.getItem("id") }
  }).then(function (data) {
    console.log("updating task")
  })
});


//hirer current job status
$("#current-job-status").on("click", function () {
  $("#pop-current-tasks").empty();
  $("#pop-requesting-doer").empty();
  var id = localStorage.getItem('id');
  $.ajax("/api/tasks/status", {
    type: "POST",
    data: { id: id }
  }).then(function (data) {
    console.log(data)
    var html = `<h4>Jobs you posted</h4>`;
    html += `<hr>`
    for (var i = 0; i < data.length; i++) {
      html += `<p class='title'>Title:</p> <p class='info'>${data[i].title}</p>`
      if (data[i].vacant) {
        html += `<p class='title'>Status:</p> <p class='info'>Vacant</p>`
        html += `<button id ="complete-button" value="${data[i].id}">Complete</button>`
      } else if (data[i].requested) {
        html += `<p class='title'>Status:</p> <p class='info'>Requested</p>`
        html += `<p class='title'>Requesting Doer Id:</p> <p class='info'>${data[i].doer} </p>`
        html += `<button id ="accept-button" class="#FFFFFF white  waves-effect waves-light btn-small" value="${data[i].id}">Accept Request</button>`
        html += `<button id ="view-doer-button" class="#FFFFFF white  waves-effect waves-light btn-small" value="${data[i].doer}">View Doer</button>`
        html += `<button id ="decline-button" class="#FFFFFF white waves-effect waves-light btn-small" value="${data[i].id}">Decline</button>`
      } else if (data[i].inProgress) {
        html += `<p class='title'>Status:</p> <p class='info'>Requested</p>`
        html += `<p class='title'>Doer:</p> <p classs='info'>${data[i].doer}</p>`
        html += `<button id ="complete-button" class="#FFFFFF white waves-effect waves-light btn-small" value="${data[i].id}">Complete</button>`
      }
      html += `<hr>`
    }
    $("#pop-current-tasks").append(html)
  });
});

// hirer complete job button
$("#pop-current-tasks").on("click", "#complete-button", function () {
  var taskId = this.value;
  $.ajax("/api/tasks/complete", {
    type: "PUT",
    data: {
      id: taskId,
      done: true,
      requested: false,
      vacant: false,
      inProgress: false
    }
  }).then(function (data) {
    console.log("taskId " + taskId);
  })
})

// hirer accept doer to do the job button
$("#pop-current-tasks").on("click", "#accept-button", function () {
  var taskId = this.value;
  $.ajax("/api/tasks/accept", {
    type: "PUT",
    data: {
      id: taskId,
      done: false,
      requested: false,
      vacant: false,
      inProgress: true
    }
  }).then(function (data) {
    console.log("taskId " + taskId);
  })
})

//hirer view doer that requested the job
$("#pop-current-tasks").on("click", "#view-doer-button", function(){
  var doerId = this.value;
  $.ajax("/api/user/doer",{
    type: "POST",
    data: {
      id: doerId
    }
  }).then(function(doer){
  $("#pop-requesting-doer").empty();
  $("#pop-requesting-doer").append("<h4>Pending Doer</h4>");
  $("#pop-requesting-doer").append(`<p class="title">Name:</p> <p class="info">${doer.name}</p>`);
  $("#pop-requesting-doer").append(`<p class="title">Location:</p> <p class="info">${doer.location}</p>`);
  $("#pop-requesting-doer").append(`<p class="title">Contact:</p> <p class="info">${doer.contact}</p>`);
console.log(doer)

  })
})

//hirer decline doer 
$("#pop-current-tasks").on("click", "#decline-button", function(){
  var taskId = this.value;
  $.ajax("/api/task/decline",{
    type: "PUT",
    data: {
      id: taskId,
      doer: 0,
      requested: false,
      vacant: true
    }
  }).then(function(task){
    console.log(task)
  })
})

$("#jobs-requested").on("click", function () {
  $("#pop-jobs-requested").empty();
  var id = localStorage.getItem('id');
  $.ajax("/api/user/request", {
    type: "POST",
    data: { id: id }
  }).then(function (data) {
    console.log(data)
    var html = `<h4>Jobs you Requested</h4>`;
    html += `<hr>`
    for (var i = 0; i < data.length; i++) {
      html += `<p class="title">Title:</p> <p class="info">${data[i].title}</p>`
      if (data[i].requested){
        html += `<p class="title">Status:</p> <p class="info">Request is pending </p>`
      };
      if (data[i].inProgress){
        html += `<p class="title">Status:</p> <p class="info">Job in progress</p>`
      }
      html += `<button id ="drop-button" class="#FFFFFF white waves-effect waves-light btn-small" value="${data[i].id}">Drop Job</button>`
      html += `<button id ="view-owner-button" class="#FFFFFF white waves-effect waves-light btn-small" value="${data[i].UserId}">View Hirer</button>`
      html += `<hr>`
    }
    $("#pop-jobs-requested").append(html)
  });
});

//doer, view job hirer
$("#pop-jobs-requested").on("click", "#view-owner-button", function () {
  var id = this.value
  $.ajax("/api/user/view", {
    type: "POST",
    data: { id: id }
  }).then(function (hirer) {
    console.log(hirer)
    $("#pop-hirer").empty()
    $("#pop-hirer").append("<h4>Task Hirer</h4>")
    $("#pop-hirer").append(`<p class="title">Name:</p> <p class="info">${hirer.name}</p>`)
    $("#pop-hirer").append(`<p class="title">Location:</p> <p class="info">${hirer.location}</p>`)
    $("#pop-hirer").append(`<p class="title">Contact:</p> <p class="info">${hirer.contact}</p>`)
  })
});

//doer, drop job button
$("#pop-jobs-requested").on("click", "#drop-button", function () {
  var id = this.value;
  $.ajax("/api/task/drop", {
    type: "PUT",
    data: { id: id, requested: false ,vacant: true , doer: 0 }
  }).then(function (data) {
    console.log("updated");
  });
});

$("#edit-profile").on("click", function () {
  console.log("clicked")
  var id = localStorage.getItem("id");
  $.ajax("/api/userinfo", {
    type: "POST",
    data: {
      id: id
    }
  }).then(function (data) {
    console.log(data)
    $("#edit-name").text(data.name);
    $("#edit-location").text(data.location);
    $("#edit-contact").text(data.contact);
    $("#edit-specialty").text(data.specialty);
  })
})

$("#update-info").on("click", function () {

  var infoUpdate = {
    name: $("#edit-name").val().trim(),
    location: $("#edit-location").val().trim(),
    contact: $("#edit-contact").val().trim(),
    specialty: $("#edit-specialty").val().trim(),
    id: localStorage.getItem("id")
  }
  $.ajax("api/userinfo", {
    type: "PUT",
    data: infoUpdate
  }).then(function (data) {
    console.log(data);
  });
});


$("#edit-profile2").on("click", function () {
  console.log("clicked")
  var id = localStorage.getItem("id");
  $.ajax("/api/userinfo", {
    type: "POST",
    data: {
      id: id
    }
  }).then(function (data) {
    console.log(data)
    $("#edit-name2").text(data.name);
    $("#edit-location2").text(data.location);
    $("#edit-contact2").text(data.contact);
    $("#edit-specialty2").text(data.specialty);
  })
})

$("#update-info2").on("click", function () {

  var infoUpdate = {
    name: $("#edit-name2").val().trim(),
    location: $("#edit-location2").val().trim(),
    contact: $("#edit-contact2").val().trim(),
    specialty: $("#edit-specialty2").val().trim(),
    id: localStorage.getItem("id")
  }
  $.ajax("api/userinfo", {
    type: "PUT",
    data: infoUpdate
  }).then(function (data) {
    console.log(data);
  });
});


$("#post-job").on("click", function (event) {
  console.log("clicked")
  event.preventDefault();
  var newTask = {
    title: $("#task-title").val().trim(),
    description: $("#task-des").val().trim(),
    rateOfPay: $("#task-rop").val().trim(),
    location: $("#task-location").val().trim(),
    time: $("#task-time").val().trim(),
    category: $("#task-ctg").val().trim(),
    UserId: localStorage.getItem("id")
  }

  $.ajax("/api/tasks", {
    type: "POST",
    data: newTask
  }).then(function () {
    console.log("looking for task")
  })
});


//doer, find a job search
$("#find-a-job").on("click", function (event) {
  var word = $("#find-a-job-input").val().trim();
  $.ajax("/api/tasks/search", {
    type: "POST",
    data: {
      title: word
    }
  }).then(function (data) {
    $("#jobs-results").empty();
    $("#jobs-results").append(`<h4>Possible Jobs for you!</h4>`);
    $("#jobs-results").append(`<hr>`)
    for(var i=0; i<data.length; i++){
      $("#jobs-results").append(`<p>Title: ${data[i].title}</p>`);
      $("#jobs-results").append(`<p>Description: ${data[i].description}</p>`);
      $("#jobs-results").append(`<p>Pay: $${data[i].rateOfPay}/Hour</p>`);
      $("#jobs-results").append(`<p>Location: ${data[i].location}</p>`);
      $("#jobs-results").append(`<button class="#33691e light-green darken-4 waves-effect waves-light btn-small" >Take it</button>`);
      $("#jobs-results").append(`<hr>`);
    }
    console.log(data)
  })
})


//hirer, find a doer search 
$("#find-doer-button").on("click",function(event){
  event.preventDefault();
var specialty = $("#find-doer-input").val().trim();
$.ajax("/api/user/search",{
  type: "POST",
  data: {
    specialty: specialty
  }
}).then(function(doers){
  console.log(doers)
  html = `<h5> Doers </h5>`
  html += `<hr>`
  for(var i=0; i< doers.length; i++){
html+= `<p>Name: ${doers[i].name} </p>`
html += `<p>Location: ${doers[i].location}</p>`
html+= `<p>Contact: ${doers[i].contact}</p>`
html+=`<hr>`
  }
  $("#search-results").append(html)
})
})

//Collapsible
$(document).ready(function () {
  $('.collapsible').collapsible();
});


