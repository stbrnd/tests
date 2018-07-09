/**
 * Checking platform implementation of HTML5 History API.
 */

'use strict';

var errors = { // feel free to add other error types
        notImplemented: {
            message: 'History API is not implemented!'
        }
    },
    doc        = document,
    historyAPI = window.history,
    html       = '',
    prop, isFunction, isOwn;


/**
 * Get value returned by particular method.
 *
 * @param {function} method method reference
 *
 * @return {*} whatever method returns
 */
function callMethod ( method ) {
    try {
        return method === historyAPI.go ? undefined : method.call(historyAPI);
    } catch ( error ) {
        return '[' + error.name + ']: ' + error.message;
    }
}


if ( Object.prototype.toString.call(historyAPI).slice(8, -1) === 'Object' ) {
    doc.body.classList.add('success');

    for ( prop in historyAPI ) {
        isFunction = typeof historyAPI[prop] === 'function';
        isOwn = historyAPI.hasOwnProperty(prop);

        html += '<tr><td>' + prop + ['', ' <i>(own)</i>'][+isOwn] + '</td><td>' +
            historyAPI[prop] + (isFunction ? ' (<b>length:</b> ' + historyAPI[prop].length + ')</td>' : '</td>') +
            (isFunction ? '<td>' + callMethod(historyAPI[prop]) + '</td>' : '<td></td>') + '</tr>';
    }

    doc.getElementsByTagName('tbody')[0].innerHTML = html;
} else {
    doc.body.classList.add('error');
    alert(errors.notImplemented.message);
}
