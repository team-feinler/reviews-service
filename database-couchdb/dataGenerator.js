const { nano } = require('./index.js');
const faker = require('faker');

const totalProducts = 10000000;
const batchSize = 1250;
const simultaneousRequests = 5;

const setupSeedDb = async () => {
  try {
    await nano.db.destroy('sdc')
  } catch (err) {
    console.log('Database does not exist')
  }
  const create = await nano.db.create('sdc');
}

const generateReviews = async () => {
  let start = Date.now();
  const db = await nano.db.use('sdc');
  let documents = [];
  let requests = [];
  for (let i = 1; i <= totalProducts; i++) {
    const product = {
      productId: i,
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      color: faker.commerce.color(),
      configuration: faker.lorem.words(),
      category: 'Amazon Devices',
      isBestSeller: faker.random.boolean(),
      reviews: []
    }
    let totalReviews = Math.floor(Math.random() * 10)
    for (let j = 0; j < totalReviews; j++) {
      let review = {
        reviewId: faker.random.uuid(),
        rating: Math.floor(Math.random() * (5 - 1 + 1) + 1),
        isVerifiedPurchase: faker.random.boolean(),
        isHelpfulCount: faker.random.number(),
        reviewDate: faker.date.past(),
        easeToUse: faker.random.number({ min: 1, max: 5 }),
        voiceRecognition: faker.random.number({ min: 1, max: 5 }),
        techSupport: faker.random.number({ min: 1, max: 5 }),
        valueForMoney: faker.random.number({ min: 1, max: 5 }),
        qualityOfMaterial: faker.random.number({ min: 1, max: 5 }),
        batteryLife: faker.random.number({ min: 1, max: 5 }),
        imageUrls: [
          'http://placeimg.com/480/640/tech',
          'http://placeimg.com/480/640/tech',
          'http://placeimg.com/480/640/tech',
          'http://placeimg.com/480/640/tech',
          'http://placeimg.com/480/640/tech',
        ],
        customerId: faker.random.number({ min: 1, max: 10000000 }),
        customerName: faker.name.findName(),
        customerCountry: faker.address.country(),
        profilePicUrl: 'http://placeimg.com/60/60/people',
      }
      product.reviews.push(review)
    }
    documents.push(product);
    if (documents.length === batchSize) {
      requests.push(db.bulk({ docs: documents }))
      documents = [];
      if (requests.length === simultaneousRequests) {
        await Promise.all(requests)
          .then(() => {
            requests = [];
            console.log('REVIEWS', Math.floor(i / totalProducts * 100), 'PERCENT COMPLETE');
          })
      }
    }
  }
  const indexDef = {
    index: { fields: ['productId'] },
    name: 'productId_index',
    type: 'json'
  };
  const response = await db.createIndex(indexDef)
  console.log('Reviews finished after', Date.now() - start, 'ms')
}

(async () => {
  await setupSeedDb()
  await generateReviews()
})();