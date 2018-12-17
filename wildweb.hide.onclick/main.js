'use strict';

// DEBUG
console.log('start --->');
console.log(stbWindowMgr.windowList());

window.moveTo(0, 0);
window.resizeTo(screen.width - 500, screen.height - 300);

stbWindowMgr.openWebFace('http://stbrnd.github.io/tests/wildweb.hide.onclick/web.face.html');

// DEBUG
console.log('\ninit and hide web face --->');
console.log(stbWindowMgr.windowList());

document.addEventListener('click', function () {
    // DEBUG
    console.log('\nclick in portal window --->');
    console.log(stbWindowMgr.windowList());

    window.info.innerText = 'Where is Wild Web window?!';
});
