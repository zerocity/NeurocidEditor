'use strict';

describe('Filter: getTypeOfPropertie', function () {

  // load the filter's module
  beforeEach(module('neurocidEditorApp'));

  // initialize a new instance of the filter before each test
  var getTypeOfPropertie;
  beforeEach(inject(function ($filter) {
    getTypeOfPropertie = $filter('getTypeOfPropertie');
  }));

  it('should return the input prefixed with "getTypeOfPropertie filter:"', function () {
    var text = 'angularjs';
    expect(getTypeOfPropertie(text)).toBe('getTypeOfPropertie filter: ' + text);
  });

});
