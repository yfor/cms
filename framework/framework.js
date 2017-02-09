define(
	['angular',
	"ui-router",
	"amaze",
	"swiper",
	"framework/directive",
	"business/home/config",
	"framework/services/accountService",
	"business/brand/config",
	"business/shopping/config",
	"business/account/config",
	"business/productDetail/config",
	],
	function(angularl,uirouter,amaze,swiper,frwork,config,accountService){
	var con = ["$scope","$state","$rootScope",function($scope,$state,$rootScope){

	}];
	deps = ["ng",
	"ui.router",
	config.name
	];
	var frame =  angular.module("framework",deps);
	frame.controller("mycontroller",con);
	frame.config(function(){
	});
	// run
	frame.run(function($rootScope,$state,$http,$q){

		
		$rootScope.serviceAddress = "http://127.0.0.1"
		$rootScope.users = {};
		$rootScope.menuPstion = {};
		$rootScope.orderDetailsDisplay = {};
		$rootScope.menuchangePosRem = {};
		$rootScope.shopListNum = {num:0};
		$rootScope.deatilFlag = false;
		$rootScope.currentMenu = 2; 
		$rootScope.orderStatusCurrent = {
			num:-1
		};

		var accountIns = new accountService($q);
		var url = window.location.href;


		/*
		if (url.indexOf('?') &&  url.match(/parent_id=(\w)/) != null) {
			setCookie("userParentId",url.match(/parent_id=(\w)/)[1]);
			// alert(getCookie("userParentId"))
			window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0958a9b801758435&redirect_uri=http%3a%2f%2fwww.yiyunma.com%2fapi%2fv1%2fwx_page_authorization&response_type=code&scope=snsapi_base&state=zhangweitest#wechat_redirect";	
		};
		
		if (getCookie("userNecessary") && window.location.href == "http://www.yiyunma.com/") {
			getUserDetails();
		}else if (getCookie("userNecessary") && window.location.href != "http://www.yiyunma.com/") {
			// test to annomate
			window.location.href = "http://www.yiyunma.com/";
		}else if(url.indexOf('?') != -1){
			$rootScope.users.account_id =  url.split("?")[1].split('&')[0].split('=')[1];

			if ($rootScope.users.account_id) {
				setCookie("userNecessary",$rootScope.users.account_id,1);
				window.location.href = "http://www.yiyunma.com/";
				window.location = "http://www.yiyunma.com/";
				
			}else{
				window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0958a9b801758435&redirect_uri=http%3a%2f%2fwww.yiyunma.com%2fapi%2fv1%2fwx_page_authorization&response_type=code&scope=snsapi_base&state=zhangweitest#wechat_redirect";
			};
		}
		// alert(getCookie("userNecessary"))
		*/

		if(url.indexOf('?') != -1){
			$rootScope.users.account_id =  url.split("?")[1].split('&')[0].split('=')[1];
		}
		//setCookie("userNecessary",$rootScope.users.account_id,1);
		$rootScope.users.account_id=2;
		getUserDetails();
		function getUserDetails(){
		accountIns.getUserDetails($rootScope.users.account_id).then(function(data){
				// add header for valid
				// removeCookie("userNecessary")
				addHeader(data.data.account);
				$rootScope.users.customer = data.data.customer;
				$rootScope.users.owner_id = data.data.customer.id;


			},function(err){
				console.log(err);
			});
		}
		// test
		//getUserDetails();

		function addHeader(data){
				var id = data.id;
				var token = data.authentication_token;
				var headers = {
					"Authorization":"Token token=\""+ token + "\"," + "id="+ "\""+ id +"\"",
					"Content-Type":'application/json'
				};
				$rootScope.users.setheaders = headers;
		}

		$rootScope.$on("$stateChangeSuccess",function(e,c,n){
			setTimeout(function(){
				$(".loading").hide();				
			},1800);
			if ($rootScope.menuPstion[c.name]) {
				
				$("body").animate({
					scrollTop:$rootScope.menuPstion[c.name]
				},1000);
			};
		});
		$rootScope.$on("$stateChangeStart",function(e,c,n){
			if (c.name == "home" || c.name == "shareMan") {
				$(".loading").show();				
			};			
			
			
		});


		$rootScope.scrollToZero = function(){
			$("body").animate({
				scrollTop:0
			},0);
		}
		
		$rootScope.curMenuDegist = function(pre,cur){
			$rootScope.menuchangePosRem[pre] = $("body").scrollTop();
			$rootScope.currentMenu = cur;
			
			setTimeout(function(){
				$("body").animate({
					
						scrollTop:$rootScope.menuchangePosRem[cur] ||0
				},0);
			},100);
		}
		$rootScope.stateGoto = function(productNum){
			var hashurl = window.location.hash.split("/");
			hashurl = hashurl[hashurl.length-1];
			$rootScope.menuPstion[hashurl] = $("body").scrollTop();
			$state.go("detail",{productId:productNum});
		};
		$rootScope.historyBack = function(){
			window.history.back(-1);
		};

	});

	return frame;
});
