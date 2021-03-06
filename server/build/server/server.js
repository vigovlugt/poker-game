"use strict";
exports.__esModule = true;
var express = require("express");
var gameManager = require("./gameManager");
var db = require("./userDataBase");
var path = require("path");
var http = require("http");
var app = express();
var server = http.createServer(app);
gameManager.setup(server);
app.use(express.static(path.join(__dirname, '/../../../client/build')));
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, '/../../../client/build/index.html'));
});
app.get("/api/login/:name/:password", function (req, res) {
    var _a = req.params, name = _a.name, password = _a.password;
    res.send(db.login(name, password));
});
app.get("/api/register/:name/:password", function (req, res) {
    var _a = req.params, name = _a.name, password = _a.password;
    res.send(db.register(name, password));
});
// tslint:disable-next-line:no-console
server.listen(process.env.PORT || 3001, function () { console.log("listening on port " + (process.env.PORT || 3001)); });
