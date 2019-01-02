function getOkMessagesArray() {
  return getMessagesArrayFromSheet(1);
}

function getWelcomeMessagesArray() {
  return getMessagesArrayFromSheet(2);
}

function getFaceEmojiArray() {
  return getMessagesArrayFromSheet(3);
}

function getGoToSleepMessageArray() {
  return getMessagesArrayFromSheet(4);
}

function getExtraPhraseMessageArray() {
  return getMessagesArrayFromSheet(5);
}

function getMessageFromArray(messagesArray) {
  var index = getRandomIndex(messagesArray.length);
  return messagesArray[index];
}

function getOkMessage() {
  return getMessageFromArray(getOkMessagesArray());
}

function getWelcomeMessage() {
  return getMessageFromArray(getWelcomeMessagesArray());
}

function getFaceEmoji() {
  return getMessageFromArray(getFaceEmojiArray());
}

function getGoToSleepMessage() {
  return getMessageFromArray(getGoToSleepMessageArray());
}

function getExtraPhraseMessage() {
  return getMessageFromArray(getExtraPhraseMessageArray());
}
