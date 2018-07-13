"use strict";
exports.__esModule = true;
var express = require("express");
require("./gameManager");
var app = express();
app.use(express.static(__dirname + '/build'));
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});
// tslint:disable-next-line:no-console
app.listen(process.env.PORT || 3001, function () { console.log("listening"); });
