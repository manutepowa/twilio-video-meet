const twilio = require('twilio');

const response = new Twilio.Response();
response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

exports.handler = async function(context, event, callback) {
  const { room, username } = event
  const accessToken = new twilio.jwt.AccessToken(context.ACCOUNT_SID, context.API_KEY_SID, context.API_KEY_SECRET);
  accessToken.identity = username
  
  const grant = new twilio.jwt.AccessToken.VideoGrant({
    room
  })

  accessToken.addGrant(grant)
  
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Origin', context.ALLOW_ORIGIN);
  response.setBody({
    token: accessToken.toJwt()
  })

  return callback(null, response);
}
