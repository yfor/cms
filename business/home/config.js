define(["angular","ui-router"],function(angular,uirouter){

	var config = ["$stateProvider","$urlRouterProvider","$controllerProvider",function($stateProvider,$urlRouterProvider,$controllerProvider){
		$urlRouterProvider.when("", "/home");
		$urlRouterProvider.otherwise("/home");
		$stateProvider.state("login",{
			url:"/login",
			templateUrl:"./business/home/login/login.html",
			controller:"login.ctrl",
			resolve:{
				deps:function($q,$rootScope){
					var defered = $q.defer();
					var dependiences = ["./business/home/login/login"];
					require(dependiences,function(ctrl){
						$rootScope.$apply(function(){
							$controllerProvider.register("login.ctrl",ctrl);
							defered.resolve();
						});
					});
					return defered.promise;
				}
			}
		});
		$stateProvider.state("home",{
					url:"/home",
					templateUrl:"./business/home/main/mainProduct.html",
					controller:"home.ctrl",
					resolve:{
						deps:function($q,$rootScope){
							var defered = $q.defer();
							var dependiences = ["./business/home/main/mainProduct"];
							require(dependiences,function(ctrl){
								$rootScope.$apply(function(){
									$controllerProvider.register("home.ctrl",ctrl);
									defered.resolve();
								});
							});
							return defered.promise;
						}
					}
				});

		
	}];
	// deps = [];

    var  mo = angular.module("ui.router");
    mo.config(config);
    return  mo;
});
