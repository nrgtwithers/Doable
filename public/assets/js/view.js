$(document).ready(function () {
    $('.parallax').parallax();
});

$(document).ready(function () {
    $('.sidenav').sidenav();
});


$("#search-button").on("click", function () {
    $.ajax("/api/tasks", {
        type: "GET",
    }).then(function () {
        console.log("search button clicked")
    })
})

$(document).ready(function () {
    $('.modal').modal();
<<<<<<< HEAD
  });

  
=======
});

$('.dropdown-trigger').dropdown();

// $("#user").hide();

$(".modal-close").click(function () {
    // alert( "Handler for .click() called." );
    $(".modal1").hide();
    $(".modal2").hide();
    $("#testimonials").hide();
    $("#contact").hide();
    $("#user").show();
});
>>>>>>> d84deee1b81623c3336e917185caed12a2c9a6cf
