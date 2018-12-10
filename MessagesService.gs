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

function getFaceEmojiArray() {
  return [
    '😀',
    '😉',
    '😊',
    '😆',
    '😐',
    '🙄',
    '😕',
    '🙃',
    '🤣',
    '😅',
    '😎'
  ];
}

function getGoToSleepMessageArray() {
  return [
    'я ухожу, до завтра!',
    'а теперь спокойной ночи',
    'было вкусно, увидимся завтра',
    'пойду спать',
    'ещё увидимся? мне пора',
    'у меня есть ещё дела на сегодня, пока!',
    'чувствую себя сонновато...',
    'пожалуй, пойду посплю',
    'мне пора спать, и тебе приятных снов',
    'ух, какой день был сегодня! пора и отдохнуть',
    'кажется, я уже засыпаю...'
  ];
}

function getExtraPhraseMessageArray() {
  return [
    'вот что я хочу тебе сказать',
    'у меня есть много мыслей по поводу этого',
    'фраза дня',
    'мне был знак',
    'мне нужно было тебе это сказать',
    'надеюсь, тебе это понравится',
    'эти слова я помню до сих пор',
    'мне приснилось что-то странное',
    'возможно, это окажется тебе полезным',
    'одна из чудесных фраз, которые я помню, звучит так'
  ];
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
