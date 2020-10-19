const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const app = express();

const port = process.env.PORT ? process.env.PORT : 3005;

app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/calendars.routes")(app);
require("./routes/users.routes")(app);
require("./routes/events.routes")(app);
require("./routes/oauth2.routes")(app);

// const apiRoutes = require("./routes/apiRoutes");
// app.use("/api", apiRoutes);

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
