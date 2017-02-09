define(["amaze","framework/services/productService"],function (amaze,pdt){

	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){

		// $scope.slideFruitData = ["lib/images/img5.png","lib/images/lemon_12.png","lib/images/sangshen_15.png","lib/images/small.jpg","lib/images/spic3.png"];
		$scope.slideFruitData = []
		var productDetail = $stateParams.productId;
		var pdtIns = new pdt($q);
		$scope.typeName = {
			type:"lunbo"
		}

		$scope.modalObj = {
			content:"",
		}
		$scope.modalObjSuc = {
			content:"已添加至购物车",
		}
		$scope.modalObjErr = {
			content:"添加失败，请重新操作！",
		}



		$scope.dataList = {
		    "cart": {
		        "amount": "1",
		        "remark": ""
		    },
		    "product_id": productDetail,
		    "owner_id": getUsercountId(),
		    "owner_type": "Customer"
		}
		var obj = {};
		function getUsercountId(){
			if ($scope.users !== obj && $scope.users.owner_id) {
				// alert($scope.users.owner_id)
				return $scope.users.owner_id;
			}else{
				return "";
			};
		}
		

		$scope.addTobagData = {
			data:$scope.dataList,
			headers:$scope.users.setheaders
		}
		$scope.addToBag  = function(){

			if (!$scope.users.owner_id) {
				alert("请先登录");
				return;
			}
			// add function 
			$scope.modalObj.showDialog();

			pdtIns.addTobagList($scope.addTobagData,$scope.dataList).then(function(data){
			// code = -1  auth failed
				// alert(JSON.stringify(data));
				$scope.modalObj.hideDialog();
				$scope.modalObjSuc.showDialogdwhite();
				setTimeout(function(){
					$scope.modalObjSuc.hideDialog();
				},2000)

				$scope.shopListNum.num = data.data.cart_item_amount;
				
				console.log(data);

			},function(err){
				$scope.modalObj.hideDialog();
				$scope.modalObjErr.showDialogdwhite()
				setTimeout(function(){
					$scope.modalObjErr.hideDialog();
				},2000)

			})

		}

		$scope.gotoShopList = function(){
			$state.go("productList");
		}
		// display in html
		$scope.productDetails ={};
		function init(){
			$scope.scrollToZero();

			var ip = $scope.serviceAddress;
			pdtIns.getDataforHome(productDetail).then(function(data){
				console.log(data,"detaildata...")
				$scope.productDetails = data.data;
				$scope.slideFruitData = $scope.productDetails.pictures['轮播']; 
				// $scope.slideFruitData = [ip+$scope.productDetails.pictures['轮播'][0].url,ip+$scope.productDetails.pictures['轮播'][1].url,ip+$scope.productDetails.pictures['轮播'][2].url]
			},function(err){
				console.log("error....");
			});

		}
		init();


	}];
	return ctrl;
});