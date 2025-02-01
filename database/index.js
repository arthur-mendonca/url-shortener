const Sequelize = require("sequelize");

const connectionDatabase = require("../config/database");

const ShortUrl = require("../models/shorturl");

const models = [ShortUrl];

class Database {
  constructor() {}

  async initMain() {
    if (process.env.DATABASE_URL)
      this.mainConnection = new Sequelize(
        process.env.DATABASE_URL,
        connectionDatabase
      );
    else {
      this.mainConnection = new Sequelize(connectionDatabase);
    }

    models.forEach((model) => model.init(this.mainConnection));

    try {
      await this.mainConnection.sync();
      console.log("Database connected");
    } catch (error) {
      console.error("Database connection error: ", error);
    }
  }
}

module.exports = new Database();
