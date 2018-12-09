# uainfer

![NpmLicense](https://img.shields.io/npm/l/uainfer.svg)
[![NPM version](https://img.shields.io/npm/v/uainfer.svg)](https://www.npmjs.com/package/uainfer)

This is a simple JavaScript library to infer the user agent from its claimed [User-Agent string](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent). The objective of uainfer to provide a human-friendly answer to the inquiry _"What browser am I using?"_.

In the context of a web browser, the most common way to obtain the User-Agent string is from [the value](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent) of `navigator.userAgent`. In the context of an HTTP server, it can be retrieved from the `User-Agent` header field in the HTTP request.

Example usage with Node.js REPL (or [![try it on RunKit](https://badge.runkitcdn.com/uainfer.svg)](https://npm.runkit.com/uainfer)):

```js
> uainfer = require('uainfer');
> claim = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.2';
> ua = uainfer.analyze(claim);
> ua.toString()
'Internet Explorer 7 on Windows XP'
```

(To use this library in a front-end application, see this [JSFiddle demo](http://jsfiddle.net/5467k1tp/))

For browsers utilizing Chrome/Blink engine (Samsung Browser, Opera, Vivaldi, etc), the result can contain the corresponding equivalent version of Chrome:

```js
> console.log(ua)
UserAgent {
  browser:
   { name: 'Vivaldi',
     version: 1.96,
     fullVersion: '1.96.1147.52',
     chromeFamily: { version: 65, fullVersion: '65.0.3325.183' } },
  os: { name: 'Windows', version: '10' } }
```

Non-goals:
* Recognize every single web browsers and obscure user agents out there.
* Deduce other information such as CPU type, device, form factor, etc.

Design choices:
* For a better maintenance, avoid regular expressions.
* Always expand its small but fairly extensive test suite.
* Keep it tidy and lightweight ![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/uainfer.svg)

This library is created and maintained by [@AriyaHidayat](https://twitter.com/AriyaHidayat).
