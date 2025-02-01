require("dotenv").config();

const isDevelopment = process.env.NODE_ENV !== "production";

if (!isDevelopment && process.env.DATABASE_URL) {
  module.exports = {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    use_env_variable: "DATABASE_URL",
  };
} else {
  module.exports = {
    dialect: "postgres",
    logging: true,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  };
}
