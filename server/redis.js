const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

module.exports.redis = client;

module.exports.getFromCache = async (req, res, next) => {
  const { productId } = req.params;
  client.get(productId, (err, data) => {
    if (err) { throw err; }
    if (data !== null) {
      res.status(200).send(JSON.parse(data))
    } else {
      next();
    }
  });
};