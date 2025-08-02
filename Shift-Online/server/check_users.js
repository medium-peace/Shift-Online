// check_users.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./shift-online.db');

db.all("SELECT * FROM users", [], (err, rows) => {
  if (err) {
    throw err;
  }
  console.log("Users table:");
  rows.forEach((row) => {
    console.log(row);
  });
  db.close();
});
