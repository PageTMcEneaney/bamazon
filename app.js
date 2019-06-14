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
                console.log("That's ok! Feel free to keep browsing")

            } else {
                if (choice === 1) {
                    console.log("Great! You've purchased one " + product)
                    orderUp(1, product.charAt(0));

                } else if (choice > 1) {
                    console.log("Great! You've purchased " + choice + " units of " + product);
                    orderUp(choice, product.charAt(0), currentQuant);

                }
            }

            // Use user feedback for... whatever!!

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
            console.log(choice.charAt(0));
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
    console.log(bought, int, currentQuant);

    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                quantity: currentQuant - bought
            },
            {
                item_id: item
            }
        ],
        function (err, res) {
            if (err) throw err;

            console.log(res.affectedRows + " quant updated!\n");
            // console.log("Total cost for " + bought + ": $" + (res[item]));

            connection.end();
        });
}