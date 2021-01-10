

let express = require('express');
let router = express.Router();
 
const lcm = require('../controllers/cal.controller');


router.get('/api/lcm', lcm.callcm);


module.exports = router;