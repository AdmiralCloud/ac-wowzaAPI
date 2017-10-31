const wowza = require('../index')
const credentials = require('./credentials.js')

const WowzaAPI = new wowza(credentials.apiKey, credentials.accessKey, { env: 'development' })


WowzaAPI.getAllLiveStreams({}, function(err, result) {
  if (err) console.log(err)
  else console.log(JSON.stringify(result, null, 2))
})
