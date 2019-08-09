const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/3b47ab1aa607d221d6d83af6b475ea7a/${latitude},${longitude}?units=si`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Error connecting to weather service')
        } else if (body.error) {
            callback('Error retrieving weather information')
        } else {
            const currently = body.currently
            const daily = body.daily
            callback(undefined, `${daily.data[0].summary} It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast