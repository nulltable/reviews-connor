const Faker = require('faker');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

const Seed = {
  colors: ['#d86441', '#bb6acd', '#6c8ae4', '#df4e96'],

  getRandomColor() {
    return Seed.colors[Math.floor(Math.random() * Seed.colors.length)];
  },
  lowProbabilityRandom() {
    return Math.random() > 0.8;
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
