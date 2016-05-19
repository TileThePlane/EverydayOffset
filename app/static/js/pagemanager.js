var app=angular.module('single-page-app',['ngRoute','ui.bootstrap','angular-c3-simple','rzModule']);

//When using $ variables from angular, take parameter ex: function($scope){} and format like ["$scope",function($scope){}] 
//Allows for minifying our angular code.
app.config(["$routeProvider",function($routeProvider){
      $routeProvider
          .when('/home',{
                templateUrl: 'pages/home.html'
          })
          .when('/about',{
                templateUrl: 'pages/about.html'
          })
		  .when('/resources',{
                templateUrl: 'pages/resources.html'
          })
		  .when('/login',{
                templateUrl: 'pages/login.html'
          })
		  .when('/graphtest',{
                templateUrl: 'pages/testgraph.html'
          })
		  .when('/myoffsets',{
                templateUrl: 'pages/myoffsets.html'
          })
		  .when('/NPOfinder',{
                templateUrl: 'pages/NPOfinder.html'
          })
		  .when('/OffsetStore',{
                templateUrl: 'pages/OffsetStore.html'
          })
		  .when('/lifetimeoffsets',{
                templateUrl: 'pages/lifetimeoffsets.html'
          })
		  .when('/blog',{
			templateUrl: 'pages/blog.html'
          })
		  .when('/support',{
			templateUrl: 'pages/support.html'
          });

}]);

app.controller('cfgController',["$rootScope","$location",function($rootScope,$window,$location){
	$rootScope.$on('$routeChangeSuccess', function(){

      });

}]);