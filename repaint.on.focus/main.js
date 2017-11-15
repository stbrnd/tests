'use strict';

var focusIndex = 1;

function switchFocusedDiv () {
    ++focusIndex;

    if ( focusIndex > 2 ) {
        focusIndex = 1;
    }
    console.log(focusIndex);
    window['div' + focusIndex].focus();

//			window.focusStatus.innerHTML = 'focus div #' + focusIndex;
}

window.onload = function () {
    window.addEventListener('keydown', function ( event ) {
        if ( event.keyCode === 9 ) {
            switchFocusedDiv();
            event.preventDefault();
        }
    });

    setTimeout(function () {
        window.div1.focus();
    }, 0);
};
