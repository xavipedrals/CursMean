'use strict';

/**
 * @ngdoc function
 * @name yoRasoApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the yoRasoApp
 */
angular.module('yoRasoApp')
    .controller('RegisterCtrl', function ($scope, UserService, $location) {
        $scope.registerData = {};

        $scope.submitRegister = function () {
            UserService.createUser($scope.registerData.username, $scope.registerData.password, $scope.registerData.email).then(function () {
                console.log('SUCCESS');
                $location.url('/login');
            }, function () {
                console.log('FAILED');
            });
        };
    });

