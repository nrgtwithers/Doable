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


// Sign up form post request. I'll move this to a different file 
//---------------------------------------------------------------------------------------
$(document).ready(function() { 
$("#sign-up").on("click", function (event) {
      event.preventDefault();
    var  email= $("#new-email");
    var password = $("#new-password");

      var newUser = {
          name: $("#new-name").val().trim(),
          contact: $("#new-contact").val().trim(),
          email: email.val().trim(),
          password: password.val().trim()
      }

      if (!newUser.email || !newUser.password) {
          return;
      }
      signUpUser(newUser);
      email.val("");
      password.val("");

      console.log(newUser)
       
  })
});
  function signUpUser(newUser){
      $.ajax("/api/signup/", {
      type: "POST",
      data: newUser
  }).then(function () {
      console.log("new user: " + newUser)
      window.location.replace(data);
  }).catch(handleLoginErr);  
  }

  function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
//---------------------------------------------------------------------------------------


//log in form post request. I'll move this to a different file 
//---------------------------------------------------------------------------------------
$(document).ready(function() {
var emailInput = $("#email-login");
var passwordInput = $("#password-login");

    $("#login-button").on("click", function (event) {
        event.preventDefault();

        var userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
    });
  });
    function loginUser(email, password) {
        $.post("/api/login", {
            email: email,
            password: password
        }).then(function (data) {
            window.location.replace(data);
            console.log("logged in")
        }).catch(function (err) {
            console.log(err);
        });
    }
//---------------------------------------------------------------------------------------