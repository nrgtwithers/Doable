$(document).ready(function() {

    $("#sign-up").on("submit", function (event) {
        event.preventDefault();
      var  email=$("#user-email");
      var password =$("#reate-password");

        var newUser = {
            name: $("#name").val().trim(),
            contact: $("#create-name").val().trim(),
        }

        if (!newUser.email || !newUser.password) {
            return;
        }
        signUpUser(newUser);
        email.val("");
        password.val("");

         
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

    // function signUpUser(email,password) {
    //     $.post("/api/signup", {
    //         email: email,
    //         password: password
    //     }).then(function (data) {
    //         window.location.replace(data);
    //     }).catch(handleLoginErr);   
    // }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
      }
})
