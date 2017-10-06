import isFunction from 'lodash/isFunction';
import isRegExp from 'lodash/isRegExp';
import { get as _$ } from '../utils/dom';

export default class Updater {
    constructor() {
        this.hash = {};
    }

    addCallback(label, callback) {
        this.hash[label] = callback;
    }

    call(label) {
        if (isRegExp(label)) {
            Object.keys(this.hash)
                .filter(key => label.test(key) && isFunction(this.hash[key]))
                .forEach(key => this.hash[key](_$(key)));
        } else if (isFunction(this.hash[label])) {
            this.hash[label](_$(label));
        }
    }
}

export const updater = new Updater();

export const styleUpdater = new Updater();
