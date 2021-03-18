const express = require('express')
const app = express()


app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static('public'))

const port = 3000;



app.get('/', function(req, res) {
    res.render('pages/index')
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});