/**
 * Module dependencies.
 */
var Pvt = require("../lib/private"),
  expect = require("expect.js");

var klass = Pvt("_", {

  getPublicVariable: function() {
    return this.publicVariable;
  },

  getPrivatevariable: function() {
    return _privateVariable;
  },

  getPrivateMethodReferPrivateVariable: function() {
    return _getPrivateVariable();
  },

  // TODO not support yet
  getPrivateMethodReferPublicVariable: function() {
    return _getPublicVariable();
  },

  _getPrivateVariable: function() {
    return _privateVariable;
  },

  _getPublicVariable: function() {
    return this.publicVariable;
  },

  publicVariable: 1,

  _privateVariable: 2
});

describe('method suite', function() {
  it('getPublicVariable() should equal 1', function () {
    expect(klass.getPublicVariable()).to.equal(1);
  });

  it('getPrivatevariable() should equal 2', function () {
    expect(klass.getPrivatevariable()).to.equal(2);
  });

  it('getPrivateMethodReferPrivateVariable() should equal 2', function () {
    expect(klass.getPrivateMethodReferPrivateVariable()).to.equal(2);
  });

  // TODO not support yet
  it('getPrivateMethodReferPublicVariable() should equal 1', function () {
    //expect(klass.getPrivateMethodReferPublicVariable()).to.equal(1);
  });

  it('should throw a error when access private method', function () {
    expect(function() {
      klass._getPrivateVariable();
      klass._getPublicVariable();
    }).to.throwError();
  });
});

describe('Variable suite', function() {
  it('publicVariable should equal 1', function () {
    expect(klass.publicVariable).to.equal(1);
  });

  it("can't access private variable", function () {
    expect(klass).to.not.have.property('_privateVariable');
    expect(klass._privateVariable).to.equal(undefined);
  });
});