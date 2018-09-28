const fs = require('fs');
const faker = require('faker');

(function genArtist() {
    for (var i = 0; i < 10; i ++) {
      generateArtist();
    }
}());

const generateArtist = () => new Promise ((resolve, reject) => {
  let artists ='';
  for (var i = 0; i < 1000000; i ++) {
    artists += `${faker.name.findName()}, ${faker.random.number(10000)}, https://s3.amazonaws.com/spotifyphotos/${i%39+1}.jpg, ${faker.company.bs()}\n`
  }
  resolve(fs.appendFileSync('./database/artistsAll2.csv', artists));
}); 
