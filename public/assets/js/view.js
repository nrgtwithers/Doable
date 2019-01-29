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
