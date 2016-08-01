/**
 * Created by eslam on 30.04.16.
 */

// ROUTES
bulkRemoverApp.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })

        .when('/status', {
            templateUrl: 'pages/status.html',
            controller: 'statusController'
        })

        .when('/how-to-use', {
            templateUrl: 'pages/howtouse.html',
            controller: 'howToUseController'
        })
// SEO REQUIREMENT:
      // PhantomJS pre-rendering workflow requires the page to declare, through htmlReady(), that
      // we are finished with this controller.
      $scope.htmlReady();

});
