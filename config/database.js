require("dotenv").config();

module.exports = {
  dialect: "postgres",
  logging: false,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};
