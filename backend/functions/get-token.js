const twilio = require('twilio');

const response = new Twilio.Response();
response.appendHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
response.appendHeader('Content-Type', 'application/json');

exports.handler = async function(context, event, callback) {
  const { room, username } = event
  const accessToken = new twilio.jwt.AccessToken(context.ACCOUNT_SID, context.API_KEY_SID, context.API_KEY_SECRET);
  accessToken.identity = username
  
  const grant = new twilio.jwt.AccessToken.VideoGrant({
    room
  })

  accessToken.addGrant(grant)

  response.setBody({
    token: accessToken.toJwt()
  })

  return callback(null, response);
}
