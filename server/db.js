var config = require('./config');
var Sequelize = require("sequelize");

// Create Sequelize DB connection
var sequelize = new Sequelize(
	'employees',
	config.MYSQL_USERNAME,
	config.MYSQL_PASSWORD,
	{
		host: config.MYSQL_HOSTNAME,
		port: config.MYSQL_PORT,
		logging: config.MYSQL_LOGGING,
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			idle: 10000,
		},
	}
);

// Import DB Models - sequelize.import() returns a Sequelize Model object
const DepartmentModel = sequelize.import('./models/department');

// Define Model Associations
// e.g.:
// DepartmentModel.hasMany(DeptManagerModel, { foreignKey: 'dept_no' });
// DeptManagerModel.belongsTo(EmployeeModel, { foreignKey: 'emp_no' });

// Exports Models
module.exports = {
  Department: DepartmentModel,
};
