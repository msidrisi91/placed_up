const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs");

mongoose.connect(process.env.DATABASE_URL);

var urlEncodedParser = bodyParser.urlencoded({ extended: true });
app.use(urlEncodedParser);

app.use(express.static("public"));

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Task = mongoose.model("Task", taskSchema);

app.get("/", function (req, res) {
  Task.find({}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.render("todo", { tasks: data });
    }
  });
});

app.post("/", function (req, res) {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
  });
  task.save((err, task) => {
    if (err) {
      res.redirect("error");
    } else {
      res.redirect("/");
    }
  });
});

app.get("/edit/:id", function (req, res) {
  var id = req.params.id;

  Task.find({}, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.render("edit", { tasks: data, id: id });
    }
  });
});

app.post("/edit/:id", function (req, res) {
  var id = req.params.id;

  Task.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      description: req.body.description,
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    }
  );
});

app.get("/delete/:id", function (req, res) {
  Task.deleteOne({ _id: req.params.id }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/edit2/:id", function (req, res) {
  var id = req.params.id;

  Task.findById(id, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.render("edit2", { task: data });
    }
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
