const request = require('request')

const forecast = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=f17f2172fa9e06e4b8c30194c25efc11&query='+encodeURIComponent(latitude)+', '+encodeURIComponent(longitude) +'&units=f'

  request({ url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined)
    } else if (body.error) {
      callback('Unable to find Location.', undefined)
    } else {
      callback(undefined,
        ', it is currently ' + body.current.temperature + '°. It feels like ' + body.current.feelslike + '°'
      )
    }
  })
}

module.exports = forecast
