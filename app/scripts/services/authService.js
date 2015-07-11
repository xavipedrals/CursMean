'use strict';
angular.module('yoRasoApp').factory('AuthService', AuthService);

function AuthService($http, $window,  $q) {

    var SERVER_URL = 'http://localhost:8080/authenticate/';
    var user = {};

    function login(email, password) {
        var q = $q.defer();
        //Crida a la rest API
        $http.post(SERVER_URL, {email: email, password: password}).then(function(data) {
            user = data.data;
            console.log(user);
            //Guarda el token al navegador
            $window.sessionStorage.token = user.token;
            q.resolve();
        }, function() {
            console.log('FAILED');
            q.reject();
        });
        return q.promise;
    }

    function getUser() {
        return user;
    }

    return {
        login: login,
        getUser: getUser
    };
}
