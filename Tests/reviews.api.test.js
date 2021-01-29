import "regenerator-runtime/runtime"; //required for it()
const app = require("../server/app");
const request = require("supertest");
const Reviews = require("../database-mongoose/reviews.model");
const ReviewsModel = Reviews.ReviewsModel;
const Service = require("../database-mongoose/reviews.service");
const SeedData = require("../database-mongoose/seeder");

describe("test the root path", () => {

  beforeAll(async () => {
    await ReviewsModel.remove({});
  });

  afterEach(async () => {
    await ReviewsModel.remove({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("it should response the GET method", async () => {
    return request(app)
      .get("/Reviews")
      .then(response => {
        expect(response.statusCode).toBe(200);

      });
  });

  test("/Reviews/getReviews/:productId : it should respond with an array of reviews, respond 200 for valid response ", async () => {
    var productId = 1000;
    var mockData = await SeedData.generateSeedData(1, 1);//load 1 review for 1 product
    await Service.insertSeedData(mockData);

    return request(app)
      .get(`/Reviews/getReviews/${productId}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toEqual(true);
        var insertedData = response.body;
        expect(insertedData[0].productId).toEqual(productId);
      });

  });

  test("/Reviews/getReviews/:productId : it should respond with an empty array of reviews, respond 400 for invalid product ID ", async () => {
    var invalidProductId = 50;
    var mockData = await SeedData.generateSeedData(1, 1);//load 1 review for 1 product
    await Service.insertSeedData(mockData);

    return request(app)
      .get(`/Reviews/getReviews/${invalidProductId}`)
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(Array.isArray(response.body)).toEqual(true);
        var insertedData = response.body;
        expect(insertedData[0]).toBeUndefined();
      });

  });


  test("/Reviews/getReviewSummary/:productId : it should respond with an object, respond 200 for valid response ", async () => {
    var productId = 1000;
    var mockData = await SeedData.generateSeedData(10, 1);//load 10 customer,  for 1 product
    await Service.insertSeedData(mockData);

    return request(app)
      .get(`/Reviews/getReviewSummary/${productId}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toEqual(false);
        expect(typeof (response.body)).toEqual('object');
        var insertedData = response.body;
        expect.objectContaining({
          averageRating: expect.any(String),
          totalRatings: expect.any(Number),
          fiveStar: expect.any(String),
          fourStar: expect.any(String),
          threeStar: expect.any(String),
          twoStar: expect.any(String),
          oneStar: expect.any(String)
        });
      });

  });

  test("/Reviews/getReviewExcerpts/:productId : it should respond with an array, respond 200 for valid response ", async () => {
    var productId = 1000;
    var mockData = await SeedData.generateSeedData(50, 1);//load 10 customer,  for 1 product
    await Service.insertSeedData(mockData);

    return request(app)
      .get(`/Reviews/getReviewExcerpts/${productId}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toEqual(true);
        var insertedData = response.body;
        expect(insertedData.length).toBeLessThanOrEqual(12);
      });

  });

  test("/Reviews/getReviewsByFeature/:productId : it should respond with an object, respond 200 for valid response ", async () => {
    var productId = 1000;
    var mockData = await SeedData.generateSeedData(10, 1);//load 10 customer,  for 1 product
    await Service.insertSeedData(mockData);

    return request(app)
      .get(`/Reviews/getReviewSummary/${productId}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toEqual(false);
        expect(typeof (response.body)).toEqual('object');
        var insertedData = response.body;
        expect.objectContaining({
          easeToUse: expect.any(String),
          voiceRecognition: expect.any(String),
          techSupport: expect.any(String),
          valueForMoney: expect.any(String),
          qualityOfMaterial: expect.any(String),
          batteryLife: expect.any(String)
        });
      });

  });



});

