/**
 * Eslint config.
 */

'use strict';

// public
module.exports = {
    // base rules
    extends: require.resolve('spa-eslint-config/.eslintrc.js'),

    globals: {
        gSTB:         true,
        stbWindowMgr: true
    }
};
