/** Database setup for jobly. */


const { Client } = require("pg");
const { DB_URI } = require("./config");

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///jobly-test";
} else {
  DB_URI = "postgresql:///jobly";
}

const db = new Client({
  connectionString: DB_URI
});

db.connect();


module.exports = db;
