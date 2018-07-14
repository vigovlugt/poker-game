"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var filePath = '../../users.json';
function hasUser(name) {
    var data = fs.readFileSync(__dirname + filePath);
    var json = JSON.parse(data.toString());
    var value = false;
    json.users.forEach(function (user) {
        if (user.name === name) {
            value = true;
        }
    });
    return value;
}
exports.hasUser = hasUser;
function login(name, password) {
    var data = fs.readFileSync(path.join(__dirname, filePath));
    var json = JSON.parse(data.toString());
    var valid = false;
    json.users.forEach(function (user) {
        if (user.name === name && user.password === password) {
            valid = true;
        }
    });
    return valid;
}
exports.login = login;
function register(name, password) {
    if (!hasUser(name)) {
        var data = fs.readFileSync(path.join(__dirname, filePath));
        var json = JSON.parse(data.toString());
        json.users.push({ name: name, password: password });
        fs.writeFileSync(__dirname + filePath, JSON.stringify(json));
        return true;
    }
    else {
        return false;
    }
}
exports.register = register;
