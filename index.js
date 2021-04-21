const express = require("express");
const cors = require("cors");

const app = express();

// Configuración y Modelos BD
const db = require("./dbConfig");
require("./models/Post");
db.sync({ force: true })
  .then(() => console.log("DB Conectada"))
  .catch((error) => console.log(error));

app.use(express.json());

app.use(cors());

app.use("/posts", require("./routes/routePosts"));

app.listen(4000, () => {
  console.log("server arrancado");
});
