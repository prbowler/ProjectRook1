const playerModel = require("../models/playerModel.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

function addPlayer(req, res) { //INSERT INTO player (username, password) VALUES ($1, $2)
    console.log("addPlayer");
    let username = req.body.username;
    let password = req.body.password;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        let values = [username, hash];
        playerModel.addPlayer(values, function(error, result) {
            if(!error) {
                req.session.player = username;
                result = {
                    success: true,
                    player: username
                };
            } else {
                res.json(error);
            }
            res.json(result);
        });
    });
}

function getPlayer(req, res) { //SELECT username, password FROM player WHERE username = $1
    let values = [res.session.player];
    playerModel.getPlayer(values, function(error, result) {
        res.json(result);
    });
}

function getPlayers(req, res) { //SELECT username, password FROM player
    playerModel.getPlayers( function(error, result) {
        res.json(result);
    });
}

function getGamePlayers(req, res) { //SELECT username, password FROM player
    let values = [req.session.game];
    playerModel.getPlayers(values, function(error, result) {
        res.json(result);
    });
}

function getUser (req, res) {
    let result = {player: req.session.player};
    console.log("server result", result);
    res.json(result);
}

function getUsers(req, res, callback) {
    console.log("getUsers");
    playerModel.getUsers(function(error, result) {
        res.json(result);
    });
}



module.exports = {
    addPlayer: addPlayer,
    getPlayer: getPlayer,
    getPlayers: getPlayers,
    getUser: getUser,
    getUsers: getUsers
};

/*
function validatePlayer(req, res) {
    console.log('validatePlayer');
    let username = req.body.username;
    let password = req.body.password;
    let values = [username];
    playerModel.getPlayer(values, function(error, results) {
        console.log(results.rows.length);
        if (error || !results.rows.length) {
            res.json(error);
        } else {
            bcrypt.compare(password, results.rows[0].password, function (error, result) {
                console.log("validateerror", error);
                console.log("validateresult", result);
                if (!error && result) {
                    req.session.player = username;
                    result = {success: true};
                    res.json(result);
                } else {
                    res.json(error);
                }
            });
        }
    });
}

function logout(req, res) {
    console.log("logout");
    let result = {success: false};
    if (req.session.player) {
        req.session.destroy();
        result = {success: true};
    }
    res.render('pages/index', { title: 'Home' });
}

function requireLogin(req, res, next) {
    console.log("check for user");
    if (req.session && req.session.player) {
        console.log("user is logged in");
        next();
    } else {
        console.log("user is not logged in", req.session);
        res.render('pages/login', { title: 'Login' });
    }
}
*/