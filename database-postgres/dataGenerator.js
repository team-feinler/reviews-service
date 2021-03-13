const { Client } = require('pg');
const client = new Client({
  database: 'sdc'
});
const faker = require('faker');

const totalProducts = 10000000;
const totalCustomers = 10000000;
const totalReviews = 100000000;
const batchSize = 100000;

const generateProducts = async () => {
  let values = [];
  for (let i = 1; i <= totalProducts; i++) {
    let productId = i;
    let color = faker.commerce.color();
    let configuration = faker.lorem.words();
    let isBestSeller = faker.random.boolean();
    let category = 'Amazon Devices';
    values.push(`(${productId}, '${color}', '${configuration}', ${isBestSeller}, '${category}')`)
    if (values.length === batchSize) {
      console.log('PRODUCTS', Math.floor(i / totalProducts * 100), 'PERCENT COMPLETE')
      const combinedValues = values.join(', ');
      let query = `
        INSERT INTO products (productId, color, configuration, isBestSeller, category)
        VALUES ${combinedValues}
      `
      const res = await client.query(query);
      values = [];
    }
  }
  await client.query(`
    ALTER TABLE products ADD PRIMARY KEY (productId);
  `)
}

const generateCustomers = async () => {
  let values = [];
  for (let i = 1; i <= totalCustomers; i++) {
    let customerId = i;
    let customerName = faker.name.findName();
    customerName = customerName.replace(/\'/, '\'\'');
    let customerCountry = faker.address.country();
    customerCountry = customerCountry.replace(/\'/, '\'\'');
    let profilePicUrl = 'http://placeimg.com/60/60/people';
    values.push(`(${customerId}, '${customerName}', '${customerCountry}', '${profilePicUrl}')`)
    if (values.length === batchSize) {
      console.log('CUSTOMERS', Math.floor(i / totalCustomers * 100), 'PERCENT COMPLETE')
      const combinedValues = values.join(', ');
      let query = `
      INSERT INTO customers (customerId, customerName, customerCountry, profilePicUrl)
      VALUES ${combinedValues}
      `
      const res = await client.query(query);
      values = [];
    }
  }
  await client.query(`
    ALTER TABLE customers ADD PRIMARY KEY (customerId);
  `)
}

const generateReviews = async () => {
  let values = [];
  for (let i = 1; i <= totalReviews; i++) {
    let reviewId = i;
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
    values.push(`
      (
        ${reviewId},
        '${title}',
        '${description}',
        ${rating},
        ${isVerifiedPurchase},
        ${isHelpfulCount},
        '${reviewDate}',
        ${easeToUse},
        ${voiceRecognition},
        ${techSupport},
        ${valueForMoney},
        ${qualityOfMaterial},
        ${batteryLife},
        ARRAY [${imageUrls}],
        ${productId},
        ${customerId}
      )
    `)
    if (values.length === batchSize) {
      console.log('REVIEWS', Math.floor(i / totalReviews * 100), 'PERCENT COMPLETE')
      const combinedValues = values.join(', ');
      let query = `
      INSERT INTO reviews (reviewId, title, description, rating, isVerifiedPurchase, isHelpfulCount, reviewDate, easeToUse, voiceRecognition, techSupport, valueForMoney, qualityOfMaterial, batteryLife, imageUrls, productId, customerId)
      VALUES ${combinedValues}
      `
      const res = await client.query(query);
      values = [];
    }
  }
  await client.query(`
    ALTER TABLE reviews ADD PRIMARY KEY (reviewId);
  `)
  await client.query(`
    ALTER TABLE reviews ADD FOREIGN KEY (productId) REFERENCES products (productId);
  `)
  await client.query(`
    ALTER TABLE reviews ADD FOREIGN KEY (customerId) REFERENCES customers (customerId);
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
