const app = angular.module('app', ['ngRoute']);

app.config(($routeProvider, $locationProvider) => {
	$routeProvider
		.when('/', {
			redirectTo: '/article/100'
		})
		.when('/article/:id', {
			templateUrl: 'views/article.html',
			controller: 'articleCtrl'
		})
		.otherwise({
			redirectTo: '/article/100'
		});
});

app.controller('mainCtrl', $scope => {
	$scope.popup = {
		active: false,
		show() {
			window.scrollTo(0, 0);
			this.active = true;
		},
		hide() {
			window.scrollTo(0, 0);
			this.active = false;
		}
	};
});

app.controller('popupCtrl', ['$scope', 'ArticlePreviews', ($scope, ArticlePreviews) => {
	$scope.previews = ArticlePreviews.get();
	$scope.navCategories = false;

	jQuery(window).scroll(event => {
		let scroll = jQuery(window).scrollTop();
		let oldState = $scope.navCategories;

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


app.controller('articleCtrl', ['$scope', '$routeParams', 'Articles', ($scope, $routeParams, Articles) => {
	let id = +$routeParams.id;
	$scope.article = Articles.get(id);
	$scope.articlePath = `views/articles/${$scope.article.id}.html`;

	// Reading Progress (better move to separate directive)
	$scope.finishLoading = function() {
		(function($) {
			let max;

			$(window).on('resize', function() {
				max = $(document).height() - $(window).height();
			}).trigger('resize');

			$(document).on('scroll', function() {
				let percent = Math.round($(window).scrollTop() * 100 / max);
				$scope.$apply(() => {
					$scope.percentClass = 'p' + percent;
				});
			}).trigger('scroll');
		})(jQuery);
	};

}]);

app.directive('category', () => {
	return {
		restrict: 'E',
		templateUrl: 'views/category.html',
		replace: true
	};
});

app.directive('popupTemplate', () => {
	return {
		restrict: 'E',
		templateUrl: 'views/popup.html',
		replace: true
	};
});
