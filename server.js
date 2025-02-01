const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ShortUrl = require("./models/shorturl");

mongoose
  .connect("mongodb://127.0.0.1/urlShortener")
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro de conexão:", err));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  try {
    const urls = await ShortUrl.find();
    res.render("index", { shorturls: urls });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno do servidor");
  }
});

app.post("/shorturl", async (req, res) => {
  await ShortUrl.create({ full: req.body.full });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
