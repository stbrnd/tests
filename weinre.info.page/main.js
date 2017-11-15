'use strict';

var temp = {},
    queryParams = location.search,
    query = queryParams.substr(1, queryParams.length).split('&').map(function ( item ) {
        item = item.split('=');
        temp[item[0]] = item[1];

        return temp;
    }),
    scriptPath = '/target/target-script-min.js',
    $script;

query = query[0] || {};

if ( query.url && query.url.search('/') >= 0 ) {
    $script = document.createElement('script');
    $script.src = query.url + scriptPath + location.hash;

    document.getElementsByTagName('head')[0].appendChild($script);
}

if ( window.gSTB ) {
    (function () {
        window.stbIP.innerText = gSTB.RDir('IPAddress');
        window.stbModel.innerText = gSTB.GetDeviceModel();
        window.stbMac.innerText = gSTB.GetDeviceMacAddress();
        window.stbImageV.innerText = gSTB.GetDeviceImageVersionCurrent();
    })();

    //polyfill for rts target functions
    window.done = function ( status ) {
        console.log('Task done with status: ' + !!status);
    };

    window.output = function ( text ) {
        console.log(text);
    };
}
