$(document).ready(function() {

    $("#sign-up").on("submit", function (event) {
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
})
