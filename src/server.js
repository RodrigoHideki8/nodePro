const express = require("express");
const router = require("./interfaces/routes/routes");
const app = express();
app.use("/api", router);
app.listen(3000, () => {
    require("../src/infrastructure/databases/sequelize");

  console.log("Server is running in port 3000");
});
