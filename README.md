# uainfer

[![NPM version](https://img.shields.io/npm/v/uainfer.svg)](https://www.npmjs.com/package/uainfer)
[![Build Status](https://dev.azure.com/ariya77/uainfer/_apis/build/status/ariya.uainfer)](https://dev.azure.com/ariya77/uainfer/_build/latest?definitionId=1)

This is a simple JavaScript library (MIT License) to infer the user agent from its claimed [User-Agent string](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent). The objective of uainfer to provide a human-friendly answer to the inquiry _"What browser am I using?"_.

In the context of a web browser, the most common way to obtain the User-Agent string is from [the value](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent) of `navigator.userAgent`. In the context of an HTTP server, it can be retrieved from the `User-Agent` header field in the HTTP request.

Example usage with Node.js REPL:

```js
> uainfer = require('uainfer');
> ua = uainfer.analyze('Mozilla/5.0 (Android 4.4; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0');
> ua.toString()
'Firefox 41 on Android 4.4'
```

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
* Keep it tidy and lightweight (4 KB when minified).

This library is created and maintained by [@AriyaHidayat](https://twitter.com/AriyaHidayat).
