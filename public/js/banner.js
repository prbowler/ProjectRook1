const logoutLink = '<li id="logout_link"><a href="/players/logout">Logout</a></li>';
const loginLink = '<li id="login_link"><a onclick="setupLogin()">Login</a></li>';
const newPlayerLink = '<li id="login_link"><a onclick="setupNewPlayer()">New Player</a></li>';
const gamesLink = '<li id="games_link"><a href="/games/show">Games</a></li>';
const loginForm = '<label for="username">Username</label>' +
    '<input type="text" name="username" id="username">' +
    '<label for="password">Password</label>' +
    '<input type="password" name="password" id="password">';

const preLogin = '<h2 id="pre_login">Please Login or create an account to play</h2>';
const loginMessage = '<h2 id="login_message">Please Login to play</h2>';
const newPlayerMessage = '<h2 id="new_player_message">Please create an account to play</h2>';
const loginButton = '<button id="login" onclick="login()">login</button>';
const newPlayerButton = '<button id="new_player" onclick="newPlayer()">Create New Player</button>';
const setupLoginButton = '<button id="login_button" onclick="setupLogin()">Login</button>';
const setupNewPlayerButton = '<button id="new_player_button" onclick="setupNewPlayer()">New Player</button>';

function setupBanner() {
    console.log("Banner Loaded");
    $.post("/players/user", function(data, result) {
        console.log("bannerdata", data);
        console.log("bannerresult",result);
        if(data.player) {
            console.log("bannerdata2", data);
            console.log("bannerresult2",result);
            $("#main-menu").append(logoutLink);
            $("#main-menu").append(gamesLink);
            $("#main-menu").append('<li><a>'+ data.player +'</a></li>');
        } else {
            console.log("bannerdata3", data);
            console.log("bannerresult3",result);
            $("#main-menu").append(loginLink);
            $("#main-menu").append(newPlayerLink);
        }
    });
}

function setupLogin() {
    $("#login_form").empty();
    $("#login_form").append(loginMessage);
    $("#login_form").append(loginForm);
    $("#login_form").append(loginButton);
}

function setupNewPlayer() {
    $("#login_form").empty();
    $("#login_form").append(newPlayerMessage);
    $("#login_form").append(loginForm);
    $("#login_form").append(newPlayerButton);
}

function login() {
    let username = $("#username").val();
    let password = $("#password").val();
    console.log(username + " " + password);

    let params = {
        username: username,
        password: password
    };

    $.post("/players/validate", params, function(result) {
        if (result && result.success) {
            console.log("Successfully logged in.");
            $.post("/games/show", function(result, data) {
                console.log("result", result);
                console.log("data");
                if (!result) {
                    console.log(data);
                    $("#status").text("Error loading games.", data);
                }

            });
        } else {
            $("#status").text("Error logging in.");
        }
    });
}

function newPlayer() {
    let username = $("#username").val();
    let password = $("#password").val();
    console.log(username + " " + password);

    let params = {
        username: username,
        password: password
    };

    $.post("/players", params, function(result) {
        if (result && result.success) {
            $("#status").text("Successfully added player.");
        } else {
            $("#status").text("Error adding player.");
        }
    });
}
