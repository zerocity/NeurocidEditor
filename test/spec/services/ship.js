'use strict';

describe('Service: Ship', function () {

  // load the service's module
  beforeEach(module('neurocidEditorApp'));

  // instantiate service
  var Ship;
  beforeEach(inject(function (_Ship_) {
    Ship = _Ship_;
  }));

  it('should do something', function () {
    expect(!!Ship).toBe(true);
  });

});
