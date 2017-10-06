import { get as _$ } from '../utils/dom';

export default class Finder {
    constructor(id) {
        this.input = _$(id);
        this.enable = true;
        this.callback = [];
        this.input.style.color = '#444';
        let old = '';
        setInterval(() => {
            const q = this.input.value;
            if (old !== q) {
                old = q;
                this.callback.forEach(c => c(q));
            }
        }, 600);
    }

    addCallback(callback) {
        this.callback.push(callback);
    }

    clear() {
        this.input.value = '';
    }

    focus() {
        this.input.focus();
    }
}
