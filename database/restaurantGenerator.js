const Faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const stringify = require('csv-stringify');

const Seed = {
  foodWords: ['pot roast', 'chicken', 'sushi', 'marshmallows', 'pumpkin pie', 'wine'],
  tagWords: ['groups', 'kids', 'gluten free', 'vegan'],
  noiseLevels: ['Quiet', 'Average', 'Loud'],
  colors: ['#d86441', '#bb6acd', '#6c8ae4', '#df4e96'],
  boolean: [true, false],
  sentences: [Faker.lorem.sentences(),Faker.lorem.sentences(),Faker.lorem.sentences(),Faker.lorem.sentences(),Faker.lorem.sentences(),Faker.lorem.sentences()],
  words: [Faker.lorem.word(),Faker.lorem.word(),Faker.lorem.word(),Faker.lorem.word(),Faker.lorem.word(),Faker.lorem.word()],
  cities: [Faker.address.city(),Faker.address.city(),Faker.address.city(),Faker.address.city(),Faker.address.city(),Faker.address.city()],
  dates: [moment(Faker.date.recent()).format('YYYY-MM-DD'), moment(Faker.date.recent()).format('YYYY-MM-DD'), moment(Faker.date.recent()).format('YYYY-MM-DD'), moment(Faker.date.recent()).format('YYYY-MM-DD'), moment(Faker.date.recent()).format('YYYY-MM-DD'), moment(Faker.date.recent()).format('YYYY-MM-DD'), ],
  getRandomFoodWord() {
    return Seed.foodWords[Math.floor(Math.random() * Seed.foodWords.length)];
  },
  getRandomTagWord() {
    return Seed.tagWords[Math.floor(Math.random() * Seed.tagWords.length)];
  },
  getRandomNoiseLevel() {
    return Seed.noiseLevels[Math.floor(Math.random() * Seed.noiseLevels.length)];
  },
  getRandomColor() {
    return Seed.colors[Math.floor(Math.random() * Seed.colors.length)];
  },
  getRandomSentence() {
    return Seed.sentences[Math.floor(Math.random() * Seed.sentences.length)];
  },
  getRandomWord() {
    return Seed.words[Math.floor(Math.random() * Seed.words.length)];
  },
  getRandomCity() {
    return Seed.cities[Math.floor(Math.random() * Seed.cities.length)];
  },
  getRandomDate() {
    return Seed.dates[Math.floor(Math.random() * Seed.dates.length)];
  },
  getRandomBoolean() {
    return Seed.boolean[Math.floor(Math.random() * 2)];
  },
  lowProbabilityRandom() {
    return Math.random() > 0.8;
  },
  fixFloatPrecision(float) {
    let number = float;
    if (typeof float !== 'string') {
      number = float.toString();
    }
    number = number.split('.');
    if (number[1]) {
      if (number[1].slice(0, 1) === '0') {
        return number[0];
      }
      return `${number[0]}.${number[1].slice(0, 1)}`;
    }
    return number[0];
  },
};

function writeTenMillionTimes(writer) {
  let i = 10000000;

  write();
  function write() {
    let ok = true;
    do {
      i--;
      const restaurant = {};
      restaurant.id = i + 1;
      restaurant.name = Seed.getRandomWord();
      restaurant.location = Seed.getRandomCity().replace(/'/g, '');
      restaurant.noise = Seed.getRandomNoiseLevel();
      restaurant.averageoverall = Seed.fixFloatPrecision(Math.floor(Math.random() * 50) / 10);
      restaurant.averageservice = Seed.fixFloatPrecision(Math.floor(Math.random() * 50) / 10);
      restaurant.averageambience = Seed.fixFloatPrecision(Math.floor(Math.random() * 50) / 10);
      restaurant.averagefood = Seed.fixFloatPrecision(Math.floor(Math.random() * 50) / 10);
      restaurant.valuerating = Seed.fixFloatPrecision(Math.floor(Math.random() * 50) / 10);
      restaurant.recommendpercent = Math.floor(Math.random() * 100);
      restaurant.capacity = Math.floor(Math.random() * 16) + 8;
      if (i === 0) {
        stringify(restaurant, {header: true, columns: restaurant}, (err, data) => {
          if (err) {
            throw err;
          }
          writer.write(data);
        });
      } else {
        ok = stringify(restaurant, {header: true, columns: restaurant}, (err, data) => {
          if (err) {
            throw err;
          }
          writer.write(data);
        });
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
}

writeTenMillionTimes(fs.createWriteStream('restaurantData.csv', {flags: 'a'}));
