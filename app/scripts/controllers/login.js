'use strict';

/**
 * @ngdoc function
 * @name yoRasoApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the yoRasoApp
 */
angular.module('yoRasoApp')
    .controller('LoginCtrl', function ($scope, AuthService, $location) {
        //inicialitza la variable
        $scope.loginData = {};

        $scope.submitLogin = function () {
            AuthService.login($scope.loginData.email, $scope.loginData.password).then(function () {
                $location.url('/register');
                console.log('SUCCES');
            }, function () {
                console.log('FAILED');
            });
        };
    });
