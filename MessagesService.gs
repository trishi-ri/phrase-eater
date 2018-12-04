function getOkMessagesArray() {
  return [
    'угу',
    'ням',
    'спасибо',
    'окей',
    'записано',
    'добавлено в память',
    'отлично',
    'ага',
    'хорошо',
    'ок'
  ];
}

function getWelcomeMessagesArray() {
  return [
    'привет!',
    'хай',
    'сяп',
    'пум-пурум',
    'уведомление!',
    'вот!',
    'у меня всё хорошо)',
    'давно не виделись))',
    'доброго времени суток',
    'погода сегодня ужасная...',
    'погода сегодня прекрасная!'
  ];
}

function getMessageFromArray(messagesArray) {
  var index = (Math.random() * 10) | 0;
  return messagesArray[index];
}

function getOkMessage() {
  return getMessageFromArray(getOkMessagesArray());
}

function getWelcomeMessage() {
  return getMessageFromArray(getWelcomeMessagesArray());
}
