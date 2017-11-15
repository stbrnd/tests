'use strict';

window.onload = function () {
    var tmp, param, items,
        index,
        body = getComputedStyle(document.body),
        param = {};

    items = location.search.substr(1).split('&');
    for ( index = 0; index < items.length; index++ ) {
        tmp = items[index].split('=');
        if ( tmp.length === 2 ) {
            param[tmp[0]] = decodeURIComponent(tmp[1]);
        }
    }

    if ( param.font ) {
        document.body.style.fontFamily = param.font;
    }

    if ( param.size ) {
        document.body.style.fontSize = param.size + 'px';
    }

    console.log('font set: ' + param.font + ' (' + param.size + 'px)');
    console.log('font use: ' + body['font-family'] + ' (' + body['font-size'] + ')');
};
