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
    res.render('pages/index', {
        error: []
    })
})

//save data from student info and redirect to WN
app.post('/WN', urlencodedParser, [
    //form validation
    check('name',  'Vul alstublieft een naam in')
        .exists()
        .isLength({ min: 3}),
    check('studentID', 'Vul een geldig studenten ID in (9 cijfers)')
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
        const alert = errors.array()
        console.log('error, back to index')
        res.render('pages/index', {
            studentID: req.body.studentID,
            error: alert
        })
    }

    if (fs.existsSync(path)) {

    const currentFile = fs.readFileSync(path)
    const currentData = JSON.parse(currentFile)
    userData.push(currentData)
    //check if user already started and redirect to where they left off
        if (!currentData[3]) {
            res.render('pages/WAFS-survey', {
                studentID: req.body.studentID,
                error: []
            })
        }
        else if (!currentData[4]) {
            res.render('pages/CSS-survey', {
                studentID: req.body.studentID,
                error: []
            })
        }
        else if (!currentData[5]) {
            res.render('pages/PWA-survey', {
                studentID: req.body.studentID,
                error: []
            })
        }
        else if (!currentData[6]) {
            res.render('pages/BT-survey', {
                studentID: req.body.studentID,
                error: []
            })
        }
        else if (!currentData[7]) {
            res.render('pages/RTW-survey', {
                studentID: req.body.studentID,
                error: []
            })
        }
        else if (!currentData[8]) {
            res.render('pages/HCD-survey', {
                studentID: req.body.studentID,
                error: []
            })
        }
        else {
            res.render('pages/result', {
                studentID: req.body.studentID,
                error: []
            })
        }
    }
    else {
        console.log('no error, to WN')
        //write new entry
        userData.push(studentInfo)
        fs.writeFile(path, JSON.stringify(studentInfo, null, 2), () => {
            // console.log("JSON data is saved.")
        })
        res.render('pages/WN-survey', {
            name: req.body.name,
            studentID: req.body.studentID,
            error: []
        })
    }

})

//save data from WN and redirect to WAFS
app.post('/WAFS/:id', urlencodedParser,
    //form validation
    [
        check('WNteacher',  'Vul alsftublieft een geldige naam in')
            .exists()
            .isAlpha()
            .isLength({ min: 3}),
        check('WNweek', 'Selecteer alstublieft een week')
            .exists(),
        check('WNmaterial', 'Selecteer een cijfer voor het materiaal')
            .exists(),
        check('WNexplanation', 'Selecteer een cijfer voor het de uitleg')
            .exists(),
        check('WNinsight', 'Selecteer een cijfer voor het het verkregen inzicht')
            .exists(),
    ], function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const weeklyNerd = {
        subject: 'weekly nerd',
        teacher: req.body.WNteacher,
        week: req.body.WNweek,
        material: req.body.WNmaterial,
        explanation: req.body.WNexplanation,
        insight: req.body.WNinsight
    }

    //check if there are validation errors
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const alert = errors.array()
        console.log('error, back to WN')
        res.render('pages/wn-survey', {
            studentID: req.params.id,
            error: alert
        })
    }
    else {
        userData.push(weeklyNerd)

        fs.writeFile(path, JSON.stringify(userData, null, 2), () => {
            // console.log("JSON data is saved.")
        })
        console.log('geen error, naar WAFS')
        res.render('pages/WAFS-survey', {
            studentID: req.params.id,
            error: []
        })
    }
})

