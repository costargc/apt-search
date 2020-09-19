// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
// var exphbs = require("express-handlebars");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.static(path.join(__dirname, "web")));

// IMPORTANT!!!!// IMPORTANT!!!!// IMPORTANT!!!!// IMPORTANT!!!!
// IMPORTANT!!!!// IMPORTANT!!!!// IMPORTANT!!!!// IMPORTANT!!!!
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// IMPORTANT!!!!// IMPORTANT!!!!// IMPORTANT!!!!// IMPORTANT!!!!
// IMPORTANT!!!!// IMPORTANT!!!!// IMPORTANT!!!!// IMPORTANT!!!!

// Set Handlebars as the default templating engine.
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// console.log(__dirname);
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// Routes
// =============================================================
var json_data = [
  {
    "test": "this is a test json",
  }];
// var survey_data = [];

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  // console.log(__dirname);
  res.sendFile(path.join(__dirname, "web", "index.html"));
});


app.get("/api/run/scraping", function (req, res) {

  scraping = require('./app/apt-scraping.js')
  // scoring = require('./app/apt-scoring.js')

  scraping();
  // scoring();
  return res.json({ "status": "true" });

});


app.get("/api/run/scoring", function (req, res) {

  // scraping = require('./app/apt-scraping.js')
  scoring = require('./app/apt-scoring.js')

  // scraping();
  scoring();
  return res.json({ "status": "true" });

});


app.get("/api/view", function (req, res) {
  let getdata = fs.readFileSync('./app/scoring/scoring.json');
  let json_data = JSON.parse(getdata);
  return res.json(json_data);
});


// app.get("/api/survey", function (req, res) {
//   return res.json(survey_data);
// });


// Save a reference to the Schema constructor
// var MongoClient = require('mongodb').MongoClient;
// var database_name = "mt_databasePROD";
// var url = "mongodb+srv://mt_username:mt_password@cluster0-hzcwi.mongodb.net/" + database_name + "?retryWrites=true&w=majority";


app.get("*", function (req, res) {
  // console.log(res.req._parsedOriginalUrl.pathname);
  var mypath = { pathname: res.req._parsedOriginalUrl.pathname };
  res.status(404);
  // res.sendFile(path.join(__dirname, "web", "404.html"));
  res.render("404", mypath);
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});
