private.js [![Build Status](https://secure.travis-ci.org/hotchemi/private.js.png)](http://travis-ci.org/hotchemi/private.js)
==========
private.js provides private accessor to object property with option prefix.

## Install
### Node
<pre>
$ npm install private.js
</pre>

### Browser
<pre>
&lt;script src=&quot;private.min.js&quot;&gt;&lt;/script&gt;
</pre>

## Usage
Node.js sample.
```javascript
var $pvt = require("private.js"),
  expect = require("expect.js");

  var klass = $pvt("_" /* prefix */, {

  // public method access to public variable
  getPublicVariable: function() {
    return this.publicVariable;
  },

  // public method access to private variable
  getPrivatevariable: function() {
    return _privateVariable;
  },

  // privateメンバを参照しているprivateメソッドを呼び出すpublic method
  getPrivateMethodReferPrivateVariable: function() {
    return _getPrivateVariable();
  },

  // publicメンバを参照しているprivateメソッドを呼び出すpublic method
  getPrivateMethodReferPublicVariable: function() {
    // この場合はコンテキストを指定しないといけない…
    return _getPublicVariable.call(this);
  },

  // privateメンバにアクセスするprivate method
  _getPrivateVariable: function() {
    return _privateVariable;
  },

  // publicメンバにアクセスするprivate method
  _getPublicVariable: function() {
    return this.publicVariable;
  },

  // public variable
  publicVariable: 1,

  // private variable
  _privateVariable: 2
});
```
## Test
<pre>
$ npm test
</pre>

## Minify
<pre>
$ grunt
</pre>

## Release note
* 2013/04/22 0.0.1 release
* 2013/04/24 0.0.4 release