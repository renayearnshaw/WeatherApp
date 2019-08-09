const request = require('request')

const geoCode = (searchText, callback) => {
    const encodedSearchText = encodeURIComponent(searchText)
    const accessToken = 'pk.eyJ1IjoicmVuYXllYXJuc2hhdyIsImEiOiJjanh4NGJmcnIwN2RsM25tdXcxZTFmMGRoIn0.Z9OjO0kgzOuDf3sSNErEUQ'
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedSearchText}.json?access_token=${accessToken}&limit=1`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Error connecting to mapping service')
        } else if (body.features.length === 0) {
            callback('Error finding map data')
        } else {
            const placeName = body.features[0].place_name
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            callback(undefined, {
                placeName,
                latitude,
                longitude
            })
        }
    })
}

module.exports = geoCode