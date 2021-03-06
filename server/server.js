const app = require("./app");
const conn = require('../database-mongoose/database');
let port = 4006;

app.listen(port, function () {
  console.log(`listening at port ${port}`);
});

