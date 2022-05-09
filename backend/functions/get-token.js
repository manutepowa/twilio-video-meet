const twilio = require('twilio');


exports.handler = async function(context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', context.ALLOW_ORIGIN);
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.appendHeader('Content-Type', 'application/json');
  
  const { room, username } = event
  
  const client = new twilio(context.ACCOUNT_SID, context.AUTH_TOKEN);
  const conversation = await client.conversations.services(context.CHAT_SERVICE_SID).conversations(context.CONVERSATION_SID).fetch();
  const participants = await client.conversations.conversations(conversation.sid).participants.list();
  const partipantExists = participants.find(participant => participant.identity === username)

  if (!partipantExists) await client.conversations.conversations(conversation.sid).participants.create({ identity: username });
  
  
  const accessToken = new twilio.jwt.AccessToken(context.ACCOUNT_SID, context.API_KEY_SID, context.API_KEY_SECRET);
  accessToken.identity = username
  
  const grant = new twilio.jwt.AccessToken.VideoGrant({
    room
  })
  
  const chatGrant = new twilio.jwt.AccessToken.ChatGrant({
    serviceSid: context.CHAT_SERVICE_SID
  })

  accessToken.addGrant(grant)
  accessToken.addGrant(chatGrant)

  response.setBody({
    token: accessToken.toJwt(),
    conversation_sid: conversation.sid
  })

  return callback(null, response);
}
