module.exports = {
    HOST: process.env.POSTGRESQL_DB_HOST,
    USER: process.env.POSTGRESQL_DB_USER,
    PASSWORD: process.env.POSTGRESQL_DB_PASSWORD,
    DB: process.env.POSTGRESQL_DB,
    dialect: "postgres",
  };