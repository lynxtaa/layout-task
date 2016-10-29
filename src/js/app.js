const app = angular.module('app', []);
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

app.controller('mainCtrl', ['$scope', 'ArticlePreviews', ($scope, ArticlePreviews) => {
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
