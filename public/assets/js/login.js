$(document).ready(function() {
var emailInput = $("#email-login");
var passwordInput = $("#password");

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

});
