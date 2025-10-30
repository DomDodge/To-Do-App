const loginButton = document.getElementById("save_btn");
const signupButton = document.getElementById("signup_btn");
let userText = document.getElementById("username");
let passText = document.getElementById("password");

function loginUser() {
    // Get it ready to send to the api
    let data = "username=" + encodeURIComponent(username.value);
    data += "&password=" + encodeURIComponent(password.value);

    // Send to API
    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(function (response) {
        load(); // refresh list after saving
    })
    // display results
    load();
}

function signupUser() {
    // Get it ready to send to the api
    let data = "username=" + encodeURIComponent(username.value);
    data += "&password=" + encodeURIComponent(password.value);

    // Send to API
    fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    .then(function (response) {
        load(); // refresh list after saving
    })
    // display results
    load();
}

loginButton.onclick = loginUser;
signupButton.onclick = signupUser;