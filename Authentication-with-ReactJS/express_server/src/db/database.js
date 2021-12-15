const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "./src/db/db.sqlite" // imports the DB file

let db = new sqlite3.Database(DBSOURCE, (err) => {  // connecting to SQLite Database
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')
  }
});


module.exports = db