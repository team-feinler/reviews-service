const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CustomerReviews', { useNewUrlParser: true, useUnifiedTopology: true });

const conn = mongoose.connection;
//mongoose.connection.removeAllListeners('open');
conn.on('error', console.error.bind(console, 'connection error :'));
conn.once('open', function () {
  console.log('we are connected to mongo db..');
  console.log(`Our Current Database Name : ${conn.db.databaseName}`);

  //mongoose.conn.db.dropDatabase();
  //console.log(`${conn.db.databaseName} database dropped.`);

});







