(function(root, factory) {
    'use strict';

    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
    // Rhino, and plain browser loading.

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.uainfer = {}));
    }
}(this, function(exports) {
    'use strict';

    function UserAgent(browserName, browserVersion, chromeFamily, os) {
        var simpleVersion = parseFloat(browserVersion);
        if (browserName === 'Edge') {
            simpleVersion = parseInt(browserVersion, 10);
        }
        this.browser = {
            name: browserName,
            version: simpleVersion,
            fullVersion: browserVersion,
            chromeFamily: chromeFamily
        }
        this.os = os;
    }

    UserAgent.prototype.toString = function() {
        var name = this.browser.name;
        if (this.browser.version) {
            name += ' ' + this.browser.version;
        }
        if (this.os.name) {
            name += ' on ' + this.os.name;
        }
        if (this.os.version) {
            name += ' ' + this.os.version;
        }
        return name;
    }

    var chromeBased = {
        'OPR': 'Opera',
        'SamsungBrowser': 'Samsung Browser',
        'Silk': 'Silk',
        'UCBrowser': 'UCBrowser',
        'Vivaldi': 'Vivaldi'
    }

    var osNames = {
        'Windows NT 10.0': '10',
        'Windows NT 6.3': '8.1',
        'Windows NT 6.2': '8',
        'Windows NT 6.1': '7',
        'Windows NT 6.0': 'Vista',
        'Windows NT 5.2': 'XP',
        'Windows NT 5.1': 'XP',
        'Windows NT 5.0': '2000',

        '10.4': { name: 'OS X', version: '10.4 (Tiger)' },
        '10.5': { name: 'OS X', version: '10.5 (Leopard)' },
        '10.6': { name: 'OS X', version: '10.6 (Snow Leopard)' },
        '10.7': { name: 'OS X', version: '10.7 (Lion)' },
        '10.8': { name: 'OS X', version: '10.8 (Mountain Lion)' },
        '10.9': { name: 'OS X', version: '10.9 (Mavericks)' },
        '10.10': { name: 'OS X', version: '10.10 (Yosemite)' },
        '10.11': { name: 'OS X', version: '10.11 (El Capitan)' },
        '10.12': { name: 'macOS', version: '10.12 (Sierra)' },
        '10.13': { name: 'macOS', version: '10.13 (High Sierra)' },
        '10.14': { name: 'macOS', version: '10.14 (Mojave)' }
    }

    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
    function scan(UserAgentString) {
        var tokens = [];

        function append(part) {
            if (part.length > 0) {
                var parts = part.split('/');
                tokens.push({
                    name: parts[0],
                    version: (parts.length > 1) ? parts[1] : ''
                });
            }
        }

        var part = '';
        for (var pos = 0; pos < UserAgentString.length; ++pos) {
            var ch = UserAgentString[pos];
            if (ch === ' ') {
                append(part);
                part = '';
                while (UserAgentString[pos] === ' ') ++pos;
                ch = UserAgentString[pos];
            }
            if (ch === '(') {
                append(part);
                part = '';
                var hint = '';
                for (++pos; pos < UserAgentString.length; ++pos) {
                    ch = UserAgentString[pos];
                    if (ch === ')') break;
                    hint += ch;
                }
                var hints = hint.split(';');
                for (var h = 0; h < hints.length; ++h) {
                    tokens.push({
                        name: hints[h].trim()
                    });
                }
                ++pos;
            } else if (ch !== ' ' && ch !== '(') {
                part += ch;
            }
        }
        append(part);

        return tokens;
    }

    function analyze(UserAgentString) {
        var browserName = 'Unknown';
        var browserVersion = null;
        var chromeFamily = null;
        var os = { name: null, version: null };

        var hasGecko = false;
        var hasWebKit = false;
        var versionProduct = null;
        var mobileProduct = null;
        var tailSafari = false;

        var tokens = scan(UserAgentString);
        for (var i = 0; i < tokens.length; ++i) {
            var t = tokens[i];
            if (typeof t.version === 'string') {
                if (t.name === 'Mozilla' && i === 0 && (['4.0', '5.0'].indexOf(t.version) < 0)) {
                    break;
                }
                tailSafari = hasWebKit && (t.name === 'Safari');
                hasWebKit |= (t.name === 'AppleWebKit');
                hasGecko |= (t.name === 'Gecko');
                versionProduct = (t.name === 'Version') ? t : versionProduct;
                mobileProduct = (t.name === 'Mobile') ? t : mobileProduct;
                if (hasGecko && t.name === 'Firefox') {
                    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
                    browserName = 'Firefox';
                    browserVersion = t.version;
                } else if (hasWebKit && t.name === 'Chrome') {
                    // https://developer.chrome.com/multidevice/user-agent
                    chromeFamily = {
                        version: parseInt(t.version, 10),
                        fullVersion: t.version
                    };
                } else if (hasWebKit && t.name === 'CriOS') {
                    browserName = 'Chrome';
                    browserVersion = t.version;
                } else if (t.name === 'Edge' || t.name === 'EdgA' || t.name === 'EdgiOS') {
                    browserName = 'Edge';
                    browserVersion = t.version;
                    if (t.name !== 'EdgA') {
                        // Only Edge on Android is based on Chrome/WebView/Blink:
                        // https://blogs.windows.com/msedgedev/2017/10/05/microsoft-edge-ios-android-developer/
                        chromeFamily = null;
                    }
                } else if (hasWebKit && t.version) {
                    var name = chromeBased[t.name];
                    var validVersion = t.version[0] >= '0' && t.version[0] <= '9';
                    if (name && validVersion) {
                        browserName = name;
                        browserVersion = t.version;
                    }
                }
            } else {
                if (t.name.substr(0, 10) === 'Windows NT') {
                    var ver = osNames[t.name];
                    os.version = ver ? ver : null;
                    os.name = 'Windows';
                } else if (t.name.substr(0, 5) === 'MSIE ') {
                    // This is mostly for Internet Explorer 7:
                    // https://blogs.msdn.microsoft.com/ie/2005/04/28/internet-explorer-7-user-agent-string/
                    browserName = 'Internet Explorer';
                    browserVersion = t.name.substr(5);
                } else if (t.name.substr(0, 8) === 'Trident/') {
                    var tridentVersion = parseInt(t.name.substr(8));
                    if (tridentVersion >= 4 && tridentVersion < 12) {
                        // https://blogs.msdn.microsoft.com/ie/2009/01/09/the-internet-explorer-8-user-agent-string-updated-edition/
                        // https://blogs.msdn.microsoft.com/ie/2011/04/15/the-ie10-user-agent-string/
                        // https://blogs.msdn.microsoft.com/ieinternals/2013/09/21/internet-explorer-11s-many-user-agent-strings/
                        browserName = 'Internet Explorer';
                        browserVersion = (tridentVersion + 4).toString();
                    }
                } else if (t.name.substr(0, 15) === 'Intel Mac OS X ') {
                    os = osNames[t.name.substr(15).split('_').slice(0, 2).join('.')];
                    if (!os) {
                        os = { name: 'OS X', version: null };
                    }
                } else if (t.name.substr(0, 13) === 'PPC Mac OS X ') {
                    os = osNames[t.name.substr(13).split('_').slice(0, 2).join('.')];
                    if (!os) {
                        os = { name: 'OS X', version: null };
                    }
                } else if (t.name.substr(0, 8) === 'Android ') {
                    os.name = 'Android';
                    os.version = t.name.substr(8).split('.').slice(0, 2).join('.');
                } else if (t.name.substr(0, 7) === 'CPU OS ') {
                    os.name = 'iOS';
                    os.version = t.name.substr(7).replace(' like Mac OS X', '').split('_').slice(0, 2).join('.');
                } else if (t.name.substr(0, 14) === 'CPU iPhone OS ') {
                    os.name = 'iOS';
                    os.version = t.name.substr(14).replace(' like Mac OS X', '').split('_').slice(0, 2).join('.');
                } else if (t.name.substr(0, 6) === 'Tizen ') {
                    browserName = 'Tizen';
                    browserVersion = t.name.substr(6);
                } else {
                    var genericOS = ['Linux', 'FreeBSD', 'OpenBSD', 'NetBSD', 'SunOS', 'CrOS'];
                    for (var s = 0; s < genericOS.length; ++s) {
                        if (t.name.substr(0, genericOS[s].length) === genericOS[s]) {
                            os.name = (genericOS[s] === 'CrOS') ? 'ChromeOS' : genericOS[s];
                        }
                    }
                }
            }
        }

        if (tailSafari && versionProduct && (!mobileProduct || mobileProduct.version)) {
            browserName = 'Safari';
            browserVersion = versionProduct.version;
        } else if (!browserVersion && chromeFamily) {
            // Fallback to Chrome, if no known Chrome impersonator is detected.
            browserName = 'Chrome';
            browserVersion = chromeFamily.fullVersion;
        }

        return new UserAgent(browserName, browserVersion, chromeFamily, os);
    }

    exports.analyze = analyze;
    exports.scan = scan;

}));