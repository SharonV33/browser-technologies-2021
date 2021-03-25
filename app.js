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

//set up validator
const { check, validationResult } = require('express-validator')

let userData = []

const port = 3000;

app.get('/', function(req, res) {
    res.render('pages/index')
})

//save data from student info and redirect to WN
app.post('/WN', urlencodedParser, [
    //form validation
    check('name',  'yo je hebt geen naam wtf')
        .exists()
        .isLength({ min: 3}),
    check('studentID', 'geef je studenten ID op')
        .exists()
        .isNumeric()
        .isLength({min: 9, max: 9})
    ],
    function (req, res) {
    const path = `./public/entries/${req.body.studentID}.json`
    const studentInfo = {
            subject: 'studentInfo',
            name: req.body.name,
            studentID: req.body.studentID
    }


    const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(422).jsonp(errors.array())
        }

    if (fs.existsSync(path)) {

        const currentFile = fs.readFileSync(path)
        const currentData = JSON.parse(currentFile)
        userData.push(currentData)
        //check if user already started and redirect to where they left off
            if (!currentData[3]) {
                res.render('pages/WAFS-survey', {
                    studentID: req.body.studentID
                })
            }
            else if (!currentData[4]) {
                res.render('pages/CSS-survey', {
                    studentID: req.body.studentID
                })
            }
            else if (!currentData[5]) {
                res.render('pages/PWA-survey', {
                    studentID: req.body.studentID
                })
            }
            else if (!currentData[6]) {
                res.render('pages/BT-survey', {
                    studentID: req.body.studentID
                })
            }
            else if (!currentData[7]) {
                res.render('pages/RTW-survey', {
                    studentID: req.body.studentID
                })
            }
            else if (!currentData[8]) {
                res.render('pages/HCD-survey', {
                    studentID: req.body.studentID
                })
            }
            else {
                res.render('pages/result', {
                    studentID: req.body.studentID
                })
            }
    }
    else {
        //write new entry
        userData.push(studentInfo)
        fs.writeFile(path, JSON.stringify(studentInfo, null, 2), () => {
            // console.log("JSON data is saved.")
        })
        res.render('pages/WN-survey', {
            name: req.body.name,
            studentID: req.body.studentID
        })
    }

})

//save data from WN and redirect to WAFS
app.post('/WAFS/:id', urlencodedParser,
    //form validation
    [
        check('teacher',  'yo je hebt geen naam wtf')
            .exists()
            .isAlpha()
            .isLength({ min: 3}),
        check('week', 'kies week')
            .exists(),
        check('material', 'kies material')
            .exists(),
        check('explanation', 'kies explanation')
            .exists(),
        check('insight', 'kies insight')
            .exists(),
    ], function (req, res) {
    const path = `./public/entries/${req.params.id}.json`

    const weeklyNerd = {
            subject: 'weekly ',
            teacher: req.body.WNteacher,
            week: req.body.WNweek,
            material: req.body.WNmaterial,
            explanation: req.body.WNexplanation,
            insight: req.body.WNinsight
        }
    userData.push(weeklyNerd)

    fs.writeFile(path, JSON.stringify(userData, null, 2), () => {
        // console.log("JSON data is saved.")
    })


    res.render('pages/WAFS-survey', {
        studentID: req.params.id
    })
})

//save data from WAFS and redirect to CSS
app.post('/CSS/:id', urlencodedParser, function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const WAFS = {
            subject: 'Web apps from scratch',
            teacher: req.body.WAFSteacher,
            week: req.body.WAFSweek,
            material: req.body.WAFSmaterial,
            explanation: req.body.WAFSexplanation,
            insight: req.body.WAFSinsight
    }

    userData.push(WAFS)

    fs.writeFile(path, JSON.stringify(userData, null, 2), () => {
        // console.log("JSON data is saved.")
    })

    res.render('pages/CSS-survey', {
        studentID: req.params.id
    })
})

//save data from CSS and redirect to PWA
app.post('/PWA/:id', urlencodedParser, function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const CSSTTR = {
            subject: 'CSS to the rescue',
            teacher: req.body.CSSteacher,
            week: req.body.CSSweek,
            material: req.body.CSSmaterial,
            explanation: req.body.CSSexplanation,
            insight: req.body.CSSinsight
    }

    userData.push(CSSTTR)

    fs.writeFile(path, JSON.stringify(userData, null, 2), () => {
        // console.log("JSON data is saved.")
    })

    res.render('pages/PWA-survey', {
        studentID: req.params.id
    })
})

//save data from PWA and redirect to BT
app.post('/BT/:id', urlencodedParser, function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const PWA = {
            subject: 'Progressive web apps',
            teacher: req.body.PWAteacher,
            week: req.body.PWAweek,
            material: req.body.PWAmaterial,
            explanation: req.body.PWAexplanation,
            insight: req.body.PWAinsight
    }

    userData.push(PWA)

    fs.writeFile(path, JSON.stringify(userData, null, 2), () => {
        // console.log("JSON data is saved.")
    })

    res.render('pages/BT-survey', {
        studentID: req.params.id
    })
})

//save data from BT and redirect to RTW
app.post('/RTW/:id', urlencodedParser, function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const BT = {
            subject: 'Browser technologies',
            teacher: req.body.BTteacher,
            week: req.body.BTweek,
            material: req.body.BTmaterial,
            explanation: req.body.BTexplanation,
            insight: req.body.BTinsight
    }

    userData.push(BT)

    fs.writeFile(path, JSON.stringify(userData, null, 2), () => {
        // console.log("JSON data is saved.")
    })

    res.render('pages/RTW-survey', {
        studentID: req.params.id
    })
})

//save data from RTW and redirect to HDC
app.post('/HCD/:id', urlencodedParser, function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const RTW = {
            subject: 'Real time web',
            teacher: req.body.RTWteacher,
            week: req.body.RTWweek,
            material: req.body.RTWmaterial,
            explanation: req.body.RTWexplanation,
            insight: req.body.RTWinsight
    }

    userData.push(RTW)

    fs.writeFile(path, JSON.stringify(userData, null, 2), () => {
        // console.log("JSON data is saved.")
    })

    res.render('pages/HCD-survey', {
        studentID: req.params.id
    })
})

//save data from RTW and redirect to thank you page
app.post('/result/:id', urlencodedParser, function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const HCD = {
            subject: 'Human centered design',
            teacher: req.body.HCDteacher,
            week: req.body.HCDweek,
            material: req.body.HCDmaterial,
            explanation: req.body.HCDexplanation,
            insight: req.body.HCDinsight
    }

    userData.push(HCD)

    fs.writeFile(path, JSON.stringify(userData, null, 2), () => {
        // console.log("JSON data is saved.")
    })

    res.render('pages/result', {
        studentID: req.params.id
    })
})


//the "process.env.PORT" is specific for Heroku deployment
app.listen(process.env.PORT || port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})
