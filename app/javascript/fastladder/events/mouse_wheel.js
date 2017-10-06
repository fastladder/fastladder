/* Event */
Event.observeWheel = function (el, callback) {
    const browser = new BrowserDetect();
    // IE
    if (browser.isIE) {
        Event.observe(el, 'mousewheel', (e) => {
            Event.stop(e);
            callback(e.wheelDelta / -120);
        });
    } else if (browser.isOpera) {
        Event.observe(el, 'mousewheel', (e) => {
            Event.stop(e);
            callback(e.wheelDelta / 120);
        });
    } else if (browser.isGecko) {
        Event.observe(el, 'DOMMouseScroll', (e) => {
            Event.stop(e);
            callback(e.detail / 3);
        });
    } else if (browser.isKHTML) {
        el.onmousewheel = function (e) {
            Event.stop(e);
            callback(e.wheelDelta / -120);
        };
    }
};

