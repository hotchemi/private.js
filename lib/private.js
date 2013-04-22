/**
 * private.js
 *
 * @author Shintaro Katafuchi
 * @version 0.0.1
 */
(function() {

  var $pvt = function(prefix, obj) {
    if (typeof prefix !== 'string') {
      throw Error("prefix must be string.");
    }

    var $class,
      publicMethods = {},
      publicVariables = {},
      privateProps = {},
      prop;

    for (prop in obj) {
      if (!!prop.indexOf(prefix)) {
        if (typeof obj[prop] === 'function') {
          publicMethods[prop] = obj[prop];
        } else {
          publicVariables[prop] = obj[prop]
        }
      } else {
        privateProps[prop] = obj[prop];
      }
    }

    $class = function() {
      eval(createPublicVariables(publicVariables));
    };

    (function(){
      eval(createPrivateProps(privateProps) + createPublicMethods(publicMethods));
    })();

    return new $class();
  };

  function createPublicVariables(publicVariables) {
    var statement = "", prop;
    for (prop in publicVariables) {
      statement += "this." + prop + "=" + publicVariables[prop] + ";";
    }
    return statement;
  }

  function createPublicMethods(publicMethods) {
    var statement = "", prop;
    for (prop in publicMethods) {
      statement += "$class.prototype." + prop + "=" + publicMethods[prop] + ";";
    }
    return statement;
  }

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