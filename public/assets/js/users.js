
    $("#sign-out").on("click",function(){
      localStorage.setItem("email", "signed out");
     location.href= '/';
    });

    $("#jobs-by-area").on("click",function(){
      var location = localStorage.getItem('location');
      $.ajax("/api/tasks/location", {
        type: "POST",
        data: {location: location}
    }).then(function (data) {
        console.log(data)
        var html = `<p> Tasks in ${location} </p>`
        html+=`<hr>`
        for (var i=0; i<data.length; i++){
          html += `<p>Title: ${data[i].title}</p>`
          html += `<p>Description: ${data[i].description}</p>`
          html += `<p>Pay: $${data[i].rateOfPay}/hour</p>`
          html += `<p>Status: ${data[i].status}</p>`
          html += `<button id="request-task">Take it</button>`
          html += `<hr>`
        }
        $("#pop-tasks").append(html);
    });
    });

    $("#current-job-status").on("click",function(){
      var id = localStorage.getItem('id');
      $.ajax("/api/tasks/status",{
        type: "POST",
        data: {id: id}
      }).then(function(data){
        console.log(data)
        var html = `<p>Jobs you posted</p>`;
        html+=`<hr>`
        for(var i=0; i<data.length; i++){
          html += `<p>Title: ${data[i].title}</p>`
          html += `<p>Status: ${data[i].status}</p>`
          html+= `<button id ="complete-job attr = "${i}">Complete</button>`
          html += `<hr>`
        }
        $("#pop-current-tasks").append(html)
      });
    });


    $("#edit-profile").on("click", function(){
      var id = localStorage.getItem("id");
      $.ajax("/api/userinfo",{
        type:"POST",
        data: {
          id: id
        }
      }).then(function(data){
        console.log(data)
        $("#edit-name").text(data.name);
        $("#edit-location").text(data.location);
        $("#edit-contact").text(data.contact);
        $("#edit-specialty").text(data.specialty);
      })
    })

    $("#update-info").on("click",function(){

      var infoUpdate = {
        name: $("#edit-name").val().trim(),
        location: $("#edit-location").val().trim(),
        contact: $("#edit-contact").val().trim(),
        specialty: $("#edit-specialty").val().trim(),
        id: localStorage.getItem("id")
      }
      $.ajax("api/userinfo",{
        type: "PUT",
        data: infoUpdate
      }).then(function(data){
        console.log(data);
      });
    });
  
      $("#post-job").on("click",function(event){
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

    

    //Collapsible
$(document).ready(function(){
  $('.collapsible').collapsible();
});


  