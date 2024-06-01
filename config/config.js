module.exports = {
  development: {
    url: process.env.DB_CONNECTION_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
