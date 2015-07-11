'use strict';
angular.module('yoRasoApp').factory('UserService', UserService);

function UserService($http, $window, $q) {

    var SERVER_URL = 'http://localhost:8080/user/';
    var user = {};

    function createUser(username, password, email) {
        var q = $q.defer();
        //Crida a la rest API
        $http.post(SERVER_URL, {username: username, password: password, email: email}).then(function (data) {
            user = data.data;
            console.log(user);
            q.resolve(data);
        }, function () {
            console.log('FAILED');
            q.reject();
        });
        return q.promise;
    }

    //function getUser() {
    //  return user;
    //}

    return {
      createUser: createUser
    };
}

