(function(){
	'use strict';
	var app = angular.module('myApp', ['onsen.directives']);
	app
	.constant('searchNameUrl', 'http://localhost:9292/jjjg.027xf.com/agency/show_by_name.json?utf8=%E2%9C%93&name=')
	.constant('locSearchUrl', 'http://localhost:9292/jjjg.027xf.com/home/search.json?limit=5&intermediate=%E5%B1%85%E9%97%B4&proxy=%E4%BB%A3%E7%90%86')
	//.constant('searchNameUrl', 'http://jjjg.027xf.com/agency/show_by_name.json?utf8=%E2%9C%93&name=')
	.controller('AppCtrl', function($scope, searchNameUrl, $http, mainImgType, imgPath, Data, locSearchUrl) {
		var onSearchSuccess = function(data){
				$scope.agencies = data;
					
				Data.agencies = $scope.agencies;
			};

		var onSearchError = function(error){
				alert(error);
			};

		$scope.searchByName = function(name){
			$http.get(searchNameUrl + name)
			.success(onSearchSuccess)
			.error(onSearchError);
		}

		$scope.locSearch = function(){
			var locStr = '&from_lat=30.593087&from_lng=114.305357';
			$http.get(locSearchUrl+locStr)
			.success(onSearchSuccess)
			.error(onSearchError);
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
		$scope.showMap = function() {
				$scope.ons.navigator.pushPage('map.html');
		}
	})
	.controller('MapCtrl', function($scope, Data, $document){
		$document.ready(function(){
				var map;
				$scope.agency = Data.selectedAgency();
				var loc = Data.selectedAgency().location;

				map = new AMap.Map("map",{
						resizeEnable: true,
						//二维地图显示视口
						view: new AMap.View2D({
							center:new AMap.LngLat(loc.longitude, loc.latitude),//地图中心点
							zoom:13 //地图显示的缩放级别
						})
					});	
				var marker = new AMap.Marker({				  
						icon:"http://webapi.amap.com/images/marker_sprite.png",
						position:new AMap.LngLat(loc.longitude, loc.latitude)
					});
			marker.setMap(map);
		});
	
	})
	.filter('imgUrl', function(imgPath){
		return function(img){
			return imgPath + img.guid;
		}
	})

})();
