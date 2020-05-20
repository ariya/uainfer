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

    function UserAgent(browser, os) {
        this.browser = browser;
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
    };

    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
    function tokenize(UserAgentString, handler) {
        function append(part) {
            if (part.length > 0) {
                var parts = part.split('/');
                var version = (parts.length > 1) ? parts[1] : '';
                handler(parts[0], version);
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
                    handler(hints[h].trim());
                }
                ++pos;
            } else if (ch !== ' ' && ch !== '(') {
                part += ch;
            }
        }
        append(part);
    }

    // Stateless reducer: return a new `os` object based on `token` value.
    function deduceOS(os, token) {

        var osNames = {
            'Windows NT 10.0': '10',
            'Windows NT 6.3': '8.1',
            'Windows NT 6.2': '8',
            'Windows NT 6.1': '7',
            'Windows NT 6.0': 'Vista',
            'Windows NT 5.2': 'XP',
            'Windows NT 5.1': 'XP',
            'Windows NT 5.0': '2000',

            '10.4': 'Tiger',
            '10.5': 'Leopard',
            '10.6': 'Snow Leopard',
            '10.7': 'Lion',
            '10.8': 'Mountain Lion',
            '10.9': 'Mavericks',
            '10.10': 'Yosemite',
            '10.11': 'El Capitan',
            '10.12': 'Sierra',
            '10.13': 'High Sierra',
            '10.14': 'Mojave',
            '10.15': 'Catalina'
        };

        function getWindowsVersion(str) {
            var ver = osNames[str];
            return ver ? ver : null;
        }

        // Example: "Intel Mac OS X 10_10_3" returns "OS X 10.10 (Yosemite)"
        function getOSXVersion(str) {
            var info = str.substr(str.indexOf('OS X') + 5);
            var key = (info.indexOf('_') > 1) ? info.split('_') : info.split('.');
            key = (key.length >= 2) ? key.slice(0, 2) : key.concat([0]);
            var version = osNames[key.join('.')] ? key.join('.') + ' (' + osNames[key.join('.')] + ')' : key.join('.');
            return version;
        }

        function getAndroidVersion(str) {
            return str.substr(8).split('.').slice(0, 2).join('.');
        }

        // Example: "CPU iPhone OS 11_3 like Mac OS X" returns "iOS 11.3"
        function getIOSVersion(str) {
            return str.substr(str.indexOf(' OS ') + 4).replace(' like Mac OS X', '').split('_').slice(0, 2).join('.');
        }

        var platforms = [
            { tag: 'Windows NT', name: 'Windows', fn: getWindowsVersion },
            { tag: 'Intel Mac OS', name: 'macOS', fn: getOSXVersion },
            { tag: 'PPC Mac OS', name: 'macOS', fn: getOSXVersion },
            { tag: 'Android', name: 'Android', fn: getAndroidVersion },
            { tag: 'CPU iPhone OS', name: 'iOS', fn: getIOSVersion },
            { tag: 'CPU OS', name: 'iOS', fn: getIOSVersion },
            { tag: 'Linux' },
            { tag: 'FreeBSD' },
            { tag: 'OpenBSD' },
            { tag: 'NetBSD' },
            { tag: 'SunOS' },
            { tag: 'CrOS', name: 'ChromeOS' }
        ];

        function isPartialMatch(platform) {
            return platform.tag === token.substr(0, platform.tag.length);
        }

        var match = platforms.find(isPartialMatch);
        if (match) {
            var name = match.name ? match.name : match.tag;
            os.name = name.split(' ').shift();
            os.version = match.fn ? match.fn(token) : null;

            if (os.name === 'macOS') {
                // For El Capitan (10.11) and older versions.
                os.name = (parseInt(os.version.replace('10.', ''), 10) <= 11) ? 'OS X' : 'macOS';
            }
        }

        return os;
    }

    function scan(UserAgentString) {
        var tokens = [];
        tokenize(UserAgentString, function (name, version) {
            tokens.push({
                name: name,
                version: version
            });
        });
        return tokens;
    }

    // Finite state machine: return a new `state` object based on the inputs.
    function deduceBrowser(state, token, version) {
        if (!state.data) {
            state.data = {
                tokens: [],
                versions: {},
                chromeFamily: null
            };
        }

        state.data.tokens.push(token);
        if (version) {
            state.data.versions[token] = version;
        }

        switch (token) {
            case 'Chrome':
                state.browser.chromeFamily = {
                    version: parseInt(version, 10),
                    fullVersion: version
                };
                break;

            case 'EdgiOS':
            case 'Edge':
                // Only Edge on Android is based on Chrome/WebView/Blink:
                // https://blogs.windows.com/msedgedev/2017/10/05/microsoft-edge-ios-android-developer/
                state.browser.chromeFamily = null;
                break;
        }

        var heuristics = [
            { seq: ['Gecko', 'Firefox'], name:  'Firefox' },

            // Safari and derived
            { seq: ['AppleWebKit', 'KHTML, like Gecko', 'Version', 'Safari'], name: 'Safari', ver: 'Version' },
            { seq: ['AppleWebKit', 'CriOS', 'Mobile', 'Safari'], name: 'Chrome', ver: 'CriOS' },
            { seq: ['AppleWebKit', 'Mobile', 'Safari', 'EdgiOS'], name: 'Edge', ver: 'EdgiOS' },
            { seq: ['AppleWebKit', 'Silk', 'Safari'], name: 'Silk' },
            { seq: ['AppleWebKit', 'Version', 'Kindle'], name: 'Kindle' },

            // Authentic Chrome
            { seq: ['AppleWebKit', 'Chrome', 'Safari'], name: 'Chrome' },
            { seq: ['AppleWebKit', 'Version', 'Chrome', 'Safari'], name: 'Chrome' },

            // Windows-exclusive
            { seq: ['Chrome', 'Safari', 'Edge'], name: 'Edge' },
            { seq: ['MSIE 6.0'], name: 'Internet Explorer', at: '6.0' },
            { seq: ['MSIE 7.0'], name: 'Internet Explorer', at: '7.0' },
            { seq: ['Trident/4.0'], name: 'Internet Explorer', at: '8.0' },
            { seq: ['Trident/5.0'], name: 'Internet Explorer', at: '9.0' },
            { seq: ['Trident/6.0'], name: 'Internet Explorer', at: '10.0' },
            { seq: ['Trident/7.0'], name: 'Internet Explorer', at: '11.0' },

            // Chrome-based and other impersonators
            { seq: ['Chrome', 'Safari', 'Edg'], name: 'Edge', ver: 'Edg' },
            { seq: ['AppleWebKit', 'Silk', 'Chrome', 'Safari'], name: 'Silk' },
            { seq: ['Chrome', 'Safari', 'Vivaldi'], name: 'Vivaldi' },
            { seq: ['Chrome', 'Safari', 'OPR'], name: 'Opera', ver: 'OPR' },
            { seq: ['AppleWebKit', 'Chrome', 'Safari', 'EdgA'], name: 'Edge', ver: 'EdgA' },
            { seq: ['AppleWebKit', 'SamsungBrowser', 'Chrome', 'Safari'], name: 'Samsung Browser', ver: 'SamsungBrowser'},
            { seq: ['Chrome', 'UCBrowser', 'Safari'], name: 'UCBrowser' }
        ];

        if (state.data.versions.Mozilla === '4.0' || state.data.versions.Mozilla === '5.0') {
            state.browser = heuristics.reduce(function (browser, heuristic) {
                var sequence = heuristic.seq;
                var positions = sequence.map(function (n) {
                    return state.data.tokens.indexOf(n);
                });

                function difference(result, value) {
                    result.push(value - result.pop());
                    result.push(value);
                    return result;
                }

                function isPositive(x) {
                    return x > 0;
                }

                var monotonicallyIncreasing = positions.reduce(difference, [0]).every(isPositive);
                if (monotonicallyIncreasing) {
                    var field = heuristic.ver ? heuristic.ver : heuristic.name;
                    var fullVersion = heuristic.at ? heuristic.at : state.data.versions[field];
                    browser.name = heuristic.name;
                    browser.version =  (browser.name === 'Edge') ? parseInt(fullVersion, 10) : parseFloat(fullVersion);
                    browser.fullVersion = fullVersion;
                }
                return browser;
            }, state.browser);

            // Special case of override in case of Tizen browser (looks very similar to Safari)
            var isTizen = state.data.tokens.find(function (h) {
                return h.substr(0, 5) === 'Tizen';
            });
            state.browser.name = isTizen ? 'Tizen' : state.browser.name;
        }

        return state;
    }

    function analyze(UserAgentString) {
        var os = {
            name: null,
            version: null
        };
        var browser = {
            name: 'Unknown',
            version: null,
            fullVersion: null,
            chromeFamily: null
        };
        var state = {
            browser: browser
        };

        tokenize(UserAgentString, function (token, version) {
            os = deduceOS(os, token);
            state = deduceBrowser(state, token, version);
        });

        return new UserAgent(state.browser, os);
    }

    exports.analyze = analyze;
    exports.scan = scan;
    exports.version = '0.6.0'; // sync with package.json

}));
