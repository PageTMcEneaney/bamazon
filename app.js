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

var products = [];
var quantity = [];


connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    // prompt();
    productList();

});


function quant(item_id, product) {
    var currentQuant = quantity[item_id - 1];
    inquirer.prompt([
        {
            name: "quantity",
            type: "number",
            message: "How many would you like to buy?",
            validate: function (input) {
                // Declare function as asynchronous, and save the done callback
                var done = this.async();

                // Do async stuff
                setTimeout(function () {
                    if (typeof input !== 'number') {
                        // Pass the return value in the done callback
                        done('You need to provide a number');
                        return;
                    }
                    if (input > currentQuant) {
                        // Pass the return value in the done callback
                        done('Sorry there are only ' + currentQuant + ' in stock. How many would you like to buy?');
                        return;

                    }
                    // Pass the return value in the done callback
                    done(null, true);
                }, 1000);
            }
        }
    ])
        .then(function (answers) {

            var choice = answers.quantity;
            if (choice < 1) {
                console.log("\nYou don't want any?\nThat's ok! Feel free to keep browsing\nType 'node app.js' to restart your order\n");
                connection.end();
                // return productList();
            } else {
                if (choice === 1) {
                    console.log("Great! You've purchased one item!")
                    orderUp(1, product.charAt(0));

                } else if (choice > 1) {
                    console.log("Great! You've purchased " + choice + " items!");
                    orderUp(choice, product.charAt(0), currentQuant);

                }
            }

        });
};


function prompt(products, quantity) {
    console.log(products[0], quantity[0]);
    inquirer.prompt([
        /* Pass your questions in here */
        {
            name: 'product',
            type: "list",
            message: 'What is item would you like to buy?',
            choices: products
        },
    ])
        .then(function (answers) {
            var choice = answers.product;
            // Use user feedback for... whatever!!
            console.log("You chose: " + choice.charAt(0));
            quant(choice.charAt(0), choice);
        });
}

function productList() {
    connection.query("SELECT item_id, product_name, quantity FROM products", function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            products.push(res[i].item_id + ": " + res[i].product_name);
            quantity.push(res[i].quantity);
        }

        prompt(products, quantity);

        // connection.end();
    });
    // console.log(products);

}

function orderUp(bought, item, currentQuant) {
    var int = parseInt(item);

    connection.query("SELECT price, product_name FROM products WHERE ?",
        {
            item_id: item,
        },
        function (err, res) {
            if (err) throw err;

            var itemPrice = res[0].price;
            var itemName = res[0].product_name;
            console.log("\n$" + res[0].price + " per " + res[0].product_name + "\nTotal Cost for " + bought + ": $" + (itemPrice * bought))

            // console.log("Total cost for " + bought + ": $" + (itemPrice * bought));
            orderUpdate(bought, int, currentQuant, itemName);
        });

}

function orderUpdate(bought, int, currentQuant, itemName) {
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                quantity: currentQuant - bought
            },
            {
                item_id: int
            }
        ],
        function (err, res) {
            if (err) throw err;

            console.log("\nQuantity updated for Item: " + itemName + "\nItem ID: " + int + "\nNew Quantity: " + (currentQuant - bought));
            // console.log("Total cost for " + bought + ": $" + (res[item]));

            connection.end();
        });

}