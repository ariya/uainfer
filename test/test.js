var assert = require('assert');
var uainfer = require('../src/uainfer.js');

describe('Windows browsers', function() {

    it('should infer Internet Explorer 6 on Windows XP', function() {
        var ua = uainfer.analyze('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50728)');
        assert.equal(ua.toString(), 'Internet Explorer 6 on Windows XP');
    });

    it('should infer Internet Explorer 7 on Windows XP', function() {
        var ua = uainfer.analyze('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727; .NET CLR 1.1.4322)');
        assert.equal(ua.toString(), 'Internet Explorer 7 on Windows XP');
    });

    it('should infer Internet Explorer 8 on Windows Vista', function() {
        // Compatibility view, see https://blogs.msdn.microsoft.com/ie/2009/01/09/the-internet-explorer-8-user-agent-string-updated-edition/
        var ua = uainfer.analyze('Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Trident/4.0)');
        assert.equal(ua.toString(), 'Internet Explorer 8 on Windows Vista');
    });

    it('should infer Internet Explorer 8 on Windows 7', function() {
        var ua = uainfer.analyze('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)');
        assert.equal(ua.toString(), 'Internet Explorer 8 on Windows 7');
    });

    it('should infer Internet Explorer 9 on Windows Vista', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; WOW64; Trident/5.0)');
        assert.equal(ua.toString(), 'Internet Explorer 9 on Windows Vista');
    });

    it('should infer Internet Explorer 10 on Windows 7', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Win64; x64; Trident/6.0)');
        assert.equal(ua.toString(), 'Internet Explorer 10 on Windows 7');
    });

    it('should infer Internet Explorer 11 on Windows 8.1', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko');
        assert.equal(ua.toString(), 'Internet Explorer 11 on Windows 8.1');
    });

    it('should infer Internet Explorer 11 on Windows 10', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; Touch; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; Tablet PC 2.0; Zoom 3.6.0; rv:11.0) like Gecko')
        assert.equal(ua.toString(), 'Internet Explorer 11 on Windows 10');
    });

    it('should infer Edge 16 on Windows 10 (Xbox)', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Windows NT 10.0; Win64; x64; Xbox; Xbox One) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299');
        assert.equal(ua.toString(), 'Edge 16 on Windows 10');
        assert.strictEqual(ua.browser.chromeFamily, null);
    });

    it('should infer Edge 17 on Windows 10', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134');
        assert.equal(ua.toString(), 'Edge 17 on Windows 10');
        assert.strictEqual(ua.browser.chromeFamily, null);
    });

    it('should infer Edge 18 on Windows 10', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18362');
        assert.equal(ua.toString(), 'Edge 18 on Windows 10');
        assert.strictEqual(ua.browser.chromeFamily, null);
    });

    it('should infer Edge 76 on Windows 10', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3800.0 Safari/537.36 Edg/76.0.167.1');
        assert.equal(ua.toString(), 'Edge 76 on Windows 10');
        assert.equal(ua.browser.chromeFamily.version, 76);
    });

    it('should infer Chrome 45 on Windows 8', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36');
        assert.equal(ua.toString(), 'Chrome 46 on Windows 8');
    });

    it('should infer Chrome 60 on Windows 10', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.78 Safari/537.36');
        assert.equal(ua.toString(), 'Chrome 60 on Windows 10');
    });

    it('should infer Firefox 45 on Windows 7', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Windows NT 6.1; rv:45.0) Gecko/20100101 Firefox/45.0');
        assert.equal(ua.toString(), 'Firefox 45 on Windows 7');
    });

    it('should infer Firefox 52 on Windows 8', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Windows NT 6.2; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0');
        assert.equal(ua.toString(), 'Firefox 52 on Windows 8');
    });

    it('should infer Firefox 36 on Windows 8.1', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0');
        assert.equal(ua.toString(), 'Firefox 36 on Windows 8.1');
    });

    it('should infer Firefox 62 on Windows 10', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:62.0) Gecko/20100101 Firefox/62.0');
        assert.equal(ua.toString(), 'Firefox 62 on Windows 10');
    });

    it('should infer Vivaldi 1.96 on Windows 10', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.183 Safari/537.36 Vivaldi/1.96.1147.52');
        assert.equal(ua.toString(), 'Vivaldi 1.96 on Windows 10');
        assert.equal(ua.browser.chromeFamily.version, 65);
    });

    it('should infer Opera 55 on Windows 10', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36 OPR/55.0.2994.61');
        assert.equal(ua.toString(), 'Opera 55 on Windows 10');
        assert.equal(ua.browser.chromeFamily.version, 68);
    });

});

