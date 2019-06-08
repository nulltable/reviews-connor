const Faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

const Seed = {
  sentences: [Faker.lorem.sentences(),Faker.lorem.sentences(),Faker.lorem.sentences(),Faker.lorem.sentences(),Faker.lorem.sentences(),Faker.lorem.sentences()],

  getRandomSentence() {
    return Seed.sentences[Math.floor(Math.random() * Seed.sentences.length)];
  },
  writeReports() {
    for (let i = 0; i < 10000; i++) {
      const report = {};
      report.id = i + 1;
      report.review = Math.floor(Math.random() * 100000000);
      report.text = Seed.getRandomSentence();
      writer.write(report);
    }
  },
};

const dataGenerator = () => {
  writer.pipe(fs.createWriteStream('reportData.csv'));
  Seed.writeReports();
  writer.end();
  console.log("Done Writing Reports");
}
dataGenerator();
