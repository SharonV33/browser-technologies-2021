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

let userData = []

//save data from student info and redirect to WN
app.post('/WN', urlencodedParser, function (req, res) {
    const path = `./public/entries/${req.body.studentID}.json`
    const data = {
        studentInfo: {
            name: req.body.name,
            studentID: req.body.studentID
        },
    }

    userData.push(data)
    if (fs.existsSync(path)) {
        console.log(`${req.body.name} has already done the survey`)

        //check if user already started and redirect to where they left off

    }
    else {
        //write new entry
        fs.writeFile(path, JSON.stringify(data), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.")
        })
    }

    res.render('pages/WN-survey', {
        name: req.body.name,
        studentID: req.body.studentID
    })
})

//save data from WN and redirect to WAFS
app.post('/WAFS/:id', urlencodedParser, function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const currentFile = fs.readFileSync(path)
    const currentData = JSON.parse(currentFile)
    console.log(currentData)

    const data = {
        weeklyNerd: {
            teacher: req.body.WNteacher,
            week: req.body.WNweek,
            material: req.body.WNmaterial,
            explanation: req.body.WNexplanation,
            insight: req.body.WNinsight
        }
    }
    userData.push(data)
    console.log(JSON.stringify(userData))
    fs.writeFile(path, JSON.stringify(userData), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.")
    })


    res.render('pages/WAFS-survey', {
        studentID: req.params.id
    })
})

//save data from WAFS and redirect to CSS
app.post('/CSS/:id', urlencodedParser, function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const data = {
        WAFS: {
            teacher: req.body.WAFSteacher,
            week: req.body.WAFSweek,
            material: req.body.WAFSmaterial,
            explanation: req.body.WAFSexplanation,
            insight: req.body.WAFSinsight
        },
    }
    fs.appendFile(path, JSON.stringify(data), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.")
    })

    res.render('pages/CSS-survey', {
        studentID: req.params.id
    })
})

//save data from CSS and redirect to PWA
app.post('/PWA/:id', urlencodedParser, function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const data = {
        CSSTTR: {
            teacher: req.body.CSSteacher,
            week: req.body.CSSweek,
            material: req.body.CSSmaterial,
            explanation: req.body.CSSexplanation,
            insight: req.body.CSSinsight
        },
    }
    fs.appendFile(path, JSON.stringify(data), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.")
    })

    res.render('pages/PWA-survey', {
        studentID: req.params.id
    })
})

//save data from PWA and redirect to BT
app.post('/BT/:id', urlencodedParser, function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const data = {
        PWA: {
            teacher: req.body.PWAteacher,
            week: req.body.PWAweek,
            material: req.body.PWAmaterial,
            explanation: req.body.PWAexplanation,
            insight: req.body.PWAinsight
        },
    }
    fs.appendFile(path, JSON.stringify(data), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.")
    })

    res.render('pages/BT-survey', {
        studentID: req.params.id
    })
})

//save data from BT and redirect to RTW
app.post('/RTW/:id', urlencodedParser, function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const data = {
        BT: {
            teacher: req.body.BTteacher,
            week: req.body.BTweek,
            material: req.body.BTmaterial,
            explanation: req.body.BTexplanation,
            insight: req.body.BTinsight
        },
    }
    fs.appendFile(path, JSON.stringify(data), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.")
    })

    res.render('pages/RTW-survey', {
        studentID: req.params.id
    })
})

//save data from RTW and redirect to HDC
app.post('/HCD/:id', urlencodedParser, function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const data = {
        RTW: {
            teacher: req.body.RTWteacher,
            week: req.body.RTWweek,
            material: req.body.RTWmaterial,
            explanation: req.body.RTWexplanation,
            insight: req.body.RTWinsight
        },
    }
    fs.appendFile(path, JSON.stringify(data), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.")
    })

    res.render('pages/HCD-survey', {
        studentID: req.params.id
    })
})

//save data from RTW and redirect to thank you page
app.post('/result/:id', urlencodedParser, function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const data = {
        HCD: {
            teacher: req.body.HCDteacher,
            week: req.body.HCDweek,
            material: req.body.HCDmaterial,
            explanation: req.body.HCDexplanation,
            insight: req.body.HCDinsight
        },
    }
    fs.appendFile(path, JSON.stringify(data), (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.")
    })

    res.render('pages/result', {
        studentID: req.params.id
    })
})


//the "process.env.PORT" is specific for Heroku deployment
app.listen(process.env.PORT || port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})
