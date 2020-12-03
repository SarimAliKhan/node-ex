const express = require("express");
const bodyParser = require("body-parser");
const sqlcon = require("./connection");
const e = require("express");
const { response } = require("express");
var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Express server is running on port : 3000");
});

//Get all employees
app.get("/employee", (req, res) => {
  sqlcon.query(`SELECT * FROM employee`, (err, rslt, fields) => {
    if (!err) {
      res.send(rslt);
    } else {
      console.log(err);
    }
  });
});

//Get a employee with id :
app.get("/employee/:id", (req, res) => {
  sqlcon.query(
    `SELECT * FROM employee WHERE EmpID = ?`,
    [req.params.id],
    (err, rslt, fields) => {
      if (!err) {
        res.send(rslt);
      } else {
        console.log(err);
      }
    }
  );
});

//Delete an employee with id :
app.delete("/employee/:id", (req, res) => {
  sqlcon.query(
    `DELETE FROM employee WHERE EmpID = ?`,
    [req.params.id],
    (err, rslt, fields) => {
      if (!err) {
        res.send("Deleted successfully");
      } else {
        console.log(err);
      }
    }
  );
});

//Insert an employees
app.post("/employee", (req, res) => {
  let emp = req.body;
  var sql =
    "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?;SET @Email = ?;SET @Password = ?;\
     CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary,@Email,@Password);";
  sqlcon.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary, emp.Email, emp.Password],
    (err, rslt, fields) => {
      if (!err) {
        rslt.forEach((element) => {
          if (element.constructor == Array) {
            res.send("Inserted employee id is : " + element[0].EmpID);
          }
        });
      } else {
        console.log(err);
      }
    }
  );
});

//Update an employees
app.put("/employee", (req, res) => {
  let emp = req.body;
  var sql =
    "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?;SET @Email = ?;SET @Password = ?;\
       CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary,@Email,@Password);";
  sqlcon.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary, emp.Email, emp.Password],
    (err, rslt, fields) => {
      if (!err) {
        res.send("Updated successfully");
      } else {
        console.log(err);
      }
    }
  );
});

//Login an employee
app.post("/employee/login", (req, res) => {
  let emp = req.body;
  let array = [];
  var sql = `Select * from employee where Email = ? and Password = ?`;
  sqlcon.query(sql, [emp.Email, emp.Password], (err, rslt, fields) => {
    if (!rslt.length < 1 || rslt == undefined) {
      if (rslt[0].Password == emp.Password) {
        res.send("Login succesfully");
      }
    } else {
      res.send("Password or Email is incorrect");
    }
  });
});
