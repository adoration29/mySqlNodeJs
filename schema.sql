DROP DATABASE IF EXISTS Bamazon_DB;

CREATE DATABASE Bamazon_DB;

USE Bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(50)NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cookies", "food",  5, 40),("cornflakes", "cereals", 6, 20), ("lettuce", "veggies", 2, 30),
       ("apples", "fruits", 4, 25),("oranges", "fruits", 7, 50),("carrots","veggies", 6, 10), 
       ("rice", "grains", 20, 50), ("milk", "diary", 3, 15), ("bread", "sandwich", 1, 45),
       ("beans", "food", 9, 40);