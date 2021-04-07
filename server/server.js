const app = require("./app");
const PORT = process.env.PORT || 4006;
const { client } = require('../database-postgres/dbHelpers');

client.connect()
  .then(() => console.log('Connected to postgres'))
  .catch((err) => console.error(err));

app.listen(PORT, function () {
  console.log(`listening at PORT ${PORT}`);
});

