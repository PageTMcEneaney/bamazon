# Bamazon
--------------------------------
## Overview
--------------------------------
This is an Amazon-like storefront with the MySQL skills we've learned this unit. The app will take in orders from customers and deplete stock from the store's inventory. It also allows managers and supervisors to track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

--------------------------------
## Command Line Instructions
--------------------------------
Example:

    node app.js
    node manager.js
    node supervisor.js

 - app.js: prompts the user to select an item in the store, and then asks how many they would like to purchase. If the user selects more units than what is in stock or doesn't enter a number, it returns an error. If the user enters 0, it ends the connection and prompts them to browse the store again by running the file again.
 - manager.js: Prompts the user to select from the following:

        View Products for Sale | View Low Inventory | Add to Inventory | Add New Product

     - View Products for Sale: displays a table with all products including item number, product name, department name, price per unit, quantity, and total sales for each product
     - View Low Inventory: displays a table with products that have less than 5 items in stock
     - Add to Inventory: prompts user to select a product by name, then asks them how many items they'd like to add to inventory
     - Add New Product: prompts the user to add a new product. Gets the product name, department name, price per unit, and quantity
 - supervisor.js: prompts the user to select from the following:

        View Product Sales by Department | Create New Department
        
     - View Product Sales by Department: inner joins the products and departments tables and displays a table with department ID, department name, total product sales per department, total profit(sales - overhead), and over head costs per department
     - Create New Department: prompts the supervisor to create a new department and requires a name and a numerical value for the overhead cost

--------------------------------
## Required to run
--------------------------------
 - node.js
 - bash / terminal
 - npm
 - inquirer
 - mysql
 - mySQL Workbench
 - all files in folder

--------------------------------
## Video Demo of function
--------------------------------
    node app.js | node manager.js | node supervisor.js

![video demo of CLI function](https://drive.google.com/file/d/11NRy0AQbmkCEBQziCApZDSlPDf3mfcs7/view)

https://drive.google.com/file/d/11NRy0AQbmkCEBQziCApZDSlPDf3mfcs7/view
