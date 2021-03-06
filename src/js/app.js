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

app.controller('popupCtrl', ['$scope', 'Articles', ($scope, Articles) => {
	$scope.previews = Articles.get();
	$scope.navCategories = false;

	$(document).ready(function() {
		let $brand = $('.navbar-brand');

		$(window).on('scroll', function() {
			let scroll = $(window).scrollTop();
			let oldState = $scope.navCategories;

			if (scroll > 50 || scroll === undefined) {
				$scope.navCategories = true;
				$brand.addClass('hidden-md-down');
			} else {
				$scope.navCategories = false;
				$brand.removeClass('hidden-md-down');
	        }
	        if ($scope.navCategories !== oldState) {
	        	$scope.$apply();
	        }
		});
	});
}]);


app.controller('articleCtrl', ['$scope', '$routeParams', '$timeout', 'Articles', ($scope, $routeParams, $timeout, Articles) => {
	let id = +$routeParams.id;
	$scope.article = Articles.get(id);

	// Reading Progress (better move to separate directive)
	$scope.finishLoading = function() {
		let max = {
			value: 0,
			update() {
				this.value = $(document).height() - $(window).height();
			}
		};

		$(window).on('resize', max.update).trigger('resize');

		$(document).on('scroll', function() {
			max.update();
			let percent = Math.round($(window).scrollTop() * 100 / max.value);
			$timeout(() => {
				$scope.percentClass = 'p' + percent;
			});
		}).trigger('scroll');
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

app.directive('progressBar', () => {
	return {
		restrict: 'E',
		templateUrl: 'views/progressbar.html',
		replace: true
	};
});
