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

function getUrlForWarningAboutLongMessage(params) {
  params.text = 'это сообщение было слишком длинным (' + params.text.length + ')';
  return api('sendMessage') + '?' + params.serialize();
}

function sendMessageFromParams(params) {
  addLog(params.text);
  var url = api('sendMessage') + '?' + params.serialize();
  if (url.length >= 2048) {
    url = getUrlForWarningAboutLongMessage(params);
  }
  var uf = UrlFetchApp.fetch(url, {
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
