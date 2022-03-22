const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const app = express();

var urlEncodedParser = bodyParser.urlencoded({ extended: true });

app.use(urlEncodedParser);

app.use(multer({ dest: "/uploads/" }).single("file"));

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.post("/", function (req, res) {
  res.send("Hello Shaheem");
});

app.get("/n*me", function (req, res) {
  res.send("Hello World!");
});

app.post("/submit", function (req, res) {
  console.log(req.body);
  res.send("Success");
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

app.use(express.static("public"));

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
