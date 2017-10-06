import isFunction from 'lodash/isFunction';

export default class Hook {
    isHook = true;

    constructor() {
        this.callbacks = [];
    }

    add(f) {
        this.callbacks.push(f);
    }

    exec(...args) {
        this.callbacks.forEach(f => isFunction(f) && f(...args));
    }

    clear() {
        this.callbacks = [];
    }
}
