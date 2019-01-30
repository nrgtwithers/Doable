
    $("#sign-out").on("click",function(){
      localStorage.setItem("email", "signed out")
     location.href= '/';
    })

    $("#jobs-by-area").on("click",function(){
      var email = localStorage.getItem('email')
      $.ajax("/api/tasks", {
        type: "GET",
        data: email
    }).then(function () {
        console.log("looking for task")
    })
    })

    $(document).ready(function(){
      $("#post-job-form").on("submit",function(event){
        console.log("clicked")
        event.preventDefault();
        var email = localStorage.getItem('email');
        var newTask = {
          title: $("#task-title").val().trim(),
          description: $("#task-des").val().trim(),
          rateOfPay: $("#task-rop").val().trim(),
          location: $("#task-location").val().trim(),
          time: $("#task-time").val().trim(),
          status: $("#task-status").val().trim(),
          category: $("#task-ctg").val().trim(),
          userEmail: email,
          UserId: 0
        }
  
        $.ajax("/api/tasks", {
          type: "POST",
          data: newTask
      }).then(function () {
          console.log("looking for task")
      })
      })
    })
    

    //Collapsible
$(document).ready(function(){
  $('.collapsible').collapsible();
});


  