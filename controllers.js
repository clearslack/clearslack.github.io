/**
 * Created by eslam on 30.04.16.
 */



// CONTROLLERS
bulkRemoverApp.controller('homeController', ['$scope', 'infoService', function($scope, infoService) {

    $scope.subdomain = infoService.city;
    $scope.token = infoService.token;
    $scope.noOfDays = infoService.noOfDays;

    $scope.$watch('subdomain', function() {
        infoService.subdomain = $scope.subdomain;
    });

    $scope.$watch('token', function() {
        infoService.token = $scope.token;
    });

    $scope.$watch('noOfDays', function() {
        infoService.noOfDays = $scope.noOfDays;
    });

}]);


bulkRemoverApp.controller('statusController', ['$scope', '$resource', '$routeParams', 'infoService', function($scope, $resource, $routeParams, infoService) {

    // TODO: Validations for empty token
    $scope.token = infoService.token;
    $scope.noOfDays = infoService.noOfDays || '30';
    // TODO: Validation for empty subdomain
    $scope.subdomain = infoService.subdomain || 'testingtoolteam';

    var date = new Date();
    date.setDate(date.getDate() - $scope.noOfDays);


    $scope.listFilesURL = $resource("https://slack.com/api/files.list");

    var response = $scope.listFilesURL.get({ token: $scope.token, ts_to: date });

    response.$promise.then(function(data){
        console.log(data);
        $scope.files = data.files;
        var files = $scope.files;
        console.log(files.length);

        if(files.length === 0) {
            alert("file list is empty.");
            return;
        }

        var ctr = 1;
        $scope.status = [];
        for(i = 0; i< files.length; i++) {
            $scope.status.push("Deleting file " + ctr +": " + $scope.files[i].name +".....");
            console.log("Deleting file " + ctr +": " + $scope.files[i].name +".....");
            timestamp = new Date().getTime();
            $scope.deleteUrl = $resource("https://" + $scope.subdomain + ".slack.com/api/files.delete?t=" + $scope.days);

            var response2 = $scope.deleteUrl.get({
                token: $scope.token,
                file: $scope.files[i].id,
                set_active: true,
                _attempts: 1
            });

            ctr++;
        }

    });


}]);