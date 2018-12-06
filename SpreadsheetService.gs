function getSheetGuest() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheets()[2];
}

function getSheetLog() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheets()[3];
}

function getSheetStats() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheets()[0];
}

function getSheetPhrases() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheets()[1];
}

function addLog(text, userFrom) {
  var sheetLog = getSheetLog();
  var textValue = text ? text : 'нет текста';
  var dateValue = new Date();
  var fromValue = userFrom ? 'id: ' + userFrom.id + ', first_name: ' + userFrom.first_name + ', username: ' +  userFrom.username : 'нет данных пользователя';
  sheetLog.appendRow([dateValue, textValue, fromValue]);
  text = 'новая строка лога: ' + dateValue + ' | ' + textValue + '|' + fromValue;
  return text;
}

function findGuest(userId) {
  var itIsGuest = false;
  var sheetGuests = getSheetGuest();
  var numRows = sheetGuests.getMaxRows();
  var values = sheetGuests.getSheetValues(2, 1, numRows, 1);
  var existedGuests = values.filter(firstValue).map(firstValue);
  for (var i in existedGuests) {
    if (existedGuests[i] == userId) {
      itIsGuest = true;
    }
  }
  return itIsGuest;
}

function firstValue(value) {
  return value[0];
}

function addGuest(userFrom) {
  if (userFrom && userFrom.id && userFrom.first_name && userFrom.username) {
    var sheetGuests = getSheetGuest();
    sheetGuests.appendRow([userFrom.id, userFrom.first_name, userFrom.username]);
    text = 'новая строка гостя: ' + userFrom.id + ' | ' + userFrom.first_name + '|' + userFrom.username;
  }
}

function getStats() {
  var sheetStats = getSheetStats();
  var data = sheetStats.getDataRange().getValues();
  var text = '';
  for (var i = 1; i < 4; i++) {
    text += '\n' + data[i][0] + ': ' + data[i][1] + '/' + data[i][2];
  }
  text += '\n' + data[4][0] + ': ' + data[4][1];
  return text;
}

function canAddPhrase() {
  var sheetStats = getSheetStats();
  var data = sheetStats.getDataRange().getValues();
  return data[2][1] < data[2][2];
}

function addPhrase(text, userFrom) {
  var sheetPhrases = getSheetPhrases();
  var textValue = text ? text : 'нет текста';
  var dateValue = new Date();
  var fromValue = userFrom ? 'id: ' + userFrom.id + ', first_name: ' + userFrom.first_name + ', username: ' +  userFrom.username : 'нет данных пользователя';
  sheetPhrases.appendRow([dateValue, textValue, fromValue]);
  text = 'новая строка в памяти: ' + dateValue + ' | ' + textValue + '|' + fromValue;
  return text;
}