//save data from WAFS and redirect to CSS
app.post('/CSS/:id', urlencodedParser,
    //form validation
    [
        check('WAFSteacher', 'Vul alsftublieft een geldige naam in')
            .exists()
            .isAlpha()
            .isLength({ min: 3}),
        check('WAFSweek', 'Selecteer alstublieft een week')
            .exists(),
        check('WAFSmaterial', 'Selecteer een cijfer voor het materiaal')
            .exists(),
        check('WAFSexplanation', 'Selecteer een cijfer voor het de uitleg')
            .exists(),
        check('WAFSinsight', 'Selecteer een cijfer voor het het verkregen inzicht')
            .exists(),
    ],
    function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const WAFS = {
            subject: 'Web apps from scratch',
            teacher: req.body.WAFSteacher,
            week: req.body.WAFSweek,
            material: req.body.WAFSmaterial,
            explanation: req.body.WAFSexplanation,
            insight: req.body.WAFSinsight
    }
    //check if there are validation errors
    const errors = validationResult(req)
    if(errors.length >= 1){
        console.log('error, terug naar wafs', errors)
        const alert = errors.array()
        res.render('pages/wafs-survey', {
            studentID: req.params.id,
            error: alert
        })
    }
    else {
        userData.push(WAFS)

        fs.writeFile(path, JSON.stringify(userData, null, 2), () => {
            // console.log("JSON data is saved.")
        })

        console.log('geen error, door naar css')

        res.render('pages/CSS-survey', {
            studentID: req.params.id,
            error: []
        })
    }

})

//save data from CSS and redirect to PWA
app.post('/PWA/:id', urlencodedParser,
    //form validation
    [
        check('CSSteacher', 'Vul alsftublieft een geldige naam in')
            .exists()
            .isAlpha()
            .isLength({ min: 3}),
        check('CSSweek', 'Selecteer alstublieft een week')
            .exists(),
        check('CSSmaterial', 'Selecteer een cijfer voor het materiaal')
            .exists(),
        check('CSSexplanation', 'Selecteer een cijfer voor het de uitleg')
            .exists(),
        check('CSSinsight', 'Selecteer een cijfer voor het het verkregen inzicht')
            .exists(),
    ],
    function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const CSSTTR = {
            subject: 'CSS to the rescue',
            teacher: req.body.CSSteacher,
            week: req.body.CSSweek,
            material: req.body.CSSmaterial,
            explanation: req.body.CSSexplanation,
            insight: req.body.CSSinsight
    }

    //check if there are validation errors
    const errors = validationResult(req)
    if(errors.length >= 1){
        console.log('error, terug naar css')
        const alert = errors.array()
        res.render('pages/CSS-survey', {
            studentID: req.params.id,
            error: alert
        })
    }

    else {
        userData.push(CSSTTR)

        fs.writeFile(path, JSON.stringify(userData, null, 2), () => {
            // console.log("JSON data is saved.")
        })

        console.log('geen error, door naar pwa')

        res.render('pages/PWA-survey', {
            studentID: req.params.id,
            error: []
        })
    }

})

//save data from PWA and redirect to BT
app.post('/BT/:id', urlencodedParser,
    //form validation
    [
        check('PWAteacher',  'Vul alsftublieft een geldige naam in')
            .exists()
            .isAlpha()
            .isLength({ min: 3}),
        check('PWAweek', 'Selecteer alstublieft een week')
            .exists(),
        check('PWAmaterial', 'Selecteer een cijfer voor het materiaal')
            .exists(),
        check('PWAexplanation', 'Selecteer een cijfer voor het de uitleg')
            .exists(),
        check('PWAinsight', 'Selecteer een cijfer voor het het verkregen inzicht')
            .exists(),
    ],
    function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const PWA = {
            subject: 'Progressive web apps',
            teacher: req.body.PWAteacher,
            week: req.body.PWAweek,
            material: req.body.PWAmaterial,
            explanation: req.body.PWAexplanation,
            insight: req.body.PWAinsight
    }

    //check if there are validation errors
    const errors = validationResult(req)
    if(errors.length >= 1){
        const alert = errors.array()
        console.log('error, terug naar pwa')
        res.render('pages/PWA-survey', {
            studentID: req.params.id,
            error: alert
        })
    }
    else {
        userData.push(PWA)

        fs.writeFile(path, JSON.stringify(userData, null, 2), () => {
            // console.log("JSON data is saved.")
        })

        console.log('geen error, door naar bt')

        res.render('pages/BT-survey', {
            studentID: req.params.id,
            error: []
        })
    }


})

