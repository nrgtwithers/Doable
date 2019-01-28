$(function () {
    $("#sign-up").on("submit", function (event) {
        event.preventDefault();

        var newUser = {
            name: $("#name").val().trim(),
            username: $("#user-name").val().trim(),
            location: $("#location").val().trim(),
            email: $("#user-email").val().trim(),
            password: $("#password").val().trim(),
        }

        if (!newUser.email || !newUser.password) {
            return;
        }
        signUpUser(newUser);
        email.val("");
        password.val("");


        $.ajax("/api/users", {
            type: "POST",
            data: newUserData
        }).then(function () {
            console.log("new user: " + newUser)
        })
    })

    function signUpUser(newUser) {
        $.ajax("/api/signup", {
            type: "POST",
            data: newUser
        }).then(function (data) {
            window.location.replace(data);
        }).catch(handleLoginErr);   
    }
})
