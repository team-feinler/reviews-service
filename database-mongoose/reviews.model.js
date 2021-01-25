const mongoose = require("mongoose");
let ReviewsSchema = mongoose.Schema({
  reviewId: Number,
  productId: Number,
  color: String,
  configuration: String,
  isBestSeller: Boolean,
  category: String,
  customerId: Number,
  customerName: String,
  customerCountry: String,
  profilePicUrl: String,
  title: String,
  description: String,
  rating: Number,
  isVerifiedPurchase: Boolean,
  isHelpfulCount: Number,//updated
  imageUrls: Array,
  reviewDate: Date,
  easeToUse: Number,
  voiceRecognition: Number,
  techSupport: Number,
  valueForMoney: Number,
  qualityOfMaterial: Number,
  batteryLife: Number

});

const ReviewsModel = mongoose.model('Reviews', ReviewsSchema);
module.exports.ReviewsModel = ReviewsModel;