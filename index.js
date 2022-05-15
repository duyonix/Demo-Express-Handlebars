const express = require('express');
const path = require('path');
const expressHbs = require("express-handlebars");
const bodyParser = require('body-parser');

const app = express();
const hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
});

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.render("index", {
        author: "Nhom06"
    })
})

app.get("/task1", (req, res) => {
    res.render("task1", {
        author: "MSSV - Ho ten"
    })
})

app.get("/task2", (req, res) => {
    res.render("task2", {
        author: "MSSV - Ho ten"
    })
})

app.get("/task3", (req, res) => {
    res.render("task3", {
        author: "MSSV - Ho ten"
    })
})

app.get("/task4", (req, res) => {
    res.render("task4", {
        author: "MSSV - Ho ten"
    })
})

app.get("/task4/:name", (req, res) => {
    res.render("task4-details", {
        author: "MSSV - Ho ten"
    })
})

app.set("port", process.env.PORT || 3000)
app.listen(app.get("port"), () => {
    console.log("Server is running on port " + app.get("port"))
});