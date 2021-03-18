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

//set up fileSystem
const fs = require('fs')

const port = 3000;

app.get('/', function(req, res) {
    res.render('pages/index')
})

app.post('/result', urlencodedParser, function (req, res) {

    const data = {
        studentInfo: {
            name: req.body.name,
            studentID: req.body.studentID
        },
        weeklyNerd: {
            teacher: req.body.WNteacher,
            week: req.body.WNweek,
            material: req.body.WNmaterial,
            explanation: req.body.WNexplanation,
            insight: req.body.WNinsight
        },
        WAFS: {
            teacher: req.body.WAFSteacher,
            week: req.body.WAFSweek,
            material: req.body.WAFSmaterial,
            explanation: req.body.WAFSexplanation,
            insight: req.body.WAFSinsight
        },
        CSSTTR: {
            teacher: req.body.CSSteacher,
            week: req.body.CSSweek,
            material: req.body.CSSmaterial,
            explanation: req.body.CSSexplanation,
            insight: req.body.CSSinsight
        },
        PWA: {
            teacher: req.body.PWAteacher,
            week: req.body.PWAweek,
            material: req.body.PWAmaterial,
            explanation: req.body.PWAexplanation,
            insight: req.body.PWAinsight
        },
        BT: {
            teacher: req.body.BTteacher,
            week: req.body.BTweek,
            material: req.body.BTmaterial,
            explanation: req.body.BTexplanation,
            insight: req.body.BTinsight
        },
        RTW: {
            teacher: req.body.RTWteacher,
            week: req.body.RTWweek,
            material: req.body.RTWmaterial,
            explanation: req.body.RTWexplanation,
            insight: req.body.RTWinsight
        },
        HCD: {
            teacher: req.body.HCDteacher,
            week: req.body.HCDweek,
            material: req.body.HCDmaterial,
            explanation: req.body.HCDexplanation,
            insight: req.body.HCDinsight
        },
    }

    fs.writeFile(`./public/entries/${req.body.studentID}.json`, JSON.stringify(data), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    })

    res.render('pages/result', {
        name: req.body.name
    })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})