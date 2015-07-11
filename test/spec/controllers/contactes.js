'use strict';

describe('Controller: ContactesCtrl', function () {

  // load the controller's module
  beforeEach(module('yoRasoApp'));

  var ContactesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactesCtrl = $controller('ContactesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ContactesCtrl.awesomeThings.length).toBe(3);
  });
});
