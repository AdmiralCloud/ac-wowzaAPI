# AC Wowza API Wrapper

Wrapper for Wowza Streaming Cloud REST API. At the moment only limited calls are available.

Maintained by [Mark Poepping](https://github.com/markBerlin)

# Installation
```
  npm install git+ssh://git@github.com:mmpro/ac-wowzaAPI --save
```

# Usage

Create API Key in Wowza Cloud Management and instanciate WowzaAPI with your WowzaAPI URL and those API keys.

```
const wowza = require('ac-wowzaAPI')
const WowzaAPI = new wowza(apiKey, accessKey);
```

####Sandbox mode
If you want to use the sandbox mode, instanciate Wowza like this:
```
const WowzaAPI = new wowza(apiKey, accessKey, { env: 'development' })
```

## Available commands
Use the following structure for a all to the Wowza API. See Wowza API documentation for parameters. Calls without parameters must use an empty object as params.
```
WowzaAPI.COMMAND(params, function(err, result) {
  // error contains a potential error
  // result contains the JSON response from Wowza API
})
```

### Currently available commands
#### Livestream
+ getAllLiveStreams
+ getLiveStream
+ createLiveStream
+ updateLiveStream
+ deleteLiveStream
+ getLiveStreamState
+ getLiveStreamStats
+ startLiveStream
+ stopLiveStream

#### Player
+ getPlayer
+ getPlayerState

#### Recordings
+ getRecording
+ getRecordingState
+ deleteRecording

### Example: Create a live stream
```
var params = {
  name: "My live streaming,
  broadcast_location" "eu_germany",
  encoder: 'other_rtmp',
  username: 'usernameForSendingStream',
  password: 'passwordForSendingStream',
  aspect_ratio_width: 1920,
  aspect_ratio_height: 1080
};

WowzaAPI.createLiveStream(params, function(err, result) {
  console.log(err, result)
});
```

## Using examples
You can find a bunch of calls in the examples folder. Create a credentials.js file with the following content:
```
module.exports = {
  apiKey: 'yourAPIKey',
  accessKey: 'yourAPISecret'
}
```

Then call the examples like this:
```
node getAllLiveStreams

node getLiveStream abcdef123
```

## License
MIT
