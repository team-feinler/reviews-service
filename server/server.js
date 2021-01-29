const app = require("./app");
let port = 4006;

app.listen(port, function () {
  console.log(`listening at http://localhost:${port}`);
});

