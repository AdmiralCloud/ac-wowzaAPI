const wowza = require('../index')
const credentials = require('./credentials.js')

const WowzaAPI = new wowza(credentials.apiKey, credentials.accessKey, { env: 'development' })

const id = process.argv[2]
WowzaAPI.getPlayerState({ id: id }, function(err, result) {
  if (err) console.log(err)
  else console.log(JSON.stringify(result, null, 2))
})
