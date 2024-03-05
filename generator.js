const fs = require('fs');
const moment = require('moment');

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomWord = wordList => wordList[getRandomInt(0, wordList.length - 1)];

function generateNickname(config) {
  let nickname = '';
  const wordList = config.language === 'english' ? config.wordListEnglish : config.wordListPortuguese;

  for (let i = 0; i < config.numWords; i++) {
    nickname += getRandomWord(wordList);
    if (i !== config.numWords - 1) {
      nickname += config.separator;
    }
  }

  if (config.useSpecialChars) {
    for (let i = 0; i < config.numSpecialChars; i++) {
      nickname += getRandomSpecialChar();
    }
  }

  if (config.useNumbers) {
    for (let i = 0; i < config.numDigits; i++) {
      nickname += getRandomInt(0, 9);
    }
  }

  nickname = nickname.replace(/\s+/g, '');

  return nickname;
}

const config = JSON.parse(fs.readFileSync('files/config.json'));

const fileName = `files/generated/${moment().format('YYYY-MM-DD_HH-mm')}.txt`;
const stream = fs.createWriteStream(fileName);

for (let i = 0; i < config.numGenerated; i++) {
  const generatedNickname = generateNickname(config);
  stream.write(generatedNickname + '\n');
}

stream.end();
console.log(`File saved as ${fileName}`);