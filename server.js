const express = require("express");
const multer = require("multer");
const path = require("path");

const PORT = process.env.PORT || 8080;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const uploads = multer({ storage });
const app = express();

app.use(express.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("form");
});

app.post("/uploads", uploads.single("image"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.status(201).send(`file: ${req.file.filename} was uploaded successfully`);
});

app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
