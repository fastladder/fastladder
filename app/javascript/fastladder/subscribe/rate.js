import { delegate } from 'rails-ujs';

export default class Rate {
    static debug = false;
    static imagePath = '/img/rate/';
    static imagePathP = '/img/rate/pad/';

    static create(callback, defaultRate) {
        const el = document.createElement('img');
        el.src = Rate.padImg(defaultRate || 0);
        el.addEventListener('mousemove', Rate.hover.bind(el));
        el.addEventListener('mouseout', Rate.out.bind(el));
        el.addEventListener('click', (e) => {
            const value = Rate.click.call(el, e);
            callback(value);
        });
        const div = document.createElement('div');
        Object.assign(div.style, {
            paddingTop: '2px',
            position: 'relative',
        });
        div.appendChild(el);
        return div;
    }

    static img(n) {
        return `${Rate.imagePath}${n}.gif`;
    }

    static padImg(n) {
        return `${Rate.imagePathP}${n}.gif`;
    }

    static _calcRate(e) {
        const el = this;
        const imgW = el.offsetWidth;
        const cell = imgW / 6;
        let offsetX = !isNaN(e.offsetX) ? e.offsetX : e.layerX - el.offsetLeft;
        if (offsetX === 0) {
            offsetX++;
        }
        if (offsetX > imgW) {
            offsetX = imgW;
        }
        const rate = Math.ceil(offsetX / cell) - 1;
        if (Rate.debug) {
            window.status = [imgW, cell, el.offsetLeft, e.layerX, offsetX];
        }
        return rate;
    }

    static click(e) {
        const el = this;
        const rate = Rate._calcRate.call(this, e);
        el.src = Rate.padImg(rate);
        el.setAttribute('orig_src', el.src);
        return rate;
    }

    static out() {
        const el = this;
        const src = el.getAttribute('orig_src');
        if (src) {
            el.src = src;
        }
    }

    static hover(e) {
        const el = this;
        if (!el.getAttribute('orig_src')) {
            el.setAttribute('orig_src', el.src);
        }
        const rate = Rate._calcRate.call(this, e);
        el.src = Rate.padImg(rate);
    }
}
