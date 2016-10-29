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
}]);

app.factory('ArticlePreviews', function () {
	return {
		get: function get() {
			return [{
				"id": 1000,
				"tags": ["Make-up"],
				"header": "Road testing 12 different shades of orange lipstick in search of the best",
				"previewText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, doloribus!",
				"img": "article1.png",
				"author": "Door: Lorena Max | Vandaag"
			}, {
				"id": 1002,
				"tags": ["Make-up"],
				"header": "Kylie Jenner's new lip kit color, majesty, is a 'Black Metal Nature'",
				"previewText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem voluptatibus, provident sunt, sequi unde quaerat.",
				"img": "article2.png",
				"author": "Door: Lorena Max | Vandaag"
			}, {
				"id": 1003,
				"tags": ["Make-up"],
				"header": "9 legit lip plumpers that actually do the job",
				"previewText": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem voluptatibus, provident sunt.",
				"img": "article1.png",
				"author": "Door: Lorena Max | Vandaag"
			}];
		}
	};
});
