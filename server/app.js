const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const db = require('../database-mongoose/reviews.service');
const db = require('../database-postgres/dbHelpers');
const cors = require('cors');

app.use(cors());
app.use(express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/../public/dist'));
app.use(express.static(__dirname + '/../client'));
app.use('/:id', express.static(__dirname + '/../public/dist'));
app.use('/:id', express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/Reviews/getReviews/:productId', (req, res) => {

  let prodId = req.params; //{id: "5"}
  //console.log('getReviews :', prodId);
  db.getReviewsByProductId(parseInt(prodId.productId))
    .then(results => {
      if (results.length > 0) {
        //console.log('results :', results);
        res.status(200).send(results);
      } else {
        var reviews = [];
        res.status(404).send(reviews);

      }

    })
    .catch(err => console.log('err: ', err));
});

app.get('/Reviews/getReviewSummary/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const results = await db.getReviewSummary(parseInt(productId))
    if (results) {
      res.status(200).send(results);
    } else {
      var reviewSummary = [];
      res.status(404).send(reviewSummary);
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
});

// to test using postman: /Reviews/getReviewSummary/1001
app.post('/Reviews/getReviewSummary/:productId', (req, res) => {
  let prodId = req.params; //{id: "5"}
  // console.log('review summary post called :', prodId);
  // console.log('body: ', req.body);
  // console.log('params:', req.params);
  db.getReviewSummary(parseInt(prodId.productId))
    .then(results => {
      //console.log(results);
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
  //console.log('review feature :', prodId);
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
  // console.log('review excepts post called')
  // console.log('body: ', req.body);
  // console.log('params:', req.params);
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

//filter reviews based on phrase provided
app.get('/Reviews/searchReviews', (req, res) => {

  let productId = req.query.productId;
  let searchString = req.query.searchText;
  db.getSearchResults(productId, searchString)
    .then(results => {
      if (results) {
        res.status(200).send(results);
      } else {
        res.status(404).send([]);
      }
    })
    .catch(err => console.log('err :', err));

});

//incrementHelpfulCount
app.post('/Reviews/incrementHelpfulCount/:reviewId', (req, res) => {
  //console.log('req params: ', req.params.reviewId);
  db.incrementHelpfulCount(parseInt(req.params.reviewId))
    .then(results => {
      if (results) {
        res.status(200).send(results);
      } else {
        res.status(404).send('Issue found in incrementHelpfulCount');
      }
    })

})

//************/ Single Review CRUD Endpoints /************//

app.get('/review/:reviewId', async (req, res) => {
  try {
    const { rows } = await db.getReview(req.params.reviewId);
    if (rows.length) {
      res.status(200).send(rows[0]);
    } else {
      res.status(404).json({ error: 'No review exists by this id.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/review', async (req, res) => {
  try {
    const result = await db.createReview(req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/review/:reviewId', async (req, res) => {
  try {
    const result = await db.updateReview(req.params.reviewId, req.body);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/review/:reviewId', async (req, res) => {
  try {
    const { rowCount } = await db.deleteReview(req.params.reviewId);
    if (rowCount > 0) {
      res.status(200).send('Successfully deleted review');
    } else {
      res.status(404).json({ error: 'No review exists by this id.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//************/ Multi Review CRUD Endpoint /************//

app.get('/reviews/:productId', async (req, res) => {
  try {
    const result = await db.getReviewsByProductId(req.params.productId);
    res.send(result)
  } catch (err) {
    res.send(err)
  }
})

module.exports = app;