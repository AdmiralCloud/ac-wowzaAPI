const wowza = require('../index')
const credentials = require('./credentials.js')

const WowzaAPI = new wowza(credentials.apiKey, credentials.accessKey, { env: 'development' })

let params = {
  name: process.argv[2],
  broadcast_location: process.argv[3],
  encoder: process.argv[4],
  username: process.argv[5],
  password: process.argv[6],
  aspect_ratio_width: process.argv[2] || 1920,
  aspect_ratio_height: process.argv[2] || 1080,
}

WowzaAPI.createLiveStream(params, function(err, result) {
  if (err) console.log(err)
  else console.log(JSON.stringify(result, null, 2))
})
