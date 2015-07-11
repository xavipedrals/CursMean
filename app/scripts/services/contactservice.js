'use strict';

/**
 * @ngdoc service
 * @name yoRasoApp.contactService
 * @description
 * # contactService
 * Service in the yoRasoApp.
 */
angular.module('yoRasoApp')
  .factory('contactService', function ($http, $window, $q) {
    var SERVER_URL = 'http://localhost:8080/contact/';
    var contacts = {};

    function createContact(name, surname, company, telephone, agenda) {
      var q = $q.defer();
      //Crida a la rest API
      $http.post(SERVER_URL, {name: name, surname: surname, company: company, telephone: telephone, agenda:agenda}).then(function (data){
        //user = data.data;
        console.log(data);
        //Guarda el token al navegador
        //$window.sessionStorage.token = user.token;
        q.resolve(data);
      }, function () {
        console.log('FAILED');
        q.reject();
      });
      return q.promise;
    }

    function getAgendaContacts(agenda){
      var q = $q.defer();
      $http.get(SERVER_URL, {agenda:agenda}).then(function (data) {
        contacts = data.data;
        console.log(contacts);
        q.resolve(data);
      }, function () {
        console.log('FAILED');
        q.reject();
      });
      return q.promise;
    }

    function getContacts() {
      return contacts;
    }

    return {
      createContact: createContact,
      getAgendaContacts: getAgendaContacts
    };
  });
