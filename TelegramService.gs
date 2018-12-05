function sendMessage(chatId, message) {
  var params = {
    'chat_id': chatId,
    'parse_mode': 'HTML',
    'text': message
  };
  sendMessageFromParams(params);
}

function api(METHOD_NAME) {
  var path = 'https://api.telegram.org/bot' + getApiKey() + '/' + METHOD_NAME;
  return path;
}

function sendMessageFromParams(params) {
  addLog(params.text);
  var uf = UrlFetchApp.fetch(api('sendMessage') + '?' + params.serialize(), {
    muteHttpExceptions: true
  });
}

Object.prototype.serialize = function() {
  var str = [];
  for (var p in this)
    if (this.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(this[p]));
    }
  return str.join("&");
}
