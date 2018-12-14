'use strict';

var webFaceWindowId;


// DEBUG
console.log('start --->');
console.log(stbWindowMgr.windowList());

window.moveTo(0, 0);
window.resizeTo(screen.width - 500, screen.height - 300);

webFaceWindowId = stbWindowMgr.openWebFace('./web.face.html');
stbWindowMgr.windowHide(webFaceWindowId);

// DEBUG
console.log('\ninit and hide web face --->');
console.log(stbWindowMgr.windowList());

stbWindowMgr.initWebWindow('https://www.google.com');

// DEBUG
console.log('\ninit web window --->');
console.log(stbWindowMgr.windowList());

// web window geometry
stbWindowMgr.resizeWebWindow(20, 20, 400, 500);
stbWindowMgr.raiseWebWindow();

// DEBUG
console.log('\nend --->');
console.log(stbWindowMgr.windowList());

document.addEventListener('click', function () {
    // DEBUG
    console.log('\nclick in portal window --->');
    console.log(stbWindowMgr.windowList());

    window.info.innerText = 'Where is Wild Web window?!';
});
