define(["amaze","framework/services/homeService"],function (amaze,homePage){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
				
		var account_id=getCookie("account_id");
		if(!account_id){
			$state.go("login");
		}
		function getCookie(key) {
			var coo=unescape(document.cookie);
			var arr1=coo.split('; ');
			for (var i=0;i<arr1.length;i++){
					var arr2=arr1[i].split('=');
					if(arr2[0]==key){
							 return arr2[1];
					}
			}
		}
		
		var $fullText = $('.admin-fullText');
		$('#admin-fullscreen').on('click', function() {
		  $.AMUI.fullscreen.toggle();
		});

		$(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
		  $fullText.text($.AMUI.fullscreen.isFullscreen ? '退出全屏' : '开启全屏');
		})
		var homePageIns = new homePage($q);
		// console.log(pdt);
		// $scope.currentMenu = 0;
		// $scope.menuChangedTwo = false;
		$scope.slideFruitData =  [];
		$scope.productListDisplay = undefined;
		// $scope.slideFruitDataHor = ["lib/images/boluo_03.png","lib/images/img5.png","lib/images/lemon_12.png","lib/images/sangshen_06.png","lib/images/shejiaguo_08.png",]
		$scope.switchMenuContent = function(){
			init();
		}
		$scope.gotoProductDetail = function(statusNum){
			$scope.stateGoto(statusNum);
			// $state.go("detail",{productId:statusNum})
		}
		$scope.gotoChristmas = function(){
			$state.go("merrychristmas");
		}
		$scope.goSearch = function(){
			$state.go("search");
		}

		$scope.goCollect = function(){
			$state.go("collect");
		}
		
		$('#doc-form-file').on('change', function() {
		  var fileNames = '';
		  $.each(this.files, function() {
			fileNames += '<span class="am-badge">' + this.name + '</span> ';
		  });
		  $('#file-list').html(fileNames);
		});
	  

		$scope.uploadFile = function(){
			var file = $scope.myFile;
               

               
			var uploadUrl = "/fileUpload";
			var fd = new FormData();
			for(var i in file){
				 fd.append('inputFile', file[i]);
			}
              
            
		   $http.post(uploadUrl, fd, {
			  transformRequest: angular.identity,
			  headers: {'Content-Type': undefined}
		   })
		
		   .success(function(data){
			   $scope.image=data;
			   console.log($scope.image.file)
		   })
		
		   .error(function(){
		   });
            
		}
		// 每个菜单请求一次数据并缓存。
		// 返回时检测当前的菜单编号，并数据切换到当前的数据，如果存在则不请求，如果不存在，则请求数据。
		$scope.displayDataForMenu = {};

		function init(){
			// console.log($scope.currentMenu,"currentMenunum.....")
			if(!$scope.displayDataForMenu[$scope.currentMenu]){

				homePageIns.categoryData($scope.currentMenu).then(function(data){
					
					// console.log(data,$scope.currentMenu,"categoryData......");
					
					$scope.displayDataForMenu[$scope.currentMenu] = data.data;
					$scope.productListDisplay = $scope.displayDataForMenu[$scope.currentMenu];
					// lunbo  productListDisplay to use
					$scope.slideFruitData =  $scope.productListDisplay.slice(0,5);
					$scope.slideFruitDataHor = $scope.productListDisplay.slice(20,26);
					// console.log($scope.productListDisplay.slice(5,8))
					// menu data this place 
				},function(err){
					console.log(err)
				});
				
			}else{
				$scope.productListDisplay = $scope.displayDataForMenu[$scope.currentMenu];
				$scope.slideFruitData =  $scope.productListDisplay.slice(0,5)
				$scope.slideFruitDataHor = $scope.productListDisplay.slice(20,26);
			}
		}

		init();

	}];
	return ctrl;
});