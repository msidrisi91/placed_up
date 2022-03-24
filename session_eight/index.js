const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL);

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  nationality: String,
});

var Person = mongoose.model("Person", personSchema);

var urlEncodedParser = bodyParser.urlencoded({ extended: true });

app.use(urlEncodedParser);

app.use(multer({ dest: "/uploads/" }).single("file"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.send({ name: "Karan", age: "23" });
});

app.post("/", function (req, res) {
  res.send("Hello Shaheem");
});

app.get("/n*me", function (req, res) {
  res.send("Hello World!");
});

app.post("/submit", function (req, res) {
  console.log(req.body);

  var person = new Person({
    name: req.body.name,
    age: req.body.age,
    nationality: req.body.nationality,
  });

  person.save((err, Person) => {
    if (err) {
      res.send(err);
    } else {
      res.send(Person);
    }
  });

  // res.send("Success");
});

app.post("/upload", function (req, res) {
  console.log(__dirname);
  console.log(req.file);
  var file = __dirname + req.file.destination + req.file.originalname;

  fs.readFile(req.file.path, function (err, data) {
    fs.writeFile(file, data, function (err) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send("File uploaded successfully");
      }
    });
  });
});

function getData() {
  return "Karan";
}

app.get("/home", (req, res) => {
  var n = getData();

  res.render("home", { name: n, list: ["Karan", "Shaheem", "Raj"] });
});

app.get("/person", (req, res) => {
  Person.find({}, (err, data) => {
    if (err) {
      res.send("error");
    } else {
      res.render("person", { data: data });
    }
  });
});

app.get("/person/:name", (req, res) => {
  Person.find({ name: req.params.name }, (err, data) => {
    if (err) {
      res.send("error");
    } else {
      res.render("person", { data: data });
    }
  });
});

app.get("/person/age/:age", (req, res) => {
  Person.find({ age: req.params.age }, (err, data) => {
    if (err) {
      res.send("error");
    } else {
      res.render("person", { data: data });
    }
  });
});

app.use(express.static("public"));

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
