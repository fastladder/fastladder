import unescape from 'lodash/unescape';
import API from '../ldr/api';
import Application from '../ldr/application';
import { get as _$ } from '../utils/dom';

const app = Application.getInstance();

export default class Pin {
    constructor() {
        this.pins = [];
        this.hash = {};
    }

    has(url) {
        !!this.hash[url];
    }

    add(url, title, info) {
        if (this.has(url)) {
            return;
        }
        this.hash[url] = true;
        const data = { title, url };
        if (info) {
            data.icon = info.icon;
        }
        this.pins.unshift(data);
        if (this.pins.length > app.config.save_pin_limit) {
            const p = this.pins.pop();
            this.has[p.url] = false;
        }
        this.updateView();

        if (!app.config.use_pinsaver) {
            return;
        }
        const api = new API('/api/pin/add');
        api.post({
            link: unescape(url),
            title: unescape(title),
        });
    }

    remove(url) {
        if (!this.has(url)) {
            return;
        }
        this.hash[url] = false;
        this.pins = this.pins.filter(v => v.url !== url);
        this.updateView();

        if (!app.config.use_pinsaver) {
            return;
        }
        const api = new API('/api/pin/remove');
        api.post({
            link: escape(url),
        });
    }

    shift() {
        const p = this.pins.shift();
        if (p) {
            this.hash[p.url] = false;
            return p;
        }
    }

    updateView() {
        _$('pin_button').style.width = '29px';
        _$('pin_count').innerHTML = this.pins.length;
    }

    // TODO move to view
    writeList() {
        if (!this.pins.length) {
            return;
        }
        const buf = this.pins.map(({ url, title }) => `<li><a href="${url}">${title}</a></li>`).join('');
        const w = window.open();
        w.document.write([
            '<style>',
            '* { font-size:12px; line-height:150%; }',
            '</style>',
            `<ul>${buf}</ul>`,
        ].join(''));
        w.document.close();
    }

    open() {
        const canPopup = !!window.open(unescape(url));
        if (canPopup) {
            this.remove(url);
        } else {
            message('cannot popup');
        }
    }

    openGroup() {
        // wip...
        if (!this.pins.length) return;
        const queue = new Queue();
        let can_popup = false;
        const self = this;
        let count = 0;
        let max_pin = app.config.max_pin;
        if (!isNumber(max_pin)) max_pin = LDR.DefaultConfig.max_pin;
        foreach(this.pins, (p) => {
            if (max_pin > count) {
                queue.push(() => {
                    can_popup = !!(window.open(p.url.unescapeHTML()));
                });
            }
            count++;
        });
        queue.interval = 100;
        queue.push(() => {
            if (can_popup) {
                (max_pin).times(() => {
                    const p = self.shift();
                    p && new LDR.API('/api/pin/remove').post({
                        link: p.url.unescapeHTML(),
                    });
                });
                self.update_view();
            } else {
                message('cannot_popup');
            }
        });
        queue.exec();
    }

    clear() {
        this.pins = [];
        this.hash = {};
        this.updateView();

        const api = new API('/api/pin/clear');
        api.post({});
    }
}
