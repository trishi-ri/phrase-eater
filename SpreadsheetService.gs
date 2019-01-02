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

function getSheetMessages() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheets()[4];
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

function getStatText(row) {
  var sheetStats = getSheetStats();
  var name = sheetStats.getRange("A"+row).getValue();
  var cur = sheetStats.getRange("B"+row).getValue();
  var max = sheetStats.getRange("C"+row).getValue();
  return name + ': ' + cur + '/' + max;
}

function getStatLevelText() {
  return getStatText(2);
}

function getStatSatietyText() {
  return getStatText(3);
}

function getStatExperienceText() {
  return getStatText(4);
}

function getStatPhrasesInMemoryText() {
  var sheetStats = getSheetStats();
  var name = sheetStats.getRange("A5").getValue();
  var cur = sheetStats.getRange("B5").getValue();
  return name + ': ' + cur;
}

function getStatsText() {
  var sheetStats = getSheetStats();
  var data = sheetStats.getDataRange().getValues();
  var text = '';
  text += getStatSatietyText() + '\n';
  text += getStatExperienceText() + '\n';
  text += getStatLevelText() + '\n';
  text += getStatPhrasesInMemoryText();
  return text;
}

function canAddPhrase() {
  var sheetStats = getSheetStats();
  var curSatiety = sheetStats.getRange("B3").getValue();
  var maxSatiety = sheetStats.getRange("C3").getValue();
  return curSatiety < maxSatiety;
}

function addPhrase(text, userFrom) {
  var sheetPhrases = getSheetPhrases();
  var textValue = text ? text : 'нет текста';
  var dateValue = new Date();
  var fromValue = userFrom ? 'id: ' + userFrom.id + ', first_name: ' + userFrom.first_name + ', username: ' +  userFrom.username : 'нет данных пользователя';
  sheetPhrases.appendRow([dateValue, textValue, fromValue]);
  upStatSatiety();
}

function upStatSatiety() {
  var sheetStats = getSheetStats();
  var cellSatiety = sheetStats.getRange("B3");
  var curSatiety = cellSatiety.getValue();
  var maxSatiety = sheetStats.getRange("C3").getValue();
  if (curSatiety < maxSatiety) {
    cellSatiety.setValue(curSatiety + 1);
  }
}

function getRandomTextFromMemory() {
  var sheetPhrases = getSheetPhrases();
  var data = sheetPhrases.getDataRange().getValues();
  var index = getRandomIndex(data.length);
  var text = data[index][1];
  return text;
}

function upStatExperience() {
  resetStatSatiety();
  var wasUp = false;
  var sheetStats = getSheetStats();
  var cellExperience = sheetStats.getRange("B4");
  var curExperience = cellExperience.getValue();
  var maxExperience = sheetStats.getRange("C4").getValue();
  if (curExperience < maxExperience) {
    cellExperience.setValue(curExperience + 1);
    wasUp = true;
  }
  return wasUp;
}

function upStatLevel() {
  resetStatExperience();
  var wasUp = false;
  var sheetStats = getSheetStats();
  var cellLevel = sheetStats.getRange("B2");
  var curLevel = cellLevel.getValue();
  var maxLevel = sheetStats.getRange("C2").getValue();
  if (curLevel < maxLevel) {
    cellLevel.setValue(curLevel + 1);
    wasUp = true;
  }
  return wasUp;
}


function resetStatSatiety() {
  var sheetStats = getSheetStats();
  var cellSatiety = sheetStats.getRange("B3");
  var wasReset = cellSatiety.getValue() > 0;
  cellSatiety.setValue(0);
  return wasReset;
}

function resetStatExperience() {
  var sheetStats = getSheetStats();
  var cellExperience = sheetStats.getRange("B4");
  var wasReset = cellExperience.getValue() > 0;
  cellExperience.setValue(0);
  return wasReset;
}

function resetStatLevel() {
  var sheetStats = getSheetStats();
  var cellLevel = sheetStats.getRange("B2");
  var wasReset = cellLevel.getValue() > 0;
  cellLevel.setValue(0);
  return wasReset;
}

function resetStats() {
  return resetStatSatiety() || resetStatExperience() || resetStatLevel();
}

function phrasesExist() {
  var sheetStats = getSheetStats();
  var cell = sheetStats.getRange("B5");
  return cell.getValue() > 0;
}

function downStatSatiety() {
  var sheetStats = getSheetStats();
  var cellSatiety = sheetStats.getRange("B3");
  var curSatiety = cellSatiety.getValue();
  if (curSatiety > 0) {
    cellSatiety.setValue(curSatiety - 1);
  }
}

function lostMemory() {
  var sheetPhrases = getSheetPhrases();
  var rowsLength = sheetPhrases.getDataRange().getValues().length;
  var rowNumber = getRandomIndex(rowsLength) + 1;
  sheetPhrases.deleteRow(rowNumber);
  downStatSatiety();
}

function statUpdate() {
  var text = '';
  if (!canAddPhrase()) {
    if (upStatExperience()) {
      text += 'повышение опыта!' + '\n';
      text += getStatExperienceText();
    } else {
      if (upStatLevel()) {
        text += 'повышение уровня!' + '\n';
        text += getStatLevelText();
      }
    }
  } else if (phrasesExist()) {
    lostMemory();
    text += 'одна из фраз была забыта' + '\n';
    text += getStatPhrasesInMemoryText();
  } else {
    if (resetStats()) {
      text += 'нечего забывать, поэтому все статы были сброшены' + '\n';
      text += getStatsText();
    }
  }
  return text;
}

function getMessagesArrayFromSheet(column) {
  var sheetMessages = getSheetMessages();
  var numRows = sheetMessages.getMaxRows();
  var values = sheetMessages.getSheetValues(2, column, numRows, column);
  var messages = values.filter(firstValue).map(firstValue);
  return messages;
}
