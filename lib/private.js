/**
 * private.js
 *
 * @author Shintaro Katafuchi
 * @version 0.0.1
 */
(function() {

  var Pvt = function(prefix, obj) {
    if (typeof prefix !== 'string') {
      throw Error("prefix must be string.");
    }

    var $class = function(){},
      publicProps = {},
      privateProps = {},
      objProp, priProp, publicProp;

    for (objProp in obj) {
      if (objProp.indexOf(prefix)) {
        publicProps[objProp] = obj[objProp];
      } else {
        privateProps[objProp] = obj[objProp];
      }
    }

    (function(){
      for (priProp in privateProps) {
        eval("var " + priProp + "=" + privateProps[priProp] + ";");
      }
      for (publicProp in publicProps) {
        eval("$class.prototype." + publicProp + "=" + publicProps[publicProp] + ";");
      }
    })();

    return new $class();
  };

  try {
    window.Pvt = Pvt;
  } catch (e) {
    module.exports = Pvt;
  }

})();