const request = require('request')
const forecast = (latitude, longtiude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8e84dd77b64a0d95a9137a29d36790b1=' + latitude + ',' + longtiude

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect waether stack service!!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'In ' + response.body.location.country + ' It is now ' + response.body.current.temperature + ' degrees. It is ' + response.body.current.weather_descriptions[0])
        }
    })
}


module.exports = forecast