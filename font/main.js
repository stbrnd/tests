'use strict';

window.onload = function () {
    var tmp, param, items,
        i,
        set = 'You set';

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
        set += ' font-family ' + param.font;
    }

    if ( param.size ) {
        document.body.style.fontSize = param.size + 'px';
        set += (param.font ? ' and' : '') + ' font-size ' + param.size;
    }

    console.log(set);
    console.log('Now use font-family ' + getComputedStyle(document.body)['font-family'] + ' and font-size ' + getComputedStyle(document.body)['font-size']);
};
