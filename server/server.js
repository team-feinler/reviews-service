const express = require('express');
let app = express();
let port = 4006;
const bodyParser = require('body-parser');

app.use(express.static('client/dist'));
app.use(express.static('public'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function () {
  console.log(`listening at http://localhost:${port}`);
});