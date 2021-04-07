const faker = require('faker');

module.exports = {

  generateProductId: (context, ee, next) => {
    context.vars.productId = Math.floor(Math.random() * 1000000) + 9000000;
    return next();
  },

  generateWait: (context, ee, next) => {
    context.vars.wait = Math.floor(Math.random() * 20) + 3;
    return next();
  },

  generatePageCount: (context, ee, next) => {
    context.vars.pages = Math.floor(Math.random() * 5) + 1;
    return next();
  },

  generateProductReview: (requestParams, context, ee, next) => {
    requestParams.json = {
      title: faker.lorem.words(),
      description: faker.lorem.paragraph(),
      rating: faker.random.number({ min: 1, max: 5 }),
      isVerifiedPurchase: faker.random.boolean(),
      isHelpfulCount: faker.random.number(),
      reviewDate: `1991-07-20`,
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
      customerId: faker.random.number({ min: 1, max: 10000000 })
    };
    return next();
  }

};

