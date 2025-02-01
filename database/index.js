const Sequelize = require("sequelize");

const connectionDatabase = require("../config/database");

const ShortUrl = require("../models/shorturl");

const models = [ShortUrl];

class Database {
  constructor() {}

  async initMain() {
    this.mainConnection = new Sequelize(connectionDatabase);
    models.forEach((model) => model.init(this.mainConnection));
    this.mainConnection
      .sync()
      .then(() => console.log("Database connected"))
      .catch((err) => console.error(err));
  }
}

module.exports = new Database();
