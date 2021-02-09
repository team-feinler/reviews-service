const seeder = require('./seeder.js');
const ReviewService = require("../database-mongoose/reviews.service");


//run below code to seed the Database with test data
var testData = seeder.generateSeedData(11, 100);//11 customers, 100 products
ReviewService.insertSeedData(testData);