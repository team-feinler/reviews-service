var faker = require('faker');
let dbModel = require('./index.js');

// var random = faker.name.findName();
// console.log(random);

var count = 0;
var allTestData = [];
for (var j = 1; j < 11; j++) { //number of customers
  var profilePicUrl = 'https://fec-customers-bucket.s3-us-west-1.amazonaws.com/profile' + (j) + '.jpg';


  var custId = j;
  var custName = faker.name.findName();
  var custCountry = faker.address.country();
  var custProfile = profilePicUrl;

  //max = 5, min = 1
  let randomRating = Math.floor(Math.random() * (5 - 1 + 1) + 1);

  //https://fec-reviews-bucket.s3-us-west-1.amazonaws.com/image1.jpg
  //max= 10;
  let imageUrl = 'https://fec-reviews-bucket.s3-us-west-1.amazonaws.com/image';
  let randomImageCount = Math.floor(Math.random() * Math.floor(10));
  let randomProdImages = [...Array(randomImageCount)].map(() => {
    var min1 = 1;
    var max1 = 50;
    var randomImageNum = Math.floor(Math.random() * (max1 - min1 + 1) + min1);
    return imageUrl + randomImageNum + '.jpg';
  });

  for (var i = 0; i < 100; i++) { //100 products
    count++;
    var min = 1;
    var max = 10;
    let randomIteration = Math.floor(Math.random() * (max - min + 1) + min);
    // product properties
    var prodId = 1000 + i;
    var prodColor = faker.commerce.color();
    var prodConfig = faker.lorem.words();
    var prodCategory = 'Amazon Devices';

    let testData =
    {
      reviewId: count,
      productId: prodId,
      color: prodColor,
      configuration: prodConfig,
      //isBestSeller: true,
      category: prodCategory,
      customerId: custId,
      customerName: custName,
      cutomerCountry: custCountry,
      profilePicUrl: custProfile,
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      rating: randomRating,
      isVerifiedPurchase: faker.random.boolean(),
      isHelpfulCount: faker.random.number(),
      imageUrlId: randomProdImages,
      reviewDate: faker.date.past(),
      easeToUse: Math.floor(Math.random() * (5 - 1 + 1) + 1),
      voiceRecognition: Math.floor(Math.random() * (5 - 1 + 1) + 1),
      techSupport: Math.floor(Math.random() * (5 - 1 + 1) + 1),
      valueForMoney: Math.floor(Math.random() * (5 - 1 + 1) + 1),
      qualityOfMaterial: Math.floor(Math.random() * (5 - 1 + 1) + 1),
      batteryLife: Math.floor(Math.random() * (5 - 1 + 1) + 1)
    };

    // console.log(testData);
    // console.log("==============================");
    // console.log('Review Id: ', testData.reviewId);
    // console.log('Product Id: ', testData.productId);
    // console.log('Color Id: ', testData.color);
    // console.log('Customer Id: ', testData.customerId);
    // console.log('Customer Name : ', testData.customerName);
    allTestData.push(testData);

  }
}
//console.log('allTestData : ', allTestData)
dbModel.insertSeedData(allTestData);



