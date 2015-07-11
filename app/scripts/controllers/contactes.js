'use strict';

/**
 * @ngdoc function
 * @name yoRasoApp.controller:ContactesCtrl
 * @description
 * # ContactesCtrl
 * Controller of the yoRasoApp
 */
angular.module('yoRasoApp')
    .controller('ContactesCtrl', function ($scope, contactService) {
        $scope.createContactData = {};

        $scope.createContactCon = function () {
            contactService.createContact($scope.createContactData.name, $scope.createContactData.surname,
                $scope.createContactData.company, $scope.createContactData.phone, "agendaAux").then(function () {
                    console.log('SUCCESS');
                }, function () {
                    console.log('FAILED');
                });
        };
    });
