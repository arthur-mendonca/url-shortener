const { Model, DataTypes } = require("sequelize");
const shortid = require("shortid");

const isValidUrl = (url) => {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(url);
};

class ShortUrl extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        full: {
          type: DataTypes.STRING(2048),
          allowNull: false,
          validate: {
            notNull: {
              msg: "URL completa é obrigatória",
            },
            isValidUrl: (value) => {
              if (!isValidUrl(value)) {
                throw new Error(`${value} não é uma URL válida!`);
              }
            },
          },
        },
        short: {
          type: DataTypes.STRING(10),
          allowNull: false,
          unique: true,
          defaultValue: () => shortid.generate(),
        },
        clicks: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "ShortUrl",
        tableName: "short_urls",
      }
    );
  }
}

module.exports = ShortUrl;
