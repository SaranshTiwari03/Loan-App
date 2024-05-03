require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose=require('mongoose');

const app = express();

mongoose.connect(process.env.DATABASE_URL);
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/api/user", require("./routes/user"));
app.use("/api/loan", require("./routes/loan"));


app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});

app.get('/', (req, res) => {
  res.send('Welcome to Mini-loan-App Server');
});

