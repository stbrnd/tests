'use strict';

window.onload = function () {
    var tmp, param, items,
        i,
        set = '';

    param = {};
    items = location.search.substr(1).split('&');
    for ( i = 0; i < items.length; i++ ) {
        tmp = items[i].split('=');
        if ( tmp.length === 2 ) {
            param[tmp[0]] = decodeURIComponent(tmp[1]);
        }
    }

    if ( param.font ) {
        document.body.style.fontFamily = param.font;
        set += 'font set: ' + param.font;
    }

    if ( param.size ) {
        document.body.style.fontSize = param.size + 'px';
        set += param.font ? ' (' + param.size + 'px)' : 'font-size set: ' + param.size + 'px';
    }

    console.log(set);
    console.log('font use: ' + getComputedStyle(document.body)['font-family'] + ' (' + getComputedStyle(document.body)['font-size'] + ')');
};
