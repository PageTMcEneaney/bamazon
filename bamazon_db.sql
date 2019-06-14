DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
quantity INT(10),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Nail Polish: Cosmic Sunshine", "Nail", 12.99, 5), 
("Nail Polish: Hot Damn!", "Nail", 10.75, 3),
("Nail File", "Tool", 1.99, 25),
("Hair Dryer", "Appliance", 37.99, 2),
("Korean Face Mask", "Skin", 3.50, 48),
("Rose Water", "Skin", 15.00, 8),
("Lancome Mascara", "Eyes", 11.50, 7),
("Burts Bees Chapstick", "Lips", 5.85, 25),
("MAC Matte Lipcolor: Mhere", "Lips", 22.37, 3),
("Kabuki Brush", "Tool", 18.75, 18);

SELECT * FROM products;