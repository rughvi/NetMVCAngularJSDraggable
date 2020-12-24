(function () {
    //Module 
    var app = angular.module('MyApp', []);
    // Controller

    app.controller('MyController', function ($scope) {
        $scope.Message = "Congratulation you have created your first application using AngularJs hgvh";
    });

    app.directive('myDirective', function() {
        return {
            templateUrl: '/js/MyApp.html',
            link
        }
    });

})();