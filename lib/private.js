(function() {

  var $pvt = function(prefix, obj) {
    if (typeof prefix !== 'string') {
      throw Error("prefix must be string.");
    }

    var publicMethods = {},
      publicVariables = {},
      privateProps = {},
      $class, isPublic, i;

    for (i in obj) {
      isPublic = i.indexOf(prefix);
      if (isPublic && typeof obj[i] === 'function') {
        publicMethods[i] = obj[i];
      } else if (isPublic) {
        publicVariables[i] = obj[i]
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
      var $eval = eval;
      $eval(createPrivateProps(privateProps));
      for (var k in publicMethods) {
        $class.prototype[k] = publicMethods[k];
      }
    })();

    return new $class();
  };

  function createPrivateProps(privateProps) {
    var prop, statement = "";
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