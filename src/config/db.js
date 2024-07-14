const baseConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_DOCKER_PORT,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "postgres",
};

const dbConfig = {
  development: {
    ...baseConfig,
    logging: console.log,
  },
  production: {
    ...baseConfig,
    logging: false,
  },
};

module.exports = dbConfig;
