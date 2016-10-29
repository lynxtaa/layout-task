'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		redirectTo: '/article/100'
	}).when('/nav', {
		templateUrl: 'views/popup.html',
		controller: 'popupCtrl'
	}).when('/article/:id', {
		templateUrl: 'views/article.html',
		controller: 'articleCtrl'
	}).otherwise({
		redirectTo: '/'
	});
});

app.controller('mainCtrl', ['$scope', function ($scope) {}]);

app.controller('popupCtrl', ['$scope', 'ArticlePreviews', function ($scope, ArticlePreviews) {
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

app.controller('articleCtrl', ['$scope', '$routeParams', 'Articles', function ($scope, $routeParams, Articles) {
	var id = +$routeParams.id;
	$scope.article = Articles.get(id);
}]);
