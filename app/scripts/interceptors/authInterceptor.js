/**
 * Created by xavivaio on 10/07/2015.
 */
'use strict';
angular.module('yoRasoApp').factory('authInterceptor', function ($q, $window, $injector) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                $injector.get('$location').url('/register');
            }
            return response || $q.when(response);
        }
    };
});

angular.module('yoRasoApp').config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});