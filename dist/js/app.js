'use strict';

var app = angular.module('app', []);
// const app = angular.module('app', ['ngRoute']);

// app.config(($routeProvider, $locationProvider) => {
// 	$routeProvider
// 		.when('/', {
// 			redirectTo: '/1/1'
// 		})
// 		.when('/:currentWeek/:currentDay', {
// 			templateUrl: 'views/sets.html',
// 			controller: 'setsController'
// 		})
// 		.otherwise({
// 			redirectTo: '/1/1'
// 		});
// });

app.controller('mainCtrl', ['$scope', 'ArticlePreviews', function ($scope, ArticlePreviews) {
	$scope.previews = ArticlePreviews.get();
	$scope.navCategories = false;

	jQuery(window).scroll(function (event) {
		var scroll = jQuery(window).scrollTop();
		var oldState = $scope.navCategories;

		if (scroll > 50 || scroll === undefined) {
			$scope.navCategories = true;
		} else {
			$scope.navCategories = false;
		}
		if ($scope.navCategories !== oldState) {
			$scope.$apply();
		}
	});
}]);
