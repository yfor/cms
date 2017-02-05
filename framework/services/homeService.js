define(["angular","framework/http"],function(angular,https){
	function homePage($q){
		https.call(this,$q);
	}
	homePage.prototype = new https();


	homePage.prototype.categoryData = function(categoryID){
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/products?category="+categoryID+"&limit=30",
			method:"get"
		});
	}
	homePage.prototype.getSearchData = function(string){
		return this.doRequest({
			url:"/api/v1/accounts/1/stores/1/products?search="+ encodeURI(string),
			method:"get"
		});
	}
	homePage.prototype.getUserData = function(){
		return this.doRequest({
			url:"/users",
			method:"get"
		});
	}
	homePage.prototype.login = function(data){
	data = JSON.stringify(data)
	return this.doRequest({
		url:"/login",
		method:"post",
		data:data
		});
	}
	return homePage;
});