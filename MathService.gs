// >=min, <max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// >=0, <max
function getRandomIndex(max) {
  return getRandomInt(0, max);
}
