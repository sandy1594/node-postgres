

let express = require('express');
let router = express.Router();
 
const customers = require('../controllers/controller.js');

router.post('/api/customers/create', customers.create);
router.get('/api/customers/one', customers.retrieveCustomer);
router.get('/api/customers/all', customers.retrieveAllCustomers);
router.get('/api/customers/onebyid/:id', customers.getCustomerById);
router.get('/api/customers/pagination', customers.pagination);
router.put('/api/customers/update/:id', customers.updateById);
router.delete('/api/customers/delete/:id', customers.deleteById);

module.exports = router;