const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  database: "rap_phim",
  user: "root",
  password: "123456",
});

module.exports = pool.promise();
