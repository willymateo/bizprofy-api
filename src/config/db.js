const baseConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "postgres",
  logging: true,
};

const dbConfig = {
  development: {
    ...baseConfig,
    logging: true,
  },
  production: {
    ...baseConfig,
    logging: false,
  },
};

module.exports = dbConfig;
