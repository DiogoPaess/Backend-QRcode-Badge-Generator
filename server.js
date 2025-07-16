const express = require("express");
const cors = require("cors");
const badgeRoutes = require("./routes/badgeRoutes");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());

app.use(
  express.static(
    path.join(__dirname, "../frontend-qrcode-badge-generator/dist")
  )
);

app.use("/api/badge", badgeRoutes);

app.get("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend-qrcode-badge-generator/dist/index.html")
  );
});

mongoose
  .connect("mongodb://localhost:27017/qrcode-badge")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Error ao conectar ao MongoDb", err));
