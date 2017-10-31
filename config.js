
module.exports = {
  apiUrl: {
    production: 'https://api.cloud.wowza.com/api/v1/',
    development: 'https://api-sandbox.cloud.wowza.com/api/v1/'
  },
  operations: [
    { operation: 'getAllLiveStreams', method: 'get', path: 'live_streams' },
    { operation: 'getLiveStream', method: 'get', path: 'live_streams/{id}', requiredFields: ['id'] },
    { operation: 'createLiveStream', method: 'post', path: 'live_streams', root: 'live_stream', requiredFields: ['aspect_ratio_width', 'aspect_ratio_height', 'broadcast_location', 'encoder', 'name', 'password', 'username'] },
    { operation: 'updateLiveStream', method: 'patch', path: 'live_streams/{id}', root: 'live_stream', requiredFields: ['id'] },
    { operation: 'deleteLiveStream', method: 'delete', path: 'live_streams/{id}', requiredFields: ['id'] },
    { operation: 'getLiveStreamState', method: 'get', path: 'live_streams/{id}/state',  requiredFields: ['id'] },
    { operation: 'getLiveStreamStats', method: 'get', path: 'live_streams/{id}/stats',  requiredFields: ['id'] },
    { operation: 'startLiveStream', method: 'put', path: 'live_streams/{id}/start',  requiredFields: ['id'] },
    { operation: 'stopLiveStream', method: 'put', path: 'live_streams/{id}/stop',  requiredFields: ['id'] },
    { operation: 'getPlayer', method: 'get', path: 'players/{id}',  requiredFields: ['id'] },
    { operation: 'getPlayerState', method: 'get', path: 'players/{id}/state',  requiredFields: ['id'] },
    { operation: 'getRecording', method: 'get', path: 'recordings/{id}',  requiredFields: ['id'] },
    { operation: 'getRecordingState', method: 'get', path: 'recordings/{id}/state',  requiredFields: ['id'] },
    { operation: 'deleteRecording', method: 'delete', path: 'recordings/{id}',  requiredFields: ['id'] }
  ]
}
