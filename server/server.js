const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const db = require('../database-mongoose/reviews.service');
let port = 4006;

app.use(express.static('client/dist'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/Reviews', (req, res) => {
  res.send('API post');

});

app.get('/Reviews', (req, res) => {
  res.send('API get');

});

app.get('/Reviews/getReviews/:productId', (req, res) => {
  let prodId = req.params; //{id: "5"}
  db.getReviews(parseInt(prodId.productId))
    .then(results => res.send(results))
    .catch(err => console.log('err: ', err));
});

app.get('/Reviews/getReviewSummary/:productId', (req, res) => {
  let prodId = req.params; //{id: "5"}
  db.getReviewSummary(parseInt(prodId.productId))
    .then(results => {
      res.send(results)
    }
    )
    .catch(err => console.log('err: ', err));
});

app.get('/Reviews/getReviewsByFeature/:productId', (req, res) => {
  let prodId = req.params; //{id: "5"}

  db.getReviewsByFeature(parseInt(prodId.productId))
    .then(results => {
      res.send(results);
    })
    .catch(err => console.log('err: ', err));
});

app.get('/Reviews/getReviewExcerpts/:productId', (req, res) => {
  let prodId = req.params; //{id: "5"}
  db.getReviewExcerpts(parseInt(prodId.productId))
    .then(results => res.send(results))
    .catch(err => console.log('err: ', err));
});

app.listen(port, function () {
  console.log(`listening at http://localhost:${port}`);
});