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

app.controller('mainCtrl', ['$scope', '$rootScope', ($scope, $rootScope) => {
	$scope.popup = {
		active: false,
		show() {
			this.active = true;
		},
		hide() {
			this.active = false;
		}
	};
}]);

app.controller('popupCtrl', ['$scope', '$rootScope', 'ArticlePreviews', ($scope, $rootScope, ArticlePreviews) => {
	$scope.previews = ArticlePreviews.get();
	$scope.navCategories = false;
	$rootScope.template = 'views/popup.html';

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


app.controller('articleCtrl', ['$scope', '$routeParams', '$rootScope', 'Articles', ($scope, $routeParams, $rootScope, Articles) => {
	let id = +$routeParams.id;
	$scope.article = Articles.get(id);
	$scope.articlePath = `views/articles/${$scope.article.id}.html`;

	// Reading Progress (better move to separate directive)
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