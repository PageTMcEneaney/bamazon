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

var inventory = [];
var quantity = [];

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    prompt();
});

function products() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res)
        // prompt(products, quantity);
        connection.end();

    });
    // console.log(products);
};

function lowInventory() {
    connection.query("SELECT * FROM products WHERE quantity BETWEEN 0 AND 5",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            // prompt(products, quantity);
            connection.end();

        });
    // console.log(products);
};
function addInventory() {
    connection.query("SELECT product_name, quantity FROM products",
        function (err, res) {
            if (err) throw err;

            for (var i = 0; i < res.length; i++) {
                inventory.push(res[i].product_name);
                quantity.push(res[i].quantity);

            }

            // inventory.push(res)
            inventoryPrompt(inventory, quantity)
        });

};

function inventoryProducts(item, quant) {
    var currentQuant;
    connection.query("SELECT quantity FROM products WHERE ?", { product_name: item },
        function (err, res) {
            if (err) throw err;
            currentQuant = res[0].quantity;

            connection.query("UPDATE products SET ? WHERE ?",
                [{
                    quantity: currentQuant + quant
                },
                {
                    product_name: item
                }],
                function (err, res) {
                    if (err) throw err;

                    console.log("\nQuantity updated for Item: " + item + "\nNew Quantity: " + (currentQuant + quant));
                    connection.end();

                });
        });

};

function inventoryPrompt(inventory) {
    inquirer.prompt([
        {
            name: "item",
            type: "list",
            message: "What product would you like to add items to?",
            choices: inventory
        },
        {
            name: "quant",
            type: "number",
            message: "How many would you like to add?",
            validate: function (input) {
                // Declare function as asynchronous, and save the done callback
                var done = this.async();

                // Do async stuff
                setTimeout(function () {
                    if (typeof input !== 'number') {
                        // Pass the return value in the done callback
                        done('You need to provide a number');
                        console.log('You need to provide a number');
                        return;
                    }
                    // Pass the return value in the done callback
                    done(null, true);
                }, 1000);
            }
        }
    ]).then(function (answers) {
        console.log(answers.item, answers.quant);
        inventoryProducts(answers.item, answers.quant);
    });
};

function newProductAdd(item, department, price, quantity) {
    connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: item,
          department_name: department,
          price: price,
          quantity: quantity
        },
        function(err, res) {
          if (err) throw err;
          console.log(item + " added to inventory!\n");
          connection.end();

    });
};

function newProductQuery() {
    inquirer.prompt([
        {
            name: "item",
            message: "What is the Product's name?"
        },
        {
            name: "department",
            message: "What department does the item belong to?"
        },
        {
            name: "price",
            type: "number",
            message: "How much does each unit cost?"
        },
        {
            name: "quantity",
            type: "number",
            message: "How many units exist?"
        },
    ]).then(function (answers) {
        newProductAdd(answers.item, answers.department, answers.price, answers.quantity);
    });
}

function prompt() {
    inquirer.prompt([
        {
            name: "option",
            type: "list",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory",
                "Add to Inventory", "Add New Product"]
        }
    ]).then(function (answers) {
        console.log(answers.option);
        switch (answers.option) {
            case "View Products for Sale":
                products();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                newProductQuery();
                break;
            default:
                console.log("something went wrong")
        }
    });
};

