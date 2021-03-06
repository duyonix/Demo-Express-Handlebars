const express = require('express');
const path = require('path');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
const { emotions, categories, products, zodiacs } = require('./data')

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
    app.locals.emotions = emotions
    res.render("task1", {
        author: "19120336 - Đinh Trọng Quân"
    })
})

app.get('/task2', (req, res) => {
    let salary = parseFloat(req.query.salary || 0);
    res.locals.jars = [
        (salary * 55) / 100,
        (salary * 10) / 100,
        (salary * 5) / 100,
        (salary * 10) / 100,
        (salary * 10) / 100,
        (salary * 10) / 100,
    ];
    res.render('task2', {
        author: '19120160 - Đàm Thị Xuân Ý',
    });
});

app.get("/task3", (req, res) => {
    let category = parseFloat(req.query.cat || 0);
    res.locals.categories = categories;
    if(category) res.locals.products = products.filter(product => product.category === category);
    else{
        res.locals.products = products;
    }
    res.render("task3", {
        author: "19120727 - Võ Hoàng Vũ"
    })
})

app.get("/task4", (req, res) => {
    res.render("task4", {
        zodiacs,
        author: "19120491 - Đặng Thái Duy"
    })
})

app.get("/task4/:name", (req, res) => {
    const name = req.params.name;
    const zodiac = zodiacs.find(zodiac => zodiac.name === name) || {};

    res.render("task4-details", {
        zodiac,
        author: "19120491 - Đặng Thái Duy"
    })
})

app.set("port", process.env.PORT || 3000)
app.listen(app.get("port"), () => {
    console.log("Server is running on port " + app.get("port"))
});
