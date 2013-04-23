/**
 * private.js 0.0.3
 */
(function() {

  var $pvt = function(prefix, obj) {
    if (typeof prefix !== 'string') {
      throw Error("prefix must be string.");
    }

    var $class, i,
      publicMethods = {},
      publicVariables = {},
      privateProps = {};

    for (i in obj) {
      if (i.indexOf(prefix)) {
        if (typeof obj[i] === 'function') {
          publicMethods[i] = obj[i];
        } else {
          publicVariables[i] = obj[i]
        }
      } else {
        privateProps[i] = obj[i];
      }
    }

    $class = function() {
      for (var j in publicVariables) {
        this[j] = publicVariables[j];
      }
    };

    (function(){
      var $eval = eval, k;
      $eval(createPrivateProps(privateProps));
      for (k in publicMethods) {
        $class.prototype[k] = publicMethods[k];
      }
    })();

    return new $class();
  };

  function createPrivateProps(privateProps) {
    var statement = "", prop;
    for (prop in privateProps) {
      statement += "var " + prop + "=" + privateProps[prop] + ";";
    }
    return statement;
  }

  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = $pvt;
  } else {
    this.$pvt = $pvt;
  }

})();