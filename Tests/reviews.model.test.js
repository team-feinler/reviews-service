import "regenerator-runtime/runtime";
const { readFile } = require('fs/promises');
const path = require('path');
const { Client } = require('pg')
const { client, ...db } = require('../database-postgres/dbHelpers')

const setupClient = new Client({
  database: 'postgres'
});

describe("Reviews model test", () => {

  beforeAll(async () => {
    try {
      await setupClient.connect()
      await setupClient.query('DROP DATABASE IF EXISTS "test"')
      await setupClient.query('CREATE DATABASE "test"')
      await setupClient.end()
      await client.connect()
      const sql = path.resolve(__dirname, '../database-postgres/tableSetup.sql')
      const query = await readFile(sql, 'utf-8')
      const taco = await client.query(query);
    } catch (err) {
      console.error(err)
    }
  });

  afterEach(async () => {
    Promise.all([
      client.query('TRUNCATE TABLE reviews'),
      client.query('TRUNCATE TABLE products'),
      client.query('TRUNCATE TABLE customers')
    ])
  });

  afterAll(async () => {
    await client.end();
  });

  describe("Review operations:", () => {

    it("saves a review", async (done) => {
      const mockReview = {
        productId: 100200,
        customerId: 1,
        title: 'echo speaker',
        description: 'element.description',
        rating: 4,
        isVerifiedPurchase: true,
        isHelpfulCount: 444,
        imageUrls: ['https://fec-reviews-bucket.s3-us-west-1.amazonaws.com/image49.jpg'],
        reviewDate: '2020-08-07',
        easeToUse: 4,
        voiceRecognition: 4,
        techSupport: 5,
        valueForMoney: 5,
        qualityOfMaterial: 5,
        batteryLife: 4
      };
      const { rowCount: before } = await client.query(`SELECT * FROM reviews`)
      const added = await db.createReview(mockReview)
      const { rowCount: after } = await client.query(`SELECT * FROM reviews`)
      expect(before).toEqual(0);
      expect(after).toEqual(1);
      done();

    });
  });

  xdescribe("updates review", () => {
    it("updates a review", async (done) => {
      const mockReview = {
        productId: 100201,
        customerId: 1,
        title: 'echo speaker',
        description: 'element.description',
        rating: 4,
        isVerifiedPurchase: true,
        isHelpfulCount: 444,
        imageUrls: ['https://fec-reviews-bucket.s3-us-west-1.amazonaws.com/image49.jpg'],
        reviewDate: '2020-08-07',
        easeToUse: 4,
        voiceRecognition: 4,
        techSupport: 5,
        valueForMoney: 5,
        qualityOfMaterial: 5,
        batteryLife: 4
      };
      const update = {
        description: 'new description'
      }
      await db.createReview(mockReview)
      const review = await db.getReviewsByProductId(100201)[0];
      expect(review.description).toEqual('element.description');
      const updated = await db.updateReview(review.reviewId, update)
      const updatedReview = await db.getReviewsByProductId(100201)[0];
      expect(updatedReview.description).toEqual('new description');
      done();

    });

  });
});
