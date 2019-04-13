app.config(['$routeProvider', '$locationProvider', '$stateProvider' ,'$urlRouterProvider', function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/');

    var indexState = {
        name: 'index',
        url: '/',
        templateUrl: "home.html",
        controller: "homeCtrl"
    }

    $stateProvider.state(indexState);  
    
}]);