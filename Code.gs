function doPost(e) {
  var contents = JSON.parse(e.postData.contents); // получение содержимого отправленного боту собщения
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
  if (msg.hasOwnProperty('entities')) {
    for (var i = 0; i < msg.entities.length; i++) {
      actionForMessageWithEntity(msg, msg.entities[i].type);
    }
  }
}

function actionForMessageWithEntity(msg, entityType) {
  if (entityType == 'bot_command') {
    commandReaction(msg);
  }
}

function commandReaction(msg) {
  var cmd = contents.message.text.split(' ')[0];
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
      text = getOkMessage();
  }

  if (text == '') return;
  params.text = text;
  sendMessage(params);
  return params;
}

function getInstructions() {
  var text = '';
  text += 'Этот бот-монстрик будет в течении дня насыщаться фразами, а утром скажет одну из понравившихся. =)' + '\n';
  text += 'Пока что он может только записывать в свой лог сообщения и отвечает однообразно.';
  return text;
}

function getOkMessage() {
  var okMessages = ['угу', 'ням', 'спасибо', 'окей', 'записано', 'запомнил', 'отлично', 'ага', 'хорошо', 'ок'];
  var index = (Math.random() * 10) | 0;
  return okMessages[index];
}
