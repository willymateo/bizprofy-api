const baseConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_DOCKER_PORT,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "postgres",
  timezone: "+00:00",
  pool: {
    acquire: 30000, // 30 seconds
    idle: 10000, // 10 seconds
    evict: 1000, // 1 second
    max: 10,
    min: 0,
  },
  dialectOptions: {
    keepAlive: true,
  },
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
