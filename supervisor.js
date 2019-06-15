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

    connection.end();
});

function productSales() {
    connection.query("SELECT price, product_name, product_sales FROM products WHERE ?",
    {
        item_id: item,
    },
    function (err, res) {
        if (err) throw err;
    });
}


function prompt() {
    inquirer.prompt([
        {
            name: "option",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function (answers) {
        console.log(answers.option);
        switch (answers.option) {
            case "View Product Sales by Department":
                // productSales();
                break;
            case "Create New Department":
                // newDept();
                break;
            default:
                console.log("something went wrong")
        }
    });
};
