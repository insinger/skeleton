// define API route handlers
// Load controller(s) and wire up API endpoints to functions defined in the controller(s)

module.exports = function(app, dbmodels) {
  var DepartmentController = require('./api/department.controller')(dbmodels); 

  // Create new department
  app.post("/api/departments", DepartmentController.create);

  // Retrieve department 
  app.get("/api/departments/:dept_no", DepartmentController.retrieve);

  // Update department 
  app.put("/api/departments/:dept_no", DepartmentController.update);

  // Delete department 
  app.delete("/api/departments/:dept_no", DepartmentController.destroy);

  // Search department 
  app.get("/api/departments", DepartmentController.search);

};
