/**
 * Eslint config.
 */

'use strict';

// public
module.exports = {
    // base rules
    extends: require.resolve('cjs-eslint-config/.eslintrc.js'),

    globals : {
        gSTB: true,
        window: true,
        document: true,
        getComputedStyle: true,
        location: true,
        screen: true
    }
};
