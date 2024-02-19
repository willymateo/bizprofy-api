const dbConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  dialectOptions: {
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
  logging: false,
};

module.exports = dbConfig;
