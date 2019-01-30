
    $("#sign-out").on("click",function(){
      localStorage.setItem("email", "signed out")
     location.href= '/';
    })

    $("#jobs-by-area").on("click",function(){
      var location = localStorage.getItem('location')
      $.ajax("/api/tasks/location", {
        type: "POST",
        data: {location: location}
    }).then(function (data) {
        console.log(data)
    })
    })

  
      $("#post-job").on("click",function(event){
        console.log("clicked")
        event.preventDefault();
        var newTask = {
          title: $("#task-title").val().trim(),
          description: $("#task-des").val().trim(),
          rateOfPay: $("#task-rop").val().trim(),
          location: $("#task-location").val().trim(),
          time: $("#task-time").val().trim(),
          status: $("#task-status").val().trim(),
          category: $("#task-ctg").val().trim(),
          UserId: localStorage.getItem("id")
        }
  
        $.ajax("/api/tasks", {
          type: "POST",
          data: newTask
      }).then(function () {
          console.log("looking for task")
      })
      })

    

    //Collapsible
$(document).ready(function(){
  $('.collapsible').collapsible();
});


  