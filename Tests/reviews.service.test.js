import 'regenerator-runtime/runtime';
const mongoose = require('mongoose');
const Reviews = require('../database-mongoose/reviews.model');
const db = require('../database-mongoose/reviews.service');
const SeedData = require('../database-mongoose/seeder');

const ReviewsModel = Reviews.ReviewsModel;
const MongoURI = 'mongodb://localhost/CustomerReviews_Test';

describe('Database interface', () => {

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost/CustomerReviews', { useNewUrlParser: true, useUnifiedTopology: true });
    await ReviewsModel.remove({});
  });

  afterEach(async () => {
    await ReviewsModel.remove({});
  });

  afterAll(async () => {
    await ReviewsModel.remove({});
    await mongoose.connection.close();
  });

  const reviewId = 1000;
  const mockReview = {
    reviewId,
    productId: 1005,
    color: 'black',
    configuration: 'Alexa auto sense temp 1000',
    isBestSeller: true,
    category: 'element.category',
    customerId: 1,
    customerName: 'element.customerName',
    cutomerCountry: 'USA',
    profilePicUrl: 'https://fec-customers-bucket.s3-us-west-1.amazonaws.com/profile1.jpg',
    title: 'element.title',
    description: 'element.description',
    rating: 4,
    isVerifiedPurchase: true,
    isHelpfulCount: 444,
    imageUrls: ['https://fec-reviews-bucket.s3-us-west-1.amazonaws.com/image49.jpg'],
    reviewDate: '2020-08-07T07:03:26.682Z',
    easeToUse: 4,
    voiceRecognition: 4,
    techSupport: 5,
    valueForMoney: 5,
    qualityOfMaterial: 5,
    batteryLife: 4
  };

  test('successfully creates a new review', async (done) => {

    const review = await db.createReview(mockReview);
    expect(review.configuration).toEqual(mockReview.configuration);
    done();

  });

  test('successfully retrieves an existing review', async (done) => {

    const review = await db.createReview(mockReview);
    const fetchedReview = await db.getReview(reviewId);
    expect(fetchedReview.configuration).toEqual(mockReview.configuration);
    done();

  });

  test('successfully updates an existing review', async (done) => {

    const review = await db.createReview(mockReview);
    const update = await db.updateReview(reviewId, { configuration: 'Alexa auto sense temp 1001' });
    const updatedReview = await db.getReview(reviewId);
    expect(update.nModified).toEqual(1);
    expect(updatedReview.configuration).toEqual('Alexa auto sense temp 1001');
    expect(updatedReview.configuration).not.toEqual(review.configuration);
    done();

  });

  test('successfully deletes an existing review', async (done) => {

    const review = await db.createReview(mockReview);
    const fetchedReview = await db.getReview(reviewId);
    expect(fetchedReview).toBeDefined()
    const remove = await db.deleteReview(reviewId);
    const deletedReview = await db.getReview(reviewId);
    expect(remove.deletedCount).toEqual(1);
    expect(deletedReview).not.toBeDefined();
    done();

  })

});
