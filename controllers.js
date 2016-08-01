/**
 * Created by eslam on 30.04.16.
 */



// CONTROLLERS
bulkRemoverApp.controller('HomeController', ['$scope', 'infoService', function ($scope, infoService) {

    $scope.subdomain = infoService.city;
    $scope.token = infoService.token;
    $scope.noOfDays = infoService.noOfDays;

    $scope.$watch('subdomain', function () {
        infoService.subdomain = $scope.subdomain;
    });

    $scope.$watch('token', function () {
        infoService.token = $scope.token;
    });

    $scope.$watch('noOfDays', function () {
        infoService.noOfDays = $scope.noOfDays;
    });

}]);


bulkRemoverApp.controller('howToUseController', ['$scope', function ($scope) {

}]);


bulkRemoverApp.controller('statusController', ['$scope', '$resource', '$routeParams', 'infoService', function ($scope, $resource, $routeParams, infoService) {

    // TODO: Validations for empty token
    $scope.token = infoService.token;
    // TODO: Validate date is not negative value
    $scope.noOfDays = infoService.noOfDays;
    // TODO: Validation for empty subdomain
    $scope.subdomain = infoService.subdomain;

    var date = new Date();
    if($scope.noOfDays === 0) {
        console.log(date);
    }
    else {
        date.setDate(date.getDate() - $scope.noOfDays);
        date = date.getTime();
        


    $scope.listFilesURL = $resource("https://slack.com/api/files.list");

    var response = $scope.listFilesURL.get({token: $scope.token, ts_to: date});

    response.$promise.then(function (data) {
        $scope.files = data.files;
        var files = $scope.files;


        if (undefined !== files) {
            if (files.length === 0) {
                // TODO: replace the alert with error messages.
                alert("No files are there to be deleted ;-) ");
                return;
            }
        }

        else {
            // TODO: replace the alert with error messages.
            alert("You are not authorized. Kindly check the token you provided")
        }

        var ctr = 1;
        var ctr2 = 1;
        $scope.status = [];
        $scope.successDeleted = [];
        for (i = 0; i < files.length; i++) {
            $scope.status.push("Deleting file " + ctr + ": " + $scope.files[i].name + ".....");
            console.log("Deleting file " + ctr + ": " + $scope.files[i].name + ".....");
            timestamp = new Date().getTime();
            $scope.deleteUrl = $resource("https://" + $scope.subdomain + ".slack.com/api/files.delete?t=" + $scope.days);

            var response2 = $scope.deleteUrl.get({
                token: $scope.token,
                file: $scope.files[i].id,
                set_active: true,
                _attempts: 1
            });
            ctr++;

            response2.$promise.then(function (data) {
                $scope.successDeleted.push(ctr2);
                ctr2++;
            });


        }

    });


}]);