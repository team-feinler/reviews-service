const { writeFile } = require('fs/promises');
const path = require('path');
const { Client } = require('pg');
const client = new Client();
const faker = require('faker');
const totalProducts = 10000000;
const totalCustomers = 10000000;
const totalReviews = 100000000;
const batchSize = 25000;

const writeToDatabase = async (database, data) => {
  let filePath = path.join(__dirname + '/data.txt');
  await writeFile(filePath, data)
  return client.query(`COPY ${database} FROM '${filePath}'`);
}

const generateProducts = async () => {
  let data = '';
  for (let i = 1; i <= totalProducts; i++) {
    let productId = i;
    let color = faker.commerce.color();
    let configuration = faker.lorem.words();
    let isBestSeller = faker.random.boolean();
    let category = 'Amazon Devices';
    data += `${productId}\t'${color}'\t'${configuration}'\t${isBestSeller}\t'${category}'\n`
    if (i % batchSize === 0) {
      await writeToDatabase(`products`, data);
      data = '';
    }
  }
}

const generateCustomers = async () => {
  let data = '';
  for (let i = 1; i <= totalCustomers; i++) {
    let customerId = i;
    let customerName = faker.name.findName();
    customerName = customerName.replace(/\'/, '\'\'');
    let customerCountry = faker.address.country();
    customerCountry = customerCountry.replace(/\'/, '\'\'');
    let profilePicUrl = 'http://placeimg.com/60/60/people';
    data += `${customerId}\t'${customerName}'\t'${customerCountry}'\t'${profilePicUrl}'\n`
    if (i % batchSize === 0) {
      await writeToDatabase(`customers`, data);
      data = '';
    }
  }

}

const generateReviews = async () => {
  let data = '';
  let reviewsStart = Date.now();
  for (let i = 1; i <= totalReviews; i++) {
    let reviewId = faker.random.uuid();
    let title = faker.lorem.words();
    let description = faker.lorem.paragraph();
    let rating = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    let isVerifiedPurchase = faker.random.boolean();
    let isHelpfulCount = faker.random.number();
    let reviewDate = `1991-07-20`;
    let easeToUse = faker.random.number({ min: 1, max: 5 });
    let voiceRecognition = faker.random.number({ min: 1, max: 5 });
    let techSupport = faker.random.number({ min: 1, max: 5 });
    let valueForMoney = faker.random.number({ min: 1, max: 5 });
    let qualityOfMaterial = faker.random.number({ min: 1, max: 5 });
    let batteryLife = faker.random.number({ min: 1, max: 5 });
    let imageUrls = [
      '\'http://placeimg.com/480/640/tech\'',
      '\'http://placeimg.com/480/640/tech\'',
      '\'http://placeimg.com/480/640/tech\'',
      '\'http://placeimg.com/480/640/tech\'',
      '\'http://placeimg.com/480/640/tech\'',
    ]
    let productId = faker.random.number({ min: 1, max: totalProducts });
    let customerId = faker.random.number({ min: 1, max: totalCustomers });
    data += `'${reviewId}'\t'${title}'\t'${description}'\t${rating}\t${isVerifiedPurchase}\t${isHelpfulCount}\t'${reviewDate}'\t${easeToUse}\t${voiceRecognition}\t${techSupport}\t${valueForMoney}\t${qualityOfMaterial}\t${batteryLife}\t{${imageUrls}}\t${productId}\t${customerId}\n`
    if (i % batchSize === 0) {
      await writeToDatabase(`reviews`, data);
      data = '';
      if (i % 1000000 === 0) { console.log('Expect reviews to finish after', Date.now() - reviewsStart, 'ms')}
    }
  }
  await client.query(`
    ALTER TABLE reviews ADD PRIMARY KEY ("reviewId");
  `)
  await client.query(`
    ALTER TABLE products ADD PRIMARY KEY ("productId");
  `)
  await client.query(`
    ALTER TABLE customers ADD PRIMARY KEY ("customerId");
  `)
  await client.query(`
    ALTER TABLE reviews ADD FOREIGN KEY ("productId") REFERENCES products ("productId");
  `)
  await client.query(`
    ALTER TABLE reviews ADD FOREIGN KEY ("customerId") REFERENCES customers ("customerId");
  `)
  await client.query(`
    CREATE INDEX ON reviews ("productId");
  `)
}

(async () => {
  let start = Date.now();
  await client.connect();
  await generateProducts();
  console.log('Products finished after', Date.now() - start, 'ms')
  await generateCustomers();
  console.log('Customers finished after', Date.now() - start, 'ms')
  await generateReviews();
  console.log('Reviews finished after', Date.now() - start, 'ms')
  client.end();
})();
