const { nano } = require('./index.js');
const faker = require('faker');

const totalReviews = 100000000;
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
  for (let i = 1; i <= totalReviews; i++) {
    const review = {
      reviewId: i,
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
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
      productId: faker.random.number({ min: 1, max: 10000000 }),
      color: faker.commerce.color(),
      configuration: faker.lorem.words(),
      customerId: faker.random.number({ min: 1, max: 10000000 }),
      customerName: faker.name.findName(),
      customerCountry: faker.address.country(),
      profilePicUrl: 'http://placeimg.com/60/60/people',
      category: 'Amazon Devices',
      isBestSeller: faker.random.boolean(),
    }
    documents.push(review);
    if (documents.length === batchSize) {
      requests.push(db.bulk({ docs: documents }))
      documents = [];
      if (requests.length === simultaneousRequests) {
        await Promise.all(requests)
          .then(() => {
            requests = [];
            console.log('REVIEWS', Math.floor(i / totalReviews * 100), 'PERCENT COMPLETE');
          })
      }
    }
  }
  console.log('Reviews finished after', Date.now() - start, 'ms')
}

(async () => {
  await setupSeedDb()
  await generateReviews()
})();