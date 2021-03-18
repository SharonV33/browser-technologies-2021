//express setup
const express = require('express')
const app = express()
app.use(express.static('public'))

//bodyParser setup
const bodyParser = require('body-parser')
// const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//ejs setup
app.set('view engine', 'ejs')
app.set('views', 'views')

const fs = require('fs')

const port = 3000;

app.get('/', function(req, res) {
    res.render('pages/index')
})

app.post('/result', urlencodedParser, function (req, res) {

    const data = {

    }
    fs.writeFile(`${req.body.name}`, JSON.stringify(data), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    })

    res.render('pages/result', {
        name: req.body.name,
        age: req.body.age
    })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})