describe('macOS browsers', function() {

    it('should infer Safari 4 on OS X 10.4 (Tiger)', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; en) AppleWebKit/533.19.4 (KHTML, like Gecko) Version/4.1.3 Safari/533.19.4');
        assert.equal(ua.toString(), 'Safari 4.1 on OS X 10.4 (Tiger)');
    });

    it('should infer Safari 5 on OS X 10.5 (Leopard)', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_5_8) AppleWebKit/534.50.2 (KHTML, like Gecko) Version/5.0.6 Safari/533.22.3');
        assert.equal(ua.toString(), 'Safari 5 on OS X 10.5 (Leopard)');
    });

    it('should infer Safari 10.1 on OS X 10.10 (Yosemite)', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30');
        assert.equal(ua.toString(), 'Safari 10.1 on OS X 10.10 (Yosemite)');
    });

    it('should infer Safari 9.1 on OS X 10.11 (El Capitan)', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7');
        assert.equal(ua.toString(), 'Safari 9.1 on OS X 10.11 (El Capitan)');
    });

    it('should infer Safari 10.1 on macOS 10.12 (Sierra)', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.1 Safari/603.1.30');
        assert.equal(ua.toString(), 'Safari 10.1 on macOS 10.12 (Sierra)');
    });

    it('should infer Safari 11.1 on macOS 10.13 (High Sierra)', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.1.2 Safari/605.1.15');
        assert.equal(ua.toString(), 'Safari 11.1 on macOS 10.13 (High Sierra)');
    });

    it('should infer Safari 12 on macOS 10.14 (Mojave)', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Safari/605.1.15');
        assert.equal(ua.toString(), 'Safari 12 on macOS 10.14 (Mojave)');
    });

    it('should infer Chrome 42 on OS X 10.10 (Yosemite)', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36');
        assert.equal(ua.toString(), 'Chrome 42 on OS X 10.10 (Yosemite)');
    });

    it('should infer Firefox 61 on High Sierra', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:61.0) Gecko/20100101 Firefox/61.0');
        assert.equal(ua.toString(), 'Firefox 61 on macOS 10.13 (High Sierra)');
    });

});

describe('Unix browsers', function() {

    it('should infer Firefox 60 on Linux', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0');
        assert.equal(ua.toString(), 'Firefox 60 on Linux');
    });

    it('should infer Firefox 40 on FreeBSD', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (X11; FreeBSD amd64; rv:40.0) Gecko/20100101 Firefox/40.0');
        assert.equal(ua.toString(), 'Firefox 40 on FreeBSD');
    });

    it('should infer Chrome 52 on OpenBSD', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (X11; OpenBSD amd64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36');
        assert.equal(ua.toString(), 'Chrome 52 on OpenBSD');
    });

    it('should infer Firefox 61 on NetBSD', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (X11; NetBSD amd64; rv:61.0) Gecko/20100101 Firefox/61.0');
        assert.equal(ua.toString(), 'Firefox 61 on NetBSD');
    });

    it('should infer Firefox 55.2 on SunOS', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (X11; SunOS sun4u; rv:55.2) Gecko/20100101 Firefox/55.2');
        assert.equal(ua.toString(), 'Firefox 55.2 on SunOS');
    });

    it('should infer Tizen 2.4 Browser', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Linux; Tizen 2.4; SAMSUNG SM-Z200F) AppleWebKit/537.3 (KHTML, like Gecko) Version/2.4 Mobile Safari/537.3');
        assert.equal(ua.toString(), 'Tizen 2.4 on Linux');
    });

    it('should infer Chrome 63 on ChromeOS', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (X11; CrOS x86_64 10032.86.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.140 Safari/537.36');
        assert.equal(ua.toString(), 'Chrome 63 on ChromeOS');
    });

});

describe('Android browsers', function() {

    it('should infer generic WebView-based Android browser', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Linux; Android 9) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/69.0.3497.100 Mobile Safari/537.36');
        assert.equal(ua.toString(), 'Chrome 69 on Android 9');
        assert.equal(ua.browser.chromeFamily.version, 69);
    });

    it('should infer Samsung Browser 2.1 on Android 5.0', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Linux; Android 5.0.1; SAMSUNG GT-I9505 Build/LRX22C) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/2.1 Chrome/34.0.1847.76 Mobile Safari/537.36');
        assert.equal(ua.toString(), 'Samsung Browser 2.1 on Android 5.0');
        assert.equal(ua.browser.chromeFamily.version, 34);
    });

    it('should infer Samsung Browser 3.5 on Android 5.1', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Linux; Android 5.1.1; SAMSUNG SM-J200G Build/LMY47X) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/3.5 Chrome/38.0.2125.102 Mobile Safari/537.36');
        assert.equal(ua.toString(), 'Samsung Browser 3.5 on Android 5.1');
        assert.equal(ua.browser.chromeFamily.version, 38);
    });

    it('should infer Samsung Browser 7.4 on Android 9', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Linux; Android 9; Pixel 2 Build/PPR2.180905.005) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/7.4 Chrome/59.0.3071.125 Mobile Safari/537.36');
        assert.equal(ua.toString(), 'Samsung Browser 7.4 on Android 9');
        assert.equal(ua.browser.chromeFamily.version, 59);
    });

    it('should infer Firefox 41 on Android 4.4', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Android 4.4; Mobile; rv:41.0) Gecko/41.0 Firefox/41.0');
        assert.equal(ua.toString(), 'Firefox 41 on Android 4.4');
    });

    it('should infer Chrome 18 on Android 4.0', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19');
        assert.equal(ua.toString(), 'Chrome 18 on Android 4.0');
    });

    it('should infer Chrome 42 on Android 6.0', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Linux; Android 6.0.1; NX551J Build/MMB29M) AppleWebKit/537.36(KHTML,like Gecko)Version/4.0 Chrome/42.0.2311.154 Mobile Safari/537.36');
        assert.equal(ua.toString(), 'Chrome 42 on Android 6.0');
    });

    it('should infer Chrome 69 on Android 9', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Linux; Android 9; Pixel 2 Build/PPR2.180905.005) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Mobile Safari/537.36');
        assert.equal(ua.toString(), 'Chrome 69 on Android 9');
    });

    it('should infer Edge 42 on Android 9', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Linux; Android 9; Pixel 2 Build/PPR2.180905.005) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.123 Mobile Safari/537.36 EdgA/42.0.0.2549');
        assert.equal(ua.toString(), 'Edge 42 on Android 9');
        assert.equal(ua.browser.chromeFamily.version, 67);
    });

    it('should infer UCBrowser 11.5 on Android 7.0', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Linux; U; Android 7.0; en-US; SM-G615F Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/40.0.2214.89 UCBrowser/11.5.0.1015 Mobile Safari/537.36');
        assert.equal(ua.toString(), 'UCBrowser 11.5 on Android 7.0');
        assert.equal(ua.browser.chromeFamily.version, 40);
    });

});

describe('iOS browsers', function() {

    it('should infer Safari 9.0 on iOS 9.3', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (iPad; CPU OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1');
        assert.equal(ua.toString(), 'Safari 9 on iOS 9.3');
    });

    it('should infer Safari 11 on iOS 11.0', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1');
        assert.equal(ua.toString(), 'Safari 11 on iOS 11.0');
    });

    it('should infer Chrome 65 on iOS 11.3', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) CriOS/65.0.3325.152 Mobile/15E216 Safari/604.1');
        assert.equal(ua.toString(), 'Chrome 65 on iOS 11.3');
    });

    it('should infer Edge 41 on iOS 10.3', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 Safari/603.2.4 EdgiOS/41.1.35.1');
        assert.equal(ua.toString(), 'Edge 41 on iOS 10.3');
        assert.strictEqual(ua.browser.chromeFamily, null);
    });

});

describe('Kindle browsers', function() {

    it('should infer Kindle (e-reader) experimental browser', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Linux; U; en-US) AppleWebKit/528.5+ (KHTML, like Gecko, Safari/528.5+) Version/4.0 Kindle/3.0 (screen 600×800; rotate)');
        assert.equal(ua.toString(), 'Kindle 3 on Linux');
    });

    it('should infer Silk 3 on Linux', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Linux; U; en-gb; KFTT Build/IML74K) AppleWebKit/535.19 (KHTML, like Gecko) Silk/3.0 Safari/535.19');
        assert.equal(ua.toString(), 'Silk 3 on Linux');
    });

    it('should infer Silk 64.3 on Android 5.1', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (Linux; Android 5.1.1; KFGIWI Build/LVY48F) AppleWebKit/537.36 (KHTML, like Gecko) Silk/64.3.4 like Chrome/64.0.3282.137 Safari/537.36');
        assert.equal(ua.toString(), 'Silk 64.3 on Android 5.1');
    });

    it('should infer Silk 64.3 on Linux', function() {
        var ua = uainfer.analyze('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Silk/64.3.4 like Chrome/64.0.3282.137 Safari/537.36');
        assert.equal(ua.toString(), 'Silk 64.3 on Linux');
    });

});

describe('Unknown browsers', function() {

    it('should not throw on an empty string', function() {
        var ua = uainfer.analyze('');
        assert.equal(ua.browser.name, 'Unknown');
    });

    it('should not throw on spaces', function() {
        var ua = uainfer.analyze('  ');
        assert.equal(ua.browser.name, 'Unknown');
    });

    it('should not throw on sole prefix', function() {
        var ua = uainfer.analyze('Mozilla/5.0');
        assert.equal(ua.browser.name, 'Unknown');
    });


});
