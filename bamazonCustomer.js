var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host     : 'localhost',
    port:    3306,
    user     : 'root',
    password: 'Children@12345',
    database : 'Bamazon_DB'
   
  });
   
  connection.connect(function(err){
  console.log("connected as id: " + connection.threadId);
      
 });
     

//functions
  function loadProduct(){
      connection.query('SELECT * FROM products', function (err, res ) { 
        if (err) throw err;
        console.log(results);

            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

              table.push(
                  [item_id, product_name, department_name, price, stock_quantity]
            );
          }
            console.log("");
            console.log("=========== Current Bamazon Inventory =====================");
            console.log("");
            console.log(table.toString());
            console.log("");
            continuePrompt();
        });
    
    }
    function askQuestion() {

        inquirer.prompt([{
    
                type: "input",
                name: "inputId",
                message: "Please enter the ID  of the product you would like to buy.",
            },
            {
                type: "input",
                name: "inputNumber",
                message: "How many units of this product would you like to buy?",
    
            }
        ]).then(function(userBuy) {
    
            //connect to database to find stock_quantity in database. If user quantity input is greater than stock, decline purchase.
    
            connection.query("SELECT * FROM products WHERE item_id=?", userBuy.inputId, function(err, res) {
                for (var i = 0; i < res.length; i++) {
    
                    if (userBuy.inputNumber > res[i].stock_quantity) {
    
                        console.log("====");
                        console.log("Sorry! insufficient quantity.");
                        console.log("===");
                        startPrompt();
    
                    } else {
                        //list item information for user for confirm prompt
                        console.log("===================================");
                        console.log("yes! We can fill your order.");
                        console.log("===================================");
                        console.log("You've selected:");
                        console.log("----------------");
                        console.log("Item: " + res[i].product_name);
                        console.log("Department: " + res[i].department_name);
                        console.log("Price: " + res[i].price);
                        console.log("Quantity: " + userBuy.inputNumber);
                        console.log("----------------");
                        console.log("Total: " + res[i].price * userBuy.inputNumber);
                        console.log("====");
    
                        var newStock = (res[i].stock_quantity - userBuy.inputNumber);
                        var purchaseId = (userBuy.inputId);
                        //console.log(newStock);
                        confirmPrompt(newStock, purchaseId);
                    }
                }
            });
        });
    }
    
    //Confirming Purchase
    
    function confirmPrompt(newStock, purchaseId) {
    
        inquirer.prompt([{
    
            type: "confirm",
            name: "confirmPurchase",
            message: "Are you sure you would like to purchase this item and quantity?",
            default: true
    
        }]).then(function(userConfirm) {
            if (userConfirm.confirmPurchase === true) {
    
                //if user confirms purchase, update mysql database with new stock quantity by subtracting user quantity purchased.
    
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newStock
                }, {
                    item_id: purchaseId
                }], function(err, res) {});
    
                console.log("=================================");
                console.log("Transaction completed. Thank you.");
                console.log("=================================");
                startPrompt();
            } else {
                console.log("=================================");
                console.log("No worries. Maybe next time!");
                console.log("=================================");
                startPrompt();
            }
        });
    }
    
    

        
      
       
      
  
