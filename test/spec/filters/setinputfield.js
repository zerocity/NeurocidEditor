'use strict';

describe('Filter: setInputField', function () {

  // load the filter's module
  beforeEach(module('neurocidEditorApp'));

  // initialize a new instance of the filter before each test
  var setInputField;
  beforeEach(inject(function ($filter) {
    setInputField = $filter('setInputField');
  }));

  it('should return the input prefixed with "setInputField filter:"', function () {
    var text = 'angularjs';
    expect(setInputField(text)).toBe('setInputField filter: ' + text);
  });

});
