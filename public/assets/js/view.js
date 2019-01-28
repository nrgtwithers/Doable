$(document).ready(function(){
    $('.parallax').parallax();
  });

  $(document).ready(function(){
    $('.sidenav').sidenav();
  });

  $("#search-button").on("click",function(){
    $.ajax("/api/tasks", {
      type: "GET",
  }).then(function () {
      console.log("search button clicked")
  })
  })