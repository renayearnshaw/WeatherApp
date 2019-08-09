const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Directory for static resources
app.use(express.static(path.join(__dirname, '../public')))

// Use handlebars for dynamic resources and specify directories
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Renay Earnshaw'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Renay Earnshaw'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help for my app.',
        title: 'Help',
        name: 'Renay Earnshaw'
    })
})

app.get('/products', (req, res) => {
    console.log(req.query.searchText)
    if (!req.query.searchText) {
        return res.send({
            error: 'searchText must be provided'
        })
    }

    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {
    const location = req.query.location
    if (!location) {
        return res.send({
            error: 'location must be specified'
        })
    }
    geoCode(location, (error, { latitude, longitude, placeName } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: data,
                location: placeName
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found.',
        title: 'Error',
        name: 'Renay Earnshaw'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found.',
        title: 'Error',
        name: 'Renay Earnshaw'
    })
})

app.listen(port)