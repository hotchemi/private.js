private.js [![Build Status](https://secure.travis-ci.org/hotchemi/private.js.png)](http://travis-ci.org/hotchemi/private.js)
==========
private.js provides private accessor to object property with option prefix.<br/>
サバクラ両方での動作を目標に開発中｡

## Install

### Node
<pre>
$ npm install private.js
</pre>
and

### Browser
<pre>
&lt;script src=&quot;private.min.js&quot;&gt;&lt;/script&gt;
</pre>

## Usage
client:グローバル関数$pvtの第一引数に渡したprefixが付与されたプロパティをprivateにします｡
下記はNodeのサンプル。

```javascript
var $pvt = require("private.js"),
  expect = require("expect.js");

  var klass = $pvt("_", {

  // publicメンバにアクセスするpublic method
  getPublicVariable: function() {
    return this.publicVariable;
  },

  // privateメンバにアクセスするpublic method
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

  // publicメンバ
  publicVariable: 1,

  // privateメンバ
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
* 2013/04/23 0.0.2 release
