'use strict';

describe('Service: agendaService', function () {

  // load the service's module
  beforeEach(module('yoRasoApp'));

  // instantiate service
  var agendaService;
  beforeEach(inject(function (_agendaService_) {
    agendaService = _agendaService_;
  }));

  it('should do something', function () {
    expect(!!agendaService).toBe(true);
  });

});
