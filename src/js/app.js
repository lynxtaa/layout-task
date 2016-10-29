const app = angular.module('app', ['ngRoute']);

app.config(($routeProvider, $locationProvider) => {
	$routeProvider
		.when('/', {
			redirectTo: '/article/100'
		})
		.when('/nav', {
			templateUrl: 'views/popup.html',
			controller: 'popupCtrl'
		})
		.when('/article/:id', {
			templateUrl: 'views/article.html',
			controller: 'articleCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});

app.controller('mainCtrl', ['$scope', $scope => {

}]);

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



app.controller('articleCtrl', ['$scope', '$routeParams', '$timeout', 'Articles', ($scope, $routeParams, $timeout, Articles) => {
	let id = +$routeParams.id;
	$scope.article = Articles.get(id);
	$scope.articlePath = `views/articles/${$scope.article.id}.html`;

	// Reading Progress
	$scope.finishLoading = function() {
		(function($) {
			let max = $(document).height() - $(window).height();

			$(document).on('scroll', function() {
				let percent = Math.round($(window).scrollTop() * 100 / max);
				$scope.$apply(() => {
					$scope.percentClass = 'p' + percent;
				});
			}).trigger('scroll');
		})(jQuery);
	};

}]);