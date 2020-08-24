const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path .join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup stati direectory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'adi'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about Me',
    name: 'adi'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help Me',
    response: 'You need help',
    name: 'Adi'
  })
})


app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a address term'
    })
  }
  geocode(req.query.address, (error, { lat, long, location} = {}) => {
    if(error) {
      return res.send({
        error
      })
    }
    forecast(lat, long, (error, forecastdata) => {
      if(error) {
        return res.send({
          error
        })
      }
      console.log(req.query.address)
      res.send({
        location: location,
        address: req.query.address,
        forecast: forecastdata
      })
    })
  })

})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Error 404',
    name: 'Adi',
    response: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Error 404',
    name: 'Adi',
    response: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000')
})
