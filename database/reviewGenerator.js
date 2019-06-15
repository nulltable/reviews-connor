const Faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const stringify = require('csv-stringify');

const Seed = {
  foodWords: ['pot roast', 'chicken', 'sushi', 'marshmallows', 'pumpkin pie', 'wine'],
  tagWords: ['groups', 'kids', 'gluten free', 'vegan'],
  boolean: [true, false],
  sentences: [Faker.lorem.sentences(),Faker.lorem.sentences(),Faker.lorem.sentences(),Faker.lorem.sentences(),Faker.lorem.sentences(),Faker.lorem.sentences()],
  cities: [Faker.address.city(),Faker.address.city(),Faker.address.city(),Faker.address.city(),Faker.address.city(),Faker.address.city()],
  dates: [moment(Faker.date.recent()).format('YYYY-MM-DD'), moment(Faker.date.recent()).format('YYYY-MM-DD'), moment(Faker.date.recent()).format('YYYY-MM-DD'), moment(Faker.date.recent()).format('YYYY-MM-DD'), moment(Faker.date.recent()).format('YYYY-MM-DD'), moment(Faker.date.recent()).format('YYYY-MM-DD'), ],

  getRandomFoodWord() {
    return Seed.foodWords[Math.floor(Math.random() * Seed.foodWords.length)];
  },
  getRandomTagWord() {
    return Seed.tagWords[Math.floor(Math.random() * Seed.tagWords.length)];
  },
  getRandomSentence() {
    return Seed.sentences[Math.floor(Math.random() * Seed.sentences.length)];
  },
  getRandomDate() {
    return Seed.dates[Math.floor(Math.random() * Seed.dates.length)];
  },
  getRandomBoolean() {
    return Seed.boolean[Math.floor(Math.random() * 2)];
  },
}

function writeOneHundredMillionTimes(writer) {
  let i = 100000000;

  write();
  function write() {
    let ok = true;
    do {
      i--;
      const review = {};
      review.id = i;
      review.restaurant = Math.floor(Math.random() * 10000000);
      review.diner = Math.floor(Math.random() * 50);
      review.text = Seed.getRandomSentence();
      if (Math.random() > 0.7) {
        review.text += ` ${Seed.getRandomSentence()}`;
      }
      review.date = Seed.getRandomDate();
      review.overall = Math.floor(Math.random() * 5);
      review.food = Math.floor(Math.random() * 5);
      review.service = Math.floor(Math.random() * 5);
      review.ambience = Math.floor(Math.random() * 5);
      review.wouldrecommend = Seed.getRandomBoolean();
      review.tags = '';
      for (let j = 0; j < 2; j++) {
        if (Math.random() > 0.8) {
          if (review.tags[0]) {
            review.tags += ',';
          }
          review.tags += Seed.getRandomFoodWord();
          if (Math.random() > 0.9) {
            review.tags += `,${Seed.getRandomTagWord()}`;
          }
        }
      }
      if (i === 0) {
        stringify(review, {header: true, columns: review}, (err, data) => {
          if (err) {
            throw err;
          }
          writer.write(data);
        });
      } else {
        ok = stringify(review, {header: true, columns: review}, (err, data) => {
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

writeOneHundredMillionTimes(fs.createWriteStream('reviewData.csv', {flags: 'a'}));
