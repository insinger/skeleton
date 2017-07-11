// NOTE: the department info is in req.body.dept.* (not in req.body.*)


// Create a new department
// POST /api/departments
// This function returns the function that will handle the actual request
var create = function(dbmodels) {
   return function(req, res) {
      console.log('\nData Submitted');
		console.log("req.body=",req.body);
 
      dbmodels.Department.create({
         dept_no: req.body.dept.dept_no,
         dept_name: req.body.dept.dept_name
      })
		.then(function(department) {
         console.log(department.get({ plain: true }));
         res.status(200).json(department);
      }).catch(function(err) {
         res.status(500).json(err);
      });
   }
};

// Retrieve department by id
// GET /api/departments/:dept_no
// This function returns the function that will handle the actual request
var retrieve = function(dbmodels) {
  return function (req, res) {
		// console.log("retrieve() req.query=",req.query,"req.params=",req.params);
		var where = {};
		if (req.params.dept_no) {
			where.dept_no = req.params.dept_no;
		}

      dbmodels.Department.findOne({
			where: where
		})
		.then(function (departments) {
			console.log("-- GET /api/departments/:dept_no findOne then() result \n " + JSON.stringify(departments));
			res.status(200).json(departments);
		})
		.catch(function (err) {
			console.log("-- GET /api/departments/:dept_no findOne catch() \n " + JSON.stringify(departments));
			res.status(500).json({error: true});
		});
	}
};

// Update department record
// PUT /api/departments/:dept_no
// This function returns the function that will handle the actual request
var update = function(dbmodels) {
   return function (req, res) {
      var where = {};
      where.dept_no = req.params.dept_no;

		dbmodels.Department.update(
			{dept_name:req.body.dept.dept_name},
			{where: where}
		)
		.then(function(result) {
			console.log("SUCCESS updating Department");
			res.status(200).json(req.body);
		})
		.catch(function(err) {
		 	console.log("ERROR updating Department");
			res.status(500).json({error:true});
		});
	}
}

// Delete department record
// DELETE /api/departments/:dept_no", function (req, res) {
// This function returns the function that will handle the actual request
var destroy = function(dbmodels) {
	return function(req,res) {
      var where = {};
      where.dept_no = req.params.dept_no;

	   dbmodels.Department.destroy({where:where})
	  	.then(function(result) {
	  		console.log("SUCCESS DELETING Department");
	  		res.status(200).json(req.body);
	  	})
	  	.catch(function(err) {
	  		console.log("ERROR DELETING Department");
	  		res.status(500).json({error:true});
	  	});
	}
};

// Search DB for all depts where name/number match searchString parameter
// GET /api/departments?searchString=abc   (1)
// GET /api/departments                    (2)
// This function returns the function that will handle the actual request
var search = function(dbmodels) {
   return function (req, res) {
		console.log("search() req.query=",req.query,"req.params=",req.params);
		if (req.query && Object.keys(req.query).length==0) { // no query string all -> searchString="" to match all records
			req.query={searchString:""};
		}
      dbmodels.Department.findAll({
			where: {
				$or: [
							{ dept_name: { $like: "%" + req.query.searchString + "%" } },
							{ dept_no: { $like: "%" + req.query.searchString + "%" } }
				]
			}
		})
		.then(function(departments) {
			res.status(200).json(departments);
		})
		.catch(function(err) {
			console.log("departmentsDB error clause: " + err);
			res.status(500).json(err);
		});
	}
};

// Export route handlers
// note: each of the values in this dictionary is a function call which returns a function
module.exports = function(dbmodels) {
  return {
    create: create(dbmodels),
    retrieve: retrieve(dbmodels),
    update: update(dbmodels),
    destroy: destroy(dbmodels),
    search: search(dbmodels),
  }
};
