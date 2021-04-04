const faker = require('faker');
const { Client } = require('pg');
const client = new Client({
  database: 'sdc'
});

client
  .connect()
  .then(() => console.log('connected to Postgres'))
  .catch(err => console.error('connection error', err.stack))

const formatValue = (value) => {
  if (Array.isArray(value)) {
    return `ARRAY${JSON.stringify(value)}`
  } else {
    return JSON.stringify(value)
  }
}

exports.getReviewsByProductId = async (id) => {
  const query = `
    SELECT
      products.productId,
      products.color,
      products.configuration,
      products.isBestSeller,
      products.category,
      customers.customerId,
      customers.customerName,
      customers.customerCountry,
      customers.profilePicUrl,
      reviews.reviewId,
      reviews.title,
      reviews.description,
      reviews.rating,
      reviews.isVerifiedPurchase,
      reviews.isHelpfulCount,
      reviews.reviewDate,
      reviews.easeToUse,
      reviews.voiceRecognition,
      reviews.techSupport,
      reviews.valueForMoney,
      reviews.qualityOfMaterial,
      reviews.batteryLife,
      reviews.imageUrls
    FROM products
    INNER JOIN reviews ON products.productId = reviews.productId
    INNER JOIN customers ON reviews.customerId = customers.customerId
    WHERE products.productId = ${id};
  `;
  const response = await client.query(query);
  return response.rows;
};

exports.getReview = (id) => {
  const query = `SELECT * FROM reviews WHERE reviewId = ${id}`
  return client.query(query);
}

exports.createReview = (body) => {
  body.reviewId = faker.random.uuid();
  const keys = Object.keys(body)
  const columns = keys.join(',')
  const values = keys.map(key => formatValue(body[key])).join(',').replace(/\"/g,`'`);
  const query = `
    INSERT INTO reviews (${columns})
    VALUES (${values})
  `
  return client.query(query);
}

exports.updateReview = (id, data) => {
  const columns = Object.keys(data);
  const updates = columns.map(column => `${column} = ${formatValue(data[column])}`).join(', ').replace(/\"/g,`'`);
  const query = `
    UPDATE reviews
    SET ${updates}
    WHERE reviewId = ${id}
  `
  return client.query(query);
}

exports.deleteReview = (id) => {
  const query = `DELETE FROM reviews WHERE reviewId = ${id}`
  return client.query(query);
}

exports.getReviewSummary = async (id) => {
  const query = `SELECT rating FROM reviews WHERE productId = ${id}`
  const { rows } = await client.query(query);
  return {
    averageRating: rows.length ? (rows.reduce((acc, cur) => acc + cur.rating, 0) / rows.length).toFixed(2) : 0,
    totalRatings: rows.length,
    fiveStar: (rows.filter(row => row.rating === 5).length / rows.length * 100).toFixed(2).concat('%'),
    fourStar: (rows.filter(row => row.rating === 4).length / rows.length * 100).toFixed(2).concat('%'),
    threeStar: (rows.filter(row => row.rating === 3).length / rows.length * 100).toFixed(2).concat('%'),
    twoStar: (rows.filter(row => row.rating === 2).length / rows.length * 100).toFixed(2).concat('%'),
    oneStar: (rows.filter(row => row.rating === 1).length / rows.length * 100).toFixed(2).concat('%')
  };
}