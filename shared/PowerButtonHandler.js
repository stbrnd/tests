/* MAG Linux/WebKit POWER handler. ES5, no dependencies. */
(function (root, factory) {
    if (typeof module === "object" && module.exports) module.exports = factory();
    else root.PowerButtonHandler = factory();
}(this, function () {
    "use strict";
    var active = null;

    function defaultMatch(event) {
        var code = typeof event.code === "number" ? event.code :
            (event.keyCode || event.which);
        return !!event.altKey && (code === 85 || code === 74 ||
            event.code === "KeyU" || event.code === "KeyJ");
    }

    function attach(options) {
        options = options || {};
        if (active) throw new Error("PowerButtonHandler is already attached. Call detach() first.");
        var target = options.target || window;
        var getSTB = options.getSTB || function () { return window.gSTB; };
        var matches = options.matches || defaultMatch;
        var held = false;

        function report(error) {
            if (options.onError) options.onError(error);
            else if (typeof console !== "undefined" && console.error) console.error(error);
        }

        function down(event) {
            if (!matches(event)) return;
            // Own the POWER event so another application handler cannot toggle it again.
            if (event.preventDefault) event.preventDefault();
            if (event.stopImmediatePropagation) event.stopImmediatePropagation();
            else if (event.stopPropagation) event.stopPropagation();
            if (held || event.repeat) return;
            held = true;
            try {
                var stb = getSTB();
                if (!stb || typeof stb.StandBy !== "function") {
                    throw new Error("gSTB.StandBy is not available.");
                }
                // Entry only. Wake-up is handled by the configured device wake sources.
                stb.StandBy(true);
            } catch (error) {
                report(error);
            }
        }

        function up(event) {
            // Alt may already be released when keyup arrives.
            var code = typeof event.code === "number" ? event.code :
                (event.keyCode || event.which);
            if (matches(event) || code === 85 || code === 74 ||
                    event.code === "KeyU" || event.code === "KeyJ") held = false;
        }

        function reset() { held = false; }
        var controller = {
            reset: reset,
            detach: function () {
                target.removeEventListener("keydown", down, true);
                target.removeEventListener("keyup", up, true);
                target.removeEventListener("blur", reset, true);
                held = false;
                if (active === controller) active = null;
            }
        };
        target.addEventListener("keydown", down, true);
        target.addEventListener("keyup", up, true);
        target.addEventListener("blur", reset, true);
        active = controller;
        return controller;
    }

    return { attach: attach, matches: defaultMatch };
}));
