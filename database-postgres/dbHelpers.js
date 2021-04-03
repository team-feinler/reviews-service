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