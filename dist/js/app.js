'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		redirectTo: '/article/100'
	}).when('/article/:id', {
		templateUrl: 'views/article.html',
		controller: 'articleCtrl'
	}).when('/article/:id/nav', {
		templateUrl: 'views/popup.html',
		controller: 'popupCtrl'
	}).otherwise({
		redirectTo: '/'
	});
});

app.controller('mainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {}]);

app.controller('popupCtrl', ['$scope', '$routeParams', 'ArticlePreviews', function ($scope, $routeParams, ArticlePreviews) {
	$scope.previews = ArticlePreviews.get();
	$scope.navCategories = false;
	$scope.articleId = $routeParams.id;

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

app.controller('articleCtrl', ['$scope', '$routeParams', '$location', 'Articles', function ($scope, $routeParams, $location, Articles) {
	var id = +$routeParams.id;
	$scope.article = Articles.get(id);
	$scope.articlePath = 'views/articles/' + $scope.article.id + '.html';

	$scope.openPopup = function () {
		var path = $location.path() + '/nav';
		$location.path(path);
	};

	// Reading Progress
	$scope.finishLoading = function () {
		(function ($) {
			var max = $(document).height() - $(window).height();

			$(document).on('scroll', function () {
				var percent = Math.round($(window).scrollTop() * 100 / max);
				$scope.$apply(function () {
					$scope.percentClass = 'p' + percent;
				});
			}).trigger('scroll');
		})(jQuery);
	};
}]);
