function addLog(text, userFrom) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetLog = ss.getSheets()[3];
  var textValue = text ? text : 'нет текста';
  var dateValue = new Date();
  var fromValue = userFrom ? 'id: ' + userFrom.id + ', first_name: ' + userFrom.first_name + ', username: ' +  userFrom.username : 'нет данных пользователя';
  sheetLog.appendRow([dateValue, textValue, fromValue]);
  text = 'новая строка лога: ' + dateValue + ' | ' + textValue + '|' + fromValue;
  Logger.log(text);
  return text;
}
