import getStyle from './css/get_style';
import { get as _$ } from './dom';

var Position = {
    // set to true if needed, warning: firefox performance problems
    // NOT neeeded for page scrolling, only if draggable contained in
    // scrollable elements
    includeScrollOffsets: false,

    // must be called before calling withinIncludingScrolloffset, every time the
    // page is scrolled
    prepare() {
        this.deltaX = window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
        this.deltaY = window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
    },

    realOffset(element) {
        let valueT = 0,
            valueL = 0;
        do {
            valueT += element.scrollTop || 0;
            valueL += element.scrollLeft || 0;
            element = element.parentNode;
        } while (element);
        return [valueL, valueT];
    },

    cumulativeOffset(element) {
        let valueT = 0,
            valueL = 0;
        do {
            valueT += element.offsetTop || 0;
            valueL += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);
        return [valueL, valueT];
    },

    positionedOffset(element) {
        let valueT = 0,
            valueL = 0;
        do {
            valueT += element.offsetTop || 0;
            valueL += element.offsetLeft || 0;
            element = element.offsetParent;
            if (element) {
                p = getStyle(element, 'position');
                if (p == 'relative' || p == 'absolute') break;
            }
        } while (element);
        return [valueL, valueT];
    },

    offsetParent(element) {
        if (element.offsetParent) return element.offsetParent;
        if (element == document.body) return element;

        while ((element = element.parentNode) && element != document.body) {
            if (getStyle(element, 'position') != 'static') { return element; }
        }

        return document.body;
    },

    // caches x/y coordinate pair to use with overlap
    within(element, x, y) {
        if (this.includeScrollOffsets) { return this.withinIncludingScrolloffsets(element, x, y); }
        this.xcomp = x;
        this.ycomp = y;
        this.offset = this.cumulativeOffset(element);

        return (y >= this.offset[1] &&
            y < this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x < this.offset[0] + element.offsetWidth);
    },

    withinIncludingScrolloffsets(element, x, y) {
        const offsetcache = this.realOffset(element);

        this.xcomp = x + offsetcache[0] - this.deltaX;
        this.ycomp = y + offsetcache[1] - this.deltaY;
        this.offset = this.cumulativeOffset(element);

        return (this.ycomp >= this.offset[1] &&
            this.ycomp < this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp < this.offset[0] + element.offsetWidth);
    },

    // within must be called directly before
    overlap(mode, element) {
        if (!mode) return 0;
        if (mode == 'vertical') {
            return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
        }
        if (mode == 'horizontal') {
            return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
        }
    },

    clone(source, target) {
        source = _$(source);
        target = _$(target);
        target.style.position = 'absolute';
        const offsets = this.cumulativeOffset(source);
        target.style.top = `${offsets[1]}px`;
        target.style.left = `${offsets[0]}px`;
        target.style.width = `${source.offsetWidth}px`;
        target.style.height = `${source.offsetHeight}px`;
    },

    page(forElement) {
        let valueT = 0,
            valueL = 0;

        let element = forElement;
        do {
            valueT += element.offsetTop || 0;
            valueL += element.offsetLeft || 0;

            // Safari fix
            if (element.offsetParent == document.body) { if (getStyle(element, 'position') == 'absolute') break; }
        } while (element = element.offsetParent);

        element = forElement;
        do {
            valueT -= element.scrollTop || 0;
            valueL -= element.scrollLeft || 0;
        } while (element = element.parentNode);

        return [valueL, valueT];
    },

    clone(source, target) {
        const options = Object.extend({
            setLeft: true,
            setTop: true,
            setWidth: true,
            setHeight: true,
            offsetTop: 0,
            offsetLeft: 0,
        }, arguments[2] || {});

        // find page position of source
        source = _$(source);
        const p = Position.page(source);

        // find coordinate system to use
        target = _$(target);
        let delta = [0, 0];
        let parent = null;
        // delta [0,0] will do fine with position: fixed elements,
        // position:absolute needs offsetParent deltas
        if (getStyle(target, 'position') == 'absolute') {
            parent = Position.offsetParent(target);
            delta = Position.page(parent);
        }

        // correct by body offsets (fixes Safari)
        if (parent == document.body) {
            delta[0] -= document.body.offsetLeft;
            delta[1] -= document.body.offsetTop;
        }

        // set position
        if (options.setLeft) target.style.left = `${p[0] - delta[0] + options.offsetLeft}px`;
        if (options.setTop) target.style.top = `${p[1] - delta[1] + options.offsetTop}px`;
        if (options.setWidth) target.style.width = `${source.offsetWidth}px`;
        if (options.setHeight) target.style.height = `${source.offsetHeight}px`;
    },

    absolutize(element) {
        element = _$(element);
        if (element.style.position == 'absolute') return;
        Position.prepare();

        const offsets = Position.positionedOffset(element);
        const top = offsets[1];
        const left = offsets[0];
        const width = element.clientWidth;
        const height = element.clientHeight;

        element._originalLeft = left - parseFloat(element.style.left || 0);
        element._originalTop = top - parseFloat(element.style.top || 0);
        element._originalWidth = element.style.width;
        element._originalHeight = element.style.height;

        element.style.position = 'absolute';
        element.style.top = `${top}px`;
        element.style.left = `${left}px`;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
    },

    relativize(element) {
        element = _$(element);
        if (element.style.position == 'relative') return;
        Position.prepare();

        element.style.position = 'relative';
        const top = parseFloat(element.style.top || 0) - (element._originalTop || 0);
        const left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);

        element.style.top = `${top}px`;
        element.style.left = `${left}px`;
        element.style.height = element._originalHeight;
        element.style.width = element._originalWidth;
    },
};

// Safari returns margins on body which is incorrect if the child is absolutely
// positioned.  For performance reasons, redefine Position.cumulativeOffset for
// KHTML/WebKit only.
if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) {
    Position.cumulativeOffset = (element) => {
        let valueT = 0,
            valueL = 0;
        do {
            valueT += element.offsetTop || 0;
            valueL += element.offsetLeft || 0;
            if (element.offsetParent == document.body) { if (Element.getStyle(element, 'position') == 'absolute') break; }

            element = element.offsetParent;
        } while (element);

        return [valueL, valueT];
    };
}

Position.cumulativeOffsetFrom = (element, from) => {
    let valueT = 0,
        valueL = 0;
    do {
        valueT += element.offsetTop || 0;
        valueL += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element && element != from);
    return [valueL, valueT];
};

export default Position;
