var uainfer = require('uainfer');
var str = 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.2)';
var ua = uainfer.analyze(str);
console.log(ua.toString());
if (ua.browser.name !== 'Chrome' && ua.browser.chromeFamily)
    console.log('Equivalent to Chrome', ua.browser.chromeFamily.version);