//save data from BT and redirect to RTW
app.post('/RTW/:id', urlencodedParser,
    //form validation
    [
        check('BTteacher',  'Vul alsftublieft een geldige naam in')
            .exists()
            .isAlpha()
            .isLength({ min: 3}),
        check('BTweek', 'Selecteer alstublieft een week')
            .exists(),
        check('BTmaterial', 'Selecteer een cijfer voor het materiaal')
            .exists(),
        check('BTexplanation', 'Selecteer een cijfer voor het de uitleg')
            .exists(),
        check('BTinsight', 'Selecteer een cijfer voor het het verkregen inzicht')
            .exists(),
    ],
    function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const BT = {
            subject: 'Browser technologies',
            teacher: req.body.BTteacher,
            week: req.body.BTweek,
            material: req.body.BTmaterial,
            explanation: req.body.BTexplanation,
            insight: req.body.BTinsight
    }

    //check if there are validation errors
    const errors = validationResult(req)
    if(errors.length >= 1){
        const alert = errors.array()
        console.log('error, terug naar BT')
        res.render('pages/BT-survey', {
            studentID: req.params.id,
            error: alert
        })
    }
    else {
        userData.push(BT)

        fs.writeFile(path, JSON.stringify(userData, null, 2), () => {
            // console.log("JSON data is saved.")
        })
        console.log('geen error, door naar RTW')

        res.render('pages/RTW-survey', {
            studentID: req.params.id,
            error: []
        })
    }

})

//save data from RTW and redirect to HDC
app.post('/HCD/:id', urlencodedParser,
    //form validation
    [
        check('RTWteacher',  'Vul alsftublieft een geldige naam in')
            .exists()
            .isAlpha()
            .isLength({ min: 3}),
        check('RTWweek', 'Selecteer alstublieft een week')
            .exists(),
        check('RTWmaterial', 'Selecteer een cijfer voor het materiaal')
            .exists(),
        check('RTWexplanation', 'Selecteer een cijfer voor het de uitleg')
            .exists(),
        check('RTWinsight', 'Selecteer een cijfer voor het het verkregen inzicht')
            .exists(),
    ],
    function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const RTW = {
            subject: 'Real time web',
            teacher: req.body.RTWteacher,
            week: req.body.RTWweek,
            material: req.body.RTWmaterial,
            explanation: req.body.RTWexplanation,
            insight: req.body.RTWinsight
    }

    //check if there are validation errors
    const errors = validationResult(req)
    if(errors.length >= 1){
        console.log(errors)
        const alert = errors.array()
        console.log('error, terug naar RTW')
        res.render('pages/RTW-survey', {
            studentID: req.params.id,
            error: alert
        })
    }

    userData.push(RTW)

    fs.writeFile(path, JSON.stringify(userData, null, 2), () => {
        // console.log("JSON data is saved.")
    })

        console.log('geen error, door naar hcd')

    res.render('pages/HCD-survey', {
        studentID: req.params.id,
        error: []
    })
})

//save data from RTW and redirect to thank you page
app.post('/result/:id', urlencodedParser,
    //form validation
    [
        check('HCDteacher', 'Vul alsftublieft een geldige naam in')
            .exists()
            .isAlpha()
            .isLength({ min: 3}),
        check('HCDweek', 'Selecteer alstublieft een week')
            .exists(),
        check('HCDmaterial', 'Selecteer een cijfer voor het materiaal')
            .exists(),
        check('HCDexplanation', 'Selecteer een cijfer voor het de uitleg')
            .exists(),
        check('HCDinsight', 'Selecteer een cijfer voor het het verkregen inzicht')
            .exists(),
    ],
    function (req, res) {
    const path = `./public/entries/${req.params.id}.json`
    const HCD = {
            subject: 'Human centered design',
            teacher: req.body.HCDteacher,
            week: req.body.HCDweek,
            material: req.body.HCDmaterial,
            explanation: req.body.HCDexplanation,
            insight: req.body.HCDinsight
    }


    const errors = validationResult(req)
    //check if there are validation errors
    if(errors.length >= 1){
        console.log('error, terug naar hcd')
        const alert = errors.array()
        res.render('pages/hcd-survey', {
            studentID: req.params.id,
            error: alert
        })
    }

    userData.push(HCD)

    fs.writeFile(path, JSON.stringify(userData, null, 2), () => {
        // console.log("JSON data is saved.")
    })
        console.log('geen error, door naar result')

    res.render('pages/result', {
        studentID: req.params.id,
        error: []
    })
})


//the "process.env.PORT" is specific for Heroku deployment
app.listen(process.env.PORT || port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})
