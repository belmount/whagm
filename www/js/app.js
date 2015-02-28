(function(){
	'use strict';
	var app = angular.module('myApp', ['onsen.directives']);
	app
	.constant('searchNameUrl', 'http://localhost:9292/jjjg.027xf.com/agency/show_by_name.json?utf8=%E2%9C%93&name=')
	//.constant('searchNameUrl', 'http://jjjg.027xf.com/agency/show_by_name.json?utf8=%E2%9C%93&name=')
	.controller('AppCtrl', function($scope, searchNameUrl, $http, mainImgType, imgPath, Data) {
		$scope.searchByName = function(name){
			$http.get(searchNameUrl + name)
			.success(function(data)
				{
					$scope.agencies = data;
					
					Data.agencies = $scope.agencies;
				})
			.error(function(error){
				alert(error);
			});
		}

		$scope.mainImg = function(img) {
			return img.image_name==mainImgType;
		}

		$scope.seeDetail = function(index){
			Data.selectedIdx = index;
			
			$scope.ons.navigator.pushPage('detail.html');
		}
	})
	.constant('imgPath', 'http://119.97.201.21/zj/pages/orgthumbs/')
	.constant('mainImgType','门面照')
	.factory('Data', function(){
		var data = {};

		data.selectedIdx = 0;
		data.selectedAgency = function(){
			return data.agencies[data.selectedIdx];
		};
		return data;
	})
	.controller('DetailCtrl', function($scope, Data){
		$scope.agency = Data.selectedAgency();
		
	})
	.filter('imgUrl', function(imgPath){
		return function(img){
			return imgPath + img.guid;
		}
	})

})();
