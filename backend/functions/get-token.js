const twilio = require('twilio');

async function getChatServiceSid(client, chatId) {
  const conversations = await client.conversations.conversations.list();
  const existsChatId = conversations.find(conversation => conversation.friendlyName === chatId);
  const conversation = existsChatId
    ? await client.conversations.conversations(existsChatId.sid).fetch()
    : await client.conversations.conversations.create({
      friendlyName: chatId
    });
  
  return conversation;
}

exports.handler = async function(context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', context.ALLOW_ORIGIN);
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.appendHeader('Content-Type', 'application/json');
  
  const { room, username } = event
  
  const client = new twilio(context.ACCOUNT_SID, context.AUTH_TOKEN);
  
  const conversation = await getChatServiceSid(client, room); 
  // const conversation = await client.conversations.services(context.CHAT_SERVICE_SID).conversations(chat_service_sid).fetch();
  
  // check participant and create if not exists
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
