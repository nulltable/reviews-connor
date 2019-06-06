const Faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

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
  writeDiners() {
    for (let i = 0; i < 50; i++) {
      const diner = {};
      diner.firstname = Faker.name.firstName().replace(/'/g, '');
      diner.lastname = Faker.name.lastName().replace(/'/g, '');
      diner.city = Faker.address.city().replace(/'/g, '');
      diner.totalreviews = Faker.random.number({ min: 0, max: 25 });
      diner.avatarcolor = Seed.getRandomColor();
      diner.isVIP = Seed.lowProbabilityRandom();
      writer.write(diner);
    }
  },
};

const dataGenerator = () => {
  writer.pipe(fs.createWriteStream('dinerData.csv'));
  Seed.writeDiners();
  writer.end();
  console.log("Done Writing Diners");
}
dataGenerator();
