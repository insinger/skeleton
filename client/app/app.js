// Create the main application module
(function () {
    angular
        .module("MAIN_APP_MODULE", [
            "ngMessages",   // ngMessages simple show/hide form error messages, work with ngModel $error object
            "ngAnimate",    // ngAnimate module supports both CSS-based and JS-based animations via callback hooks
            "ui.router"     // Client-side #-based routing
        ]);

	angular.module("MAIN_APP_MODULE").config(myRoutesConfig);

	myRoutesConfig.$inject=["$stateProvider","$urlRouterProvider"];

	// Define UI states

	function myRoutesConfig($stateProvider,$urlRouterProvider) {
		$stateProvider.state('AAA', {url:"/AAA",templateUrl:"/app/AAA_Feature/AAA.html"});
		$stateProvider.state('BBB', {url:"/BBB",templateUrl:"/app/BBB_Feature/BBB.html"});
		$stateProvider.state('CCC', {url:"/CCC",templateUrl:"/app/CCC_Feature/CCC.html"});
		$stateProvider.state('fancy_CCC', {url:"/CCC/:deptnum",templateUrl:"/app/CCC_Feature/CCC.html"});
		$urlRouterProvider.otherwise("/CCC"); // CAN ALSO BE USED TO SET INITIAL STATE
	}
})();
               
