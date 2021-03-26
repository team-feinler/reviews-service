const { Client } = require('pg');
const client = new Client({
  database: 'sdc'
});

client
  .connect()
  .then(() => console.log('connected to Postgres'))
  .catch(err => console.error('connection error', err.stack))

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
  return response;
};