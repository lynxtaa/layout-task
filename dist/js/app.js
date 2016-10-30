'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		redirectTo: '/article/100'
	}).when('/article/:id', {
		templateUrl: 'views/article.html',
		controller: 'articleCtrl'
	}).otherwise({
		redirectTo: '/article/100'
	});
});

app.controller('mainCtrl', function ($scope) {
	$scope.popup = {
		active: false,
		show: function show() {
			window.scrollTo(0, 0);
			this.active = true;
		},
		hide: function hide() {
			window.scrollTo(0, 0);
			this.active = false;
		}
	};
});

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
	$scope.articlePath = 'views/articles/' + $scope.article.id + '.html';

	// Reading Progress (better move to separate directive)
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

app.directive('category', function () {
	return {
		restrict: 'E',
		templateUrl: 'views/category.html',
		replace: true
	};
});

app.directive('popupTemplate', function () {
	return {
		restrict: 'E',
		templateUrl: 'views/popup.html',
		replace: true
	};
});
