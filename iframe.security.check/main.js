'use strict';

function initFrame ( $iframe ) {
    var $script = $iframe.contentDocument.head.appendChild(document.createElement('script'));

    $iframe.className = 'ifr';

    $script.type = 'text/javascript';

    $script.innerHTML = 'setTimeout(function (){ window.parent.location.href = "http://google.com" }, 0);';

    return $iframe;
}

window.onload = function () {
    var $iframe;

    if ( window.parent === window ) {
        document.body.style.backgroundColor = '#000';
        $iframe = document.createElement('iframe');
        //					$iframe.src = window.location.href;
        $iframe.src = 'http://www.w3.org/';
        $iframe.onload = function () {
            initFrame($iframe);
        };
        $iframe.width = '200px';
        $iframe.height = '200px';
        document.body.appendChild($iframe);
    }
};
