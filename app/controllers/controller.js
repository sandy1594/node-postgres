
const db = require('../config/db.config.js');
const Customer = db.Customer;
var bcrypt = require('bcrypt');
const saltRounds = 10;

exports.create = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
    let customer = {};

    try{
        // Building Customer object from upoading request's body
        customer.username = req.body.username;
        customer.email = req.body.email;
        customer.password = hash;
    
        // Save 
        Customer.create(customer).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Customer with id = " + result.id,
                customer: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
  })

}
exports.retrieveCustomer =(req, res) =>{
  Customer.findOne({
       where: {
           email: req.body.email
              }
  }).then(function (customer) {
      if (!customer) {
        res.status(500).json({
          message: "Error!",
          error: error
      });
      } else {
bcrypt.compare(req.body.password, customer.password, function (err, result) {
     if (result == true) {
      res.status(200).json({
        message: "Success",
        customers: customer
    });
     } else {
      res.send('Incorrect password');
      
     }
   });
  }
});
}
  

exports.retrieveAllCustomers = (req, res) => {
    // find all Customer information from 
    Customer.findAll()
        .then(customerInfos => {
            res.status(200).json({
                message: "Get all Customers' Infos Successfully!",
                customers: customerInfos
            });
        })
        . catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

exports.getCustomerById = (req, res) => {
  // find all Customer information from 
  let customerId = req.params.id;
  Customer.findByPk(customerId)
      .then(customer => {
          res.status(200).json({
              message: " Successfully Get a Customer with id = " + customerId,
              customers: customer
          });
      })
      . catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}



 
exports.pagination = (req, res) => {
  try{
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
  
    const offset = page ? page * limit : 0;
  
    Customer.findAndCountAll({ limit: limit, offset:offset })
      .then(data => {
        const totalPages = Math.ceil(data.count / limit);
        const response = {
          message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
          data: {
             
              "totalItems": data.count,
              "totalPages": totalPages,
              "limit": limit,
              "currentPageNumber": page + 1,
              "currentPageSize": data.rows.length,
              "customers": data.rows
          }
        };
        res.send(response);
      });  
  }catch(error) {
    res.status(500).send({
      message: "Error -> Can NOT complete a paging request!",
      error: error.message,
    });
  }    
}



exports.updateById = async (req, res) => {
    try{
        let customerId = req.params.id;
        let customer = await Customer.findByPk(customerId);
    
        if(!customer){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a customer with id = " + customerId,
                customer: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
                
            }
            let result = await Customer.update(updatedObject, {returning: true, where: {id: customerId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a customer with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Customer with id = " + customerId,
                customer: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a customer with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let customerId = req.params.id;
        let customer = await Customer.findByPk(customerId);

        if(!customer){
            res.status(404).json({
                message: "Does Not exist a Customer with id = " + customerId,
                error: "404",
            });
        } else {
            await customer.destroy();
            res.status(200).json({
                message: "Delete Successfully a Customer with id = " + customerId,
                customer: customer,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a customer with id = " + req.params.id,
            error: error.message,
        });
    }
}