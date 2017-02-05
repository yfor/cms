define(["amaze"],function(){
    var ctrl = ["$scope","$state","$q",function($scope,$state,$q){
    	
        function init(){
        	console.log($scope.orderDetailsDisplay)
        	$scope.orderCurrent = $scope.orderDetailsDisplay.order;
        	console.log($scope.orderCurrent)
        }

        init()
    }];
    
    return ctrl;
});