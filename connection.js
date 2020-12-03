const mysql = require("mysql");
var sqlcon = mysql.createConnection({
  host: "127.0.0.1",
  user: "sarim",
  password: "sarim",
  database: "sarim",
  multipleStatements: true,
});

sqlcon.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Connection failed" + JSON.stringify(err, undefined));
  }
});

module.exports = sqlcon;
