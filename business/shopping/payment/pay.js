define(["amaze","wx","framework/services/shoppingService"],function (amaze,wx,shopList){
	var ctrl = ["$scope","$state","orderList","$q",function($scope,$state,orderList,$q){
		var shopInc = new shopList($q);
		// get select product start
		$scope.displayOrderList = orderList.getList();
		$scope.createOrderAddress = {};
		$scope.payProductDetails = [];
		
		var header = {
			headers:$scope.users.setheaders
		}

		// createOrderAndPay
		$scope.getSigntureAndPay = function(){
			// check address
			if (!($scope.createOrderAddress.address && $scope.createOrderAddress.address.id ))  {
				alert("请先添加收获地址");
				$scope.addOrChangeAddr();
				// return;
			};
			for (var i = 0; i < $scope.displayOrderList.length; i++) {
				var obj = {};
				
				obj.product_id= $scope.displayOrderList[i].product_id;
				obj.quantity =  $scope.displayOrderList[i].owner_id;
				obj.price = $scope.displayOrderList[i].product.real_price;

				$scope.payProductDetails.push(obj);
			};
			
			var details = {
		    "order": {
		        "status": 1,
		        "total_price": $scope.allPrice,
		        "pay_away": 1,
		        "consignee_name": "",
		        "consignee_phone": "",
		        "consignee_address": $scope.createOrderAddress.address && $scope.createOrderAddress.address.id || "",
		        "estimate": "",
		        "remark": ""
		    },
		    "buyer_id": $scope.users.customer.id,
		    "buyer_type": "Customer",
		    "details": $scope.payProductDetails,
		    "address_id": $scope.createOrderAddress.address && $scope.createOrderAddress.address.id ?$scope.createOrderAddress.address.id : ""
		}
		// console.log($scope.displayOrderList,99999)

			shopInc.createOrderAndPay(header,details).then(function(data){
				// alert("777");
				// console.log(data.data);

				var signature = data.data.prepay_data;
				
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', {
						"appId" : signature.appId,     //公众号名称，由商户传入
						"timeStamp": signature.timeStamp.toString(),         //时间戳，自1970年以来的秒数
						"nonceStr" : signature.nonceStr, //随机串
						"package" : signature.package,
						"signType" : signature.signType,         //微信签名方式:
						"paySign" : signature.paySign    //微信签名
					},

					function(res){
						
						// alert(JSON.stringify(res))
						if(res.err_msg == "get_brand_wcpay_request:ok" ) {

							$state.go("accounts")

						}else if(res.err_msg == "get_brand_wcpay_request:cancel"){
							alert("取消操作")
						}
					}
				);

			},function(err){
				alert("网络较差，请重新操作！")
			});
		}
		

		$scope.allPrice = orderList.allPrice;
		console.log($scope.displayOrderList,"orderlist.....")
		// get select product end 

		$scope.addOrChangeAddr = function(){
			$state.go("receiveAddr");
		}
		// address save
		
		function filterDefault(data){
			if (!data.length) {
				$scope.createOrderAddress.address = "";
				return;
			};
			
			for (var i = 0; i < data.length; i++) {
				if (data[i].is_default == true) {
					$scope.createOrderAddress.address = data[i];
					break;
					console.log($scope.createOrderAddress.address)
				};
			};
		}

		function initAddress(){
			shopInc.getAccountAddress(1).then(function(data){
			// shopInc.getAccountAddress($scope.users.customer.id).then(function(data){
				console.log(data);
				filterDefault(data.data)
				console.log($scope.createOrderAddress.address)

			},function(err){

			});
		}
		initAddress();

	}]
	return ctrl;
});
