'use strict';

/**
 * @ngdoc service
 * @name yoRasoApp.contactService
 * @description
 * # contactService
 * Service in the yoRasoApp.
 */
angular.module('yoRasoApp')
  .factory('contactService', function ($http, $q) {
    var SERVER_URL = 'http://localhost:8080/contact/';
    var contacts = {};
    var agenda = {};

    function createContact(name, surname, company, telephone, agenda) {
      var q = $q.defer();
      //Crida a la rest API
      $http.post(SERVER_URL, {name: name, surname: surname, company: company, telephone: telephone, agenda:agenda}).then(function (data){
        console.log(data);
        q.resolve(data);
      }, function () {
        console.log('FAILED');
        q.reject();
      });
      return q.promise;
    }

    function getAgendaContacts(agenda){
      var q = $q.defer();
      var SERVER_URL_COMPLETE = SERVER_URL + agenda;
      $http.get(SERVER_URL_COMPLETE).then(function (data) {
        contacts = data.data;
        console.log(contacts);
        q.resolve(data);
      }, function () {
        console.log('FAILED');
        q.reject();
      });
      return q.promise;
    }

    function setAgenda(agenda) {
      this.agenda = agenda;
    }

    return {
      createContact: createContact,
      getAgendaContacts: getAgendaContacts,
      setAgenda:setAgenda
    };
  });
