const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CustomerReviews', { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;
//mongoose.connection.removeAllListeners('open');
//conn.on('error', console.error.bind(console, 'connection error :'));
conn.once('open', function () {
  console.log('we are connected to mongo db..');
  console.log(`Our Current Database Name : ${conn.db.databaseName}`);

  //mongoose.conn.db.dropDatabase();
  //console.log(`${conn.db.databaseName} database dropped.`);

});

//define schema
// let ReviewsSchema = mongoose.Schema({
//   reviewId: Number,
//   productId: Number,
//   color: String,
//   configuration: String,
//   isBestSeller: Boolean,
//   category: String,
//   customerId: Number,
//   customerName: String,
//   cutomerCountry: String,
//   profilePicUrl: String,
//   title: String,
//   description: String,
//   rating: String,
//   isVerifiedPurchase: Boolean,
//   isHelpfulCount: Number,//updated
//   imageUrlId: Array,
//   reviewDate: Date,
//   easeToUse: Number,
//   voiceRecognition: Number,
//   techSupport: Number,
//   valueForMoney: Number,
//   qualityOfMaterial: Number,
//   batteryLife: Number

// });

// const ReviewsModel = mongoose.model('Reviews', ReviewsSchema);
//delete model to remove data
// ReviewsModel.remove({}, function (err) {
//   console.log('collection removed')
// });

// let insertSeedData = (arrayOfObjects) => {
//   arrayOfObjects.forEach(element => {
//     let reviewDocument = new ReviewsModel({
//       reviewId: element.reviewId,
//       productId: element.productId,
//       color: element.color,
//       configuration: element.configuration,
//       isBestSeller: element.isBestSeller,
//       category: element.category,
//       customerId: element.customerId,
//       customerName: element.customerName,
//       cutomerCountry: element.cutomerCountry,
//       profilePicUrl: element.profilePicUrl,
//       title: element.title,
//       description: element.description,
//       rating: element.rating,
//       isVerifiedPurchase: element.isVerifiedPurchase,
//       isHelpfulCount: element.isHelpfulCount,
//       imageUrlId: element.imageUrlId,
//       reviewDate: element.reviewDate,
//       easeToUse: element.easeToUse,
//       voiceRecognition: element.voiceRecognition,
//       techSupport: element.techSupport,
//       valueForMoney: element.valueForMoney,
//       qualityOfMaterial: element.qualityOfMaterial,
//       batteryLife: element.batteryLife

//     });
//     reviewDocument.save(function (err, doc) {
//       if (err) {
//         console.log(err);
//         return err;
//       }
//       console.log('Document inserted: ', element.reviewId, element.configuration);
//       return ('insertSeedData');

//     });

//   });


// }

// module.exports.insertSeedData = insertSeedData;
//module.exports.ReviewsModel = ReviewsModel;







