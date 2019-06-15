var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "MySQLbau5!",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    prompt();

});

function productSales() {
    var joinStatement = "SELECT b.department_id, a.department_name, SUM(a.product_sales) AS product_sales, (SUM(a.product_sales) - over_head_costs) AS total_profit, b.over_head_costs FROM (SELECT * FROM products) a INNER JOIN (SELECT * FROM departments) b ON (a.department_name = b.department_name) GROUP BY a.department_name;";
    connection.query(joinStatement, function (err, res) {
        if (err) throw err;
        console.table(res);

        connection.end();

    });
}

function deptQuery(){
    inquirer.prompt([
        {
            name: "name",
            message: "What is the name of your new Department?",
        },
        {
            name: "cost",
            type: "number",
            message: "What is the total Overhead Cost for this Department?",
        },
    ]).then(function (answers) {
        console.log(answers.name, answers.cost)
        newDept(answers.name, answers.cost)
    });
};

function newDept(name, cost) {
    connection.query("INSERT INTO departments SET ?", 
    {
        department_name: name,
        over_head_costs: cost
    }, 
    function (err, res) {
        if (err) throw err;
        connection.end();

    });
}

function prompt() {
    inquirer.prompt([
        {
            name: "option",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Product Sales by Department", 
            "Create New Department"]
        }
    ]).then(function (answers) {
        console.log(answers.option);
        switch (answers.option) {
            case "View Product Sales by Department":
                productSales();
                break;
            case "Create New Department":
                deptQuery();
                break;
            default:
                console.log("something went wrong")
        }
    });
};
