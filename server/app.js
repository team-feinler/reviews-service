const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const db = require('../database-mongoose/reviews.service');

app.use(express.static('public'));
//app.use(express.static('client/dist'));
app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/Reviews', (req, res) => {
//   res.send('API post');

// });

// app.get('/Reviews', (req, res) => {
//   res.status(200).send('API get Reviews');

// });

app.get('/Reviews/getReviews/:productId', (req, res) => {

  let prodId = req.params; //{id: "5"}
  console.log('getReviews :', prodId);
  db.getReviews(parseInt(prodId.productId))
    .then(results => {
      if (results.length > 0) {
        console.log('results :', results);
        res.status(200).send(results);
      } else {
        var reviews = [];
        res.status(404).send(reviews);

      }

    })
    .catch(err => console.log('err: ', err));
});

app.get('/Reviews/getReviewSummary/:productId', (req, res) => {
  let prodId = req.params; //{id: "5"}
  console.log('review summary post called :', prodId);
  console.log('body: ', req.body);
  console.log('params:', req.params);
  db.getReviewSummary(parseInt(prodId.productId))
    .then(results => {
      console.log(results);
      if (results) {
        res.status(200).send(results);
      } else {
        var reviewSummary = [];
        res.status(404).send(reviewSummary);

      }
    })
    .catch(err => console.log('err: ', err));
});

// to test using postman: http://localhost:4006/Reviews/getReviewSummary/1001
app.post('/Reviews/getReviewSummary/:productId', (req, res) => {
  let prodId = req.params; //{id: "5"}
  console.log('review summary post called :', prodId);
  console.log('body: ', req.body);
  console.log('params:', req.params);
  db.getReviewSummary(parseInt(prodId.productId))
    .then(results => {
      console.log(results);
      if (results) {
        res.status(200).send(results);
      } else {
        var reviewSummary = [];
        res.status(404).send(results);

      }
    })
    .catch(err => console.log('err: ', err));
});

app.get('/Reviews/getReviewsByFeature/:productId', (req, res) => {
  let prodId = req.params; //{id: "5"}
  console.log('review feature :', prodId);
  db.getReviewsByFeature(parseInt(prodId.productId))
    .then(results => {
      if (results) {
        res.status(200).send(results);
      } else {
        var reviewsByFeature = [];
        res.status(404).send(reviewsByFeature);

      }
    })
    .catch(err => console.log('err: ', err));
});

app.get('/Reviews/getReviewExcerpts/:productId', (req, res) => {
  let prodId = req.params; //{id: "5"}
  db.getReviewExcerpts(parseInt(prodId.productId))
    .then(results => {
      if (results) {
        res.status(200).send(results);
      } else {
        var excerpts = [];
        res.status(404).send(excerpts);

      }
    })
    .catch(err => console.log('err: ', err));
});

app.post('/Reviews/getReviewExcerpts/:productId', (req, res) => {
  console.log('review excepts post called')
  console.log('body: ', req.body);
  console.log('params:', req.params);
  let prodId = req.params; //{id: "5"}
  db.getReviewExcerpts(parseInt(prodId.productId))
    .then(results => {
      if (results) {
        res.status(200).send(results);
      } else {
        var excerpts = [];
        res.status(404).send(excerpts);

      }
    })
    .catch(err => console.log('err: ', err));
});

// app.listen(port, function () {
//   console.log(`listening at http://localhost:${port}`);
// });

module.exports = app;