
module.exports = (sequelize, Sequelize) => {
	const Customer = sequelize.define('customer', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  username: {
			type: Sequelize.STRING
	  },
	 
	  email: {
			type: Sequelize.STRING
	  },
	  password: {
			type: Sequelize.STRING
    }
    
	});
	
	return Customer;
}