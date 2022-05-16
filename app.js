const express = require("express");
const fs = require("fs");
var path = require("path");

const app = express();

// Base64: c29uOnBhc3N3b3Jk = [son:password]
// Authorization: Basic c29uOnBhc3N3b3Jk

function authentication(req, res, next) {
  var authheader = req.headers.authorization;
  console.log(req.headers);

  if (!authheader) {
    var err = new Error("You are not authenticated!");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    return next(err);
  }

  var auth = new Buffer.from(authheader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var user = auth[0];
  var pass = auth[1];

  if (user == "son" && pass == "password") {
    // If Authorized user
    next();
  } else {
    var err = new Error("You are not authenticated!");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    return next(err);
  }
}

app.use(authentication);
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
