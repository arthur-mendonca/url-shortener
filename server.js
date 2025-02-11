const express = require("express");
const path = require("path");
const app = express();
const QRCode = require("qrcode");
const database = require("./database/index");
const ShortUrl = require("./models/shorturl");

database.initMain();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    const urls = await ShortUrl.findAll();
    res.render("index", { shorturls: urls });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno do servidor");
  }
});

app.post("/shorturl", async (req, res) => {
  try {
    await ShortUrl.create({ full: req.body.full });
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(400).send("Erro ao criar URL curta: " + err.message);
  }
});

app.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({
      where: { short: req.params.shortUrl },
    });

    if (!shortUrl) return res.sendStatus(404);

    await shortUrl.increment("clicks");
    res.redirect(shortUrl.full);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno do servidor");
  }
});

app.get("/qrcode/:shortUrl", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({
      where: { short: req.params.shortUrl },
    });

    if (!shortUrl) return res.sendStatus(404);

    const url = `${req.protocol}://${req.get("host")}/${shortUrl.short}`;
    QRCode.toDataURL(url, (err, src) => {
      if (err) res.send("Erro ao gerar QR Code");
      res.render("qrcode", { src });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro interno do servidor");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
