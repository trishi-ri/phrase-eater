function doPost(e) {
  var contents = JSON.parse(e.postData.contents);
  try {
    actions(contents);
  } catch (err) {
    sendMessage(contents.message.chat.id, err.message);
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
  } else if (canAddPhrase()) {
    addPhrase(msg.text, msg.from);
    if (canAddPhrase()) {
      sendMessage(msg.chat.id, getOkMessage());
    } else {
      sendMessage(msg.chat.id, getGoToSleepMessage());
    }
  } else {
    // nothing? or slepping sounds? ;)
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
  switch (cmd) {
    case '/start':
      text = getStartText();
      break;
    case '/help':
      text = getHelpText();
      break;
    case '/stats':
      text = getStatsText();
      break;
    default:
      if (cmd.charAt(0) === '/') text = 'Неизвестная команда ' + cmd;
  }

  if (text == '') return;
  sendMessage(msg.chat.id, text);
}

function getStartText() {
  var text = '';
  text += getWelcomeMessage() + '\n';
  text += 'эта команда пока ничего не делает ' + getFaceEmoji();
  return text;
}

function getHelpText() {
  var text = '';
  text += 'Не знаешь что делать со мной? ' + getFaceEmoji() + '\n';
  text += 'Вот несколько действий, которые могут дать какой-то результат сейчас:' + '\n';
  text += '* напиши мне что угодно, и я отвечу случайной репликой из не очень большого количества вариантов;' + '\n';
  text += '* дождись утра (где-то между восьми и девятью), и я пришлю тебе сообщение с приветствием и своим статусом;' + '\n';
  text += '* можешь отправить мне одну из доступных команд.';
  return text;
}

function getStatsText() {
  return getStats();
}

function getNotifyText() {
  return '<b>' + getWelcomeMessage() + '</b>' + '\n' + getStatsText();
}

function catchGuest(msg) {
  var itIsGuest = false;
  var userFrom = msg.from;
  var userId = userFrom.id;
  if (getUserIds().indexOf(''+userId) == -1) {
    itIsGuest = true;
    if (!findGuest(userId)) {
      sendMessage(msg.chat.id, 'извините, я с незнакомцами не разговариваю');
      addGuest(userFrom);
    }
  }
  return itIsGuest;
}

function sendNotify(e) {
  var chatList = getUserIds();
  for (var i = 0; i < chatList.length; i++) {
    sendMessage(chatList[i], getNotifyText());
  }
}
