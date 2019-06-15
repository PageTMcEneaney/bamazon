DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
quantity INT(10),
product_sales DECIMAL(10,2) DEFAULT 0,
PRIMARY KEY (item_id)
);

CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(100) NOT NULL,
over_head_costs DECIMAL(10,2) DEFAULT 0,
PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Nail", 1000), ("Tool", 500), ("Appliance", 3000), ("Skin", 2000), ("Eyes", 500), ("Lips", 1000);

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
("Kabuki Brush", "Tool", 18.75, 18),
("Nail Polish: Agent Orange", "Nail", 12.49, 4),
("Cuticle Oil", "Nail", 15.87, 3);

SELECT * FROM products;

SELECT b.department_id, a.department_name, SUM(a.product_sales) AS product_sales, b.over_head_costs FROM
(SELECT * FROM products) a
INNER JOIN (SELECT * FROM departments) b
ON (a.department_name = b.department_name)
GROUP BY a.department_name;

-- GROUP BY a.department_name;


-- GROUP BY a.department_name;
-- WHERE a.artist = "Coolio";


-- UPDATE products SET quantity = 50 WHERE item_id = 5;