/**
 * Module dependencies.
 */
var $pvt = require("../lib/private"),
  expect = require("expect.js");

var klass = $pvt("_", {

  getPublicVariable: function() {
    return this.publicVariable;
  },

  getPrivateVariable: function() {
    return _privateVariable;
  },

  getPrivateMethodReferPrivateVariable: function() {
    return _getPrivateVariable();
  },

  getPrivateMethodReferPublicVariable: function() {
    return _getPublicVariable.call(this);
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

describe('constructor suite', function() {
  it('should throw a error when prefix is not string', function () {
    expect(function() {
      var klass = $pvt(null, {});
    }).to.throwError(function(e) {
        expect(e.message).to.equal("prefix must be string.")
      });
  });
});

describe('method suite', function() {
  it('getPublicVariable() should equal 1', function () {
    expect(klass.getPublicVariable()).to.equal(1);
  });

  it('getPrivateVariable() should equal 2', function () {
    expect(klass.getPrivateVariable()).to.equal(2);
  });

  it('getPrivateMethodReferPrivateVariable() should equal 2', function () {
    expect(klass.getPrivateMethodReferPrivateVariable()).to.equal(2);
  });

  it('getPrivateMethodReferPublicVariable() should equal 1', function () {
    expect(klass.getPrivateMethodReferPublicVariable()).to.equal(1);
  });

  it('should throw a error when access _getPrivateVariable', function () {
    expect(function() {
      klass._getPrivateVariable();
    }).to.throwError();
  });

  it('should throw a error when access _getPublicVariable', function () {
    expect(function() {
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