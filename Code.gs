function doPost(e) {
  var contents = JSON.parse(e.postData.contents);
  try {
    actions(contents);
  } catch (err) {
    var params = {
      chat_id: contents.message.chat.id,
      text: err.message
    };
    sendMessage(params);
  }
  return HtmlService.createHtmlOutput();
}

function actions(contents) {
  if (contents.hasOwnProperty('message')) {
    actionForMessage(contents.message);
  }
}

function actionForMessage(msg) {
  if (catchGuest(msg)) {
    return;
  }
  addLog(msg.text, msg.from);
  if (msg.hasOwnProperty('entities')) {
    for (var i = 0; i < msg.entities.length; i++) {
      actionForMessageWithEntity(msg, msg.entities[i].type);
    }
  } else {
    var params = {};
    params.chat_id = msg.chat.id;
    params.text = getOkMessage();
    sendMessage(params);
  }
}

function actionForMessageWithEntity(msg, entityType) {
  if (entityType == 'bot_command') {
    commandReaction(msg);
  }
}

function commandReaction(msg) {
  var cmd = msg.text.split(' ')[0];
  var text = '';
  var params = {};
  params.chat_id = msg.chat.id;
  switch (cmd) {
    case '/start':
      text = getInstructions();
      break;
    case '/help':
      text = getInstructions();
      break;
    default:
      params.reply_to_message_id = msg.message_id;
      if (cmd.charAt(0) === '/') text = 'Неизвестная команда ' + cmd;
  }

  if (text == '') return;
  params.text = text;
  sendMessage(params);
}

function getInstructions() {
  var text = '';
  text += 'Этот бот-монстрик будет в течении дня насыщаться фразами, а утром скажет одну из понравившихся. =)' + '\n';
  text += 'Пока что он может только:' + '\n';
  text += '* записывать в свой лог сообщения и отвечает однообразно;' + '\n';
  text += '* различать своих и незнакомцев, отказываться от общения с незнакомцами;' + '\n';
  text += '* отправлять приветствие каждый день утром часов в восемь-девять.';
  return text;
}

function catchGuest(msg) {
  var itIsGuest = false;
  var userFrom = msg.from;
  var userId = userFrom.id;
  if (getUserIds().indexOf(''+userId) == -1) {
    itIsGuest = true;
    if (!findGuest(userId)) {
      var params = {};
      params.chat_id = msg.chat.id;
      params.text = 'извините, я с незнакомцами не разговариваю';
      sendMessage(params);
      addGuest(userFrom);
    }
  }
  return itIsGuest;
}

function sendNotify(e) {
  var chatList = getUserIds();
  //  var text = '<b>' + getWelcomeMessage() + '</b>'
  for (var i = 0; i < chatList.length; i++) {
    var params = {
      'chat_id': chatList[i],
      'parse_mode': 'HTML',
      'text': '<b>' + getWelcomeMessage() + '</b>'
    };
    sendMessage(params);
  }
}
