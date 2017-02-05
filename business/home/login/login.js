define(["amaze","framework/services/homeService"],function (amaze,homePage){
	var ctrl = ["$scope","$state","$stateParams","$http","$q",function($scope,$state, $stateParams,$http,$q){
	$scope.currentuser={};
	  $scope.currentuser.name="admin"
	   $scope.currentuser.pw="123456"
	$scope.login = function(){
		var homePageIns = new homePage($q);
		$http.post('/login',$scope.currentuser).then(
			function(data){
				var sdata=data.data;
				if(sdata.code==0){
					setCookie("account_id",3);
					$state.go("home");
				}
				else{
					removeCookie("account_id");
				}
			},
			function(err){
				console.log(err)
			}
			)		
	}
	
	function setCookie(key,value,day) {
		var date=new Date();
		date.setDate(date.getDate()+day);
		document.cookie=key+'='+escape(value)+';expires='+date;
	}
	function removeCookie(key) {
		setCookie(key,'',-1);
	}
	}];
	return ctrl;
});