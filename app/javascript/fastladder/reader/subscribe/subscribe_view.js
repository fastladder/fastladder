import isElement from 'lodash/isElement';
import { get as _$ } from '../../utils/dom';

export default class SubscribeView {
    constructor(element) {
        this.element = _$(element);
    }

    print(v) {
        if (isElement(v) || v.nodeType === 11) {
            this.element.appendChild(v);
        } else {
            this.element.innerHTML = v;
        }
    }

    clear() {
        this.print('');
    }

    setClass(v) {
        this.element.className = v;
    }

    addClass(v) {
        this.element.classList.add(v);
    }

    removeClass(v) {
        this.element.classList.remove(v);
    }
}
