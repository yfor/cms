define(["amaze","framework/services/shoppingService"],function (amaze,shopList){
	var ctrl = ["$scope","$state","$q","orderList",function($scope,$state,$q,orderList){

		var shopInc = new shopList($q);
		// console.log($scope.users.owner_id,"owner_id...");
		$scope.getAllPrice = function(){
			var allPrice = 0 ;
			for (var i = 0; i < $scope.pdtList.length; i++) {
				if ($scope.pdtList[i].status == "done") {
					allPrice += ($scope.pdtList[i].product.real_price * $scope.pdtList[i].amount)
				};
			};
			$scope.allPrice = allPrice;
		}
		

		// paymentpage
		$scope.pageStatus = "orderPage"
		
		$scope.changedPage2payment = function(){
			
			var arr = [];
			for (var i = 0; i < $scope.pdtList.length; i++) {
				if ($scope.pdtList[i].status == "done") {
					arr.push($scope.pdtList[i]);
				};
			};
			orderList.allPrice = $scope.allPrice;
			orderList.setList(arr);
			if (arr.length) {
				$state.go("payment.pay");
			}else{
				alert("请选择您要购买的产品");
			};
		}
		$scope.changebagListNum = function(num,productid,initNum){

			var data = {
			    "cart": {
			        "amount": num
			    }
			}
			return	shopInc.changedProductNumber(data,{headers:$scope.users.setheaders},productid)
		}

		$scope.deleteProductNumber = function(num){
			
			shopInc.deleteProductNumber({headers:$scope.users.setheaders},num).then(function(data){
				console.log(data,"deletesucce.....")
				init();
			},function(){

			});

		}
		$scope.gotoLogon = function(){
			$state.go("logon");
		}
	
		function init(){
			shopInc.getAllOrderList($scope.users.customer.id).then(function(data){

				// alert(JSON.stringify(data.data));
				console.log(data,"getAllOrderList....")
				$scope.pdtList = data.data;
				$scope.shopListNum.num = $scope.pdtList.length;
				// alert($scope.shopListNum.num)
				// $scope.$apply();
			},function(err){
				alert("网络不流畅，请重新操作！")
				// alert(JSON.stringify(err));
				console.log(err,"shopInc...err....")
			});
		}
		init();
	}];
	return ctrl;
});