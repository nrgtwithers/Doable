$(function () {
    $("#sign-up").on("submit", function (event) {
        event.preventDefault();

        var newUserData = {
            name: $("#name").val().trim(),
            username: $("#user-name").val().trim(),
            location: $("#location").val().trim(),
        }

        var newUser = {
            email: $("#user-email").val().trim(),
            password: $("#password").val().trim(),
        }

        if (!newUser.email || !newUser.password) {
            return;
        }
        signUpUser(newUser.email, newUser.password);
        email.val("");
        password.val("");


        $.ajax("/api/users", {
            type: "POST",
            data: newUserData
        }).then(function () {
            console.log("new user: " + newUser)
        })
    })

    function signUpUser(email, password) {
        $.post("/api/signup", {
            email: email,
            password: password
        }).then(function (data) {
            window.location.replace(data);
        }).catch(handleLoginErr);
    }
})
