const express = require('express')
const hbs = require('hbs')
const mypath = require('path')
const app = express()
const port = 3000 || process.env.PORT

const geocode = require('./tools/geocode')
const forecast = require('./tools/forecast')
const { response } = require('express')


const publicDirectory = mypath.join(__dirname, '../public')
app.use(express.static(publicDirectory))

//Setting Type Of Engine
app.set('view engine', 'hbs')


//To Change (Views) Directory To any Path
const viewPath = mypath.join(__dirname, '../templates/views')
app.set('views', viewPath)

//The Header And Footer Path In Partials Folder
const partialPath = mypath.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath) // to read the hbs header and footer partial path

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us '
    })
})

app.get('/weathers', (req, res) => {
    res.render('myWeather', {
        title: 'Weather'
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address",
        });
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        forecast(data.latitude, data.longtiude, (error, data) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location: data.location,
                forecast: data
            })
        });
    });
});

app.get('*', (req, res) => {
    res.render('error')
})

app.listen(port, () => {
    console.log('Loading Server Success')
})