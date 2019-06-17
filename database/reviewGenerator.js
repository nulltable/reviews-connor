const Faker = require('faker');
const moment = require('moment');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

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
  writeReviews() {
    // update id numbers by batch
    for (let i = 80000000; i < 100000000; i++) {
      if (i % 100000 === 0) {
        console.log(i);
      }
      const review = {};
      review.id = i + 1;
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
      writer.write(review);
    }
  },
};

// Change i to 1-5 while generating 100m records
const dataGenerator = () => {
  writer.pipe(fs.createWriteStream('reviewData5.csv', {flags: 'a'}));
  Seed.writeReviews();
  writer.end();
  console.log("Done Writing Reviews");
}
dataGenerator();