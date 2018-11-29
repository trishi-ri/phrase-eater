function getSheetGuest() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheets()[2];
}

function getSheetLog() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheets()[3];
}

function addLog(text, userFrom) {
  var sheetLog = getSheetLog();
  var textValue = text ? text : 'нет текста';
  var dateValue = new Date();
  var fromValue = userFrom ? 'id: ' + userFrom.id + ', first_name: ' + userFrom.first_name + ', username: ' +  userFrom.username : 'нет данных пользователя';
  sheetLog.appendRow([dateValue, textValue, fromValue]);
  text = 'новая строка лога: ' + dateValue + ' | ' + textValue + '|' + fromValue;
  Logger.log(text);
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
  Logger.log(itIsGuest);
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
    Logger.log(text);
  }
}