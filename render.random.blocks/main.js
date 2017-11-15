'use strict';

var MAX_BLOCK_COUNT = 10000,
    STEP_DELAY      = 5,
    newBlockDelay   = 30,
    overlayDelay    = 500,
    screenWidth     = screen.width,
    screenHeight    = screen.height,
    body            = document.body,
    overlay         = document.getElementById('overlay'),
    colors          = ['#f00', '#0f0', '#00f'],
    stopped         = false,
    counter         = 0,
    index           = 0,
    timerIdBlocks,
    timerIdOverlay;


/** Generate blocks with random parameters. */
function generate () {
    var div = document.createElement('div');


    /**
     * Return random value between given two (inclusive).
     *
     * @param {number} min minimal allowed value
     * @param {number} max maximum allowed value
     *
     * @return {number}
     */
    function getValue ( min, max ) {
        return ~~(Math.random() * (max - min + 1)) + min;
    }


    /**
     * Generate random color in RGB format.
     *
     * @return {string} generated HEX color code
     */
    function getColor () {
        return '#' + ((1 << 24) * Math.random() | 0).toString(16);
    }


    div.style.width = getValue(30, 70) + 'px';
    div.style.height = getValue(20, 50) + 'px';
    div.style.top = getValue(0, screenHeight) + 'px';
    div.style.left = getValue(0, screenWidth) + 'px';
    div.style.backgroundColor = getColor();
    div.style.borderColor = getColor();
    div.style.borderWidth = getValue(1, 15) + 'px';
    div.style.borderRadius = getValue(0, 30) + 'px';
    div.style.zIndex = getValue(1, 100);
    div.style.opacity = 1 / getValue(1, 50);

    body.appendChild(div);
}


/**
 * Generate new block.
 *
 * @param {number} stepDelay delay between appearing new block
 */
function blinkBlocks ( stepDelay ) {
    newBlockDelay += stepDelay;
    newBlockDelay = newBlockDelay < 0 ? 0 : newBlockDelay;

    clearInterval(timerIdBlocks);

    timerIdBlocks = setInterval(function () {
        if ( counter < MAX_BLOCK_COUNT && !stopped ) {
            counter += 1;
            generate();
        } else if ( counter === MAX_BLOCK_COUNT ) {
            counter = 0;
            clearInterval(timerIdBlocks);
        }
    }, newBlockDelay);
}


/**
 * Animate overlay.
 *
 * @param {number} stepDelay delay between appearing overlay
 */
function blinkOverlay ( stepDelay ) {
    overlayDelay += stepDelay;
    overlayDelay = overlayDelay < 0 ? 0 : overlayDelay;

    clearInterval(timerIdOverlay);

    timerIdOverlay = setInterval(function () {
        if ( !stopped ) {
            overlay.style.backgroundColor = colors[index];
            overlay.style.visibility = ['hidden', 'visible'][+(overlay.style.visibility === 'hidden')];
            index = index < 2 ? index + 1 : 0;
        }
    }, overlayDelay);
}

console.log('\nPress "1" for slow down blocks generation.\nPress "2" for speed up blocks generation.\n' +
    'Press "3" for slow down appearing overlay.\nPress "4" for speed up appearing overlay.\n' +
    'Press "i" for display statistic.\n');

blinkBlocks(0);
blinkOverlay(0);

document.addEventListener('keydown', function ( event ) {
    switch ( event.keyCode ) {
        case 32: // toggle blinking on Space bar
            stopped = !stopped;
            break;
        case 49:
            blinkBlocks(-STEP_DELAY);
            console.log('blocks generating delay: ' + newBlockDelay);
            break;
        case 50:
            blinkBlocks(STEP_DELAY);
            console.log('blocks generating delay: ' + newBlockDelay);
            break;
        case 51:
            blinkOverlay(-STEP_DELAY);
            console.log('overlay appearing delay: ' + overlayDelay);
            break;
        case 52:
            blinkOverlay(STEP_DELAY);
            console.log('overlay appearing delay: ' + overlayDelay);
            break;
        case 73: // get info on "i" button
            console.log('\ngenerated blocks: ' + counter + '\nblocks generating delay: ' + newBlockDelay +
                '\noverlay appearing delay: ' + overlayDelay);
            break;
    }
});
