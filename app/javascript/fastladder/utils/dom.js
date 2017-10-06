import setStyle from './css/set_style';

/* DOM  */
const cache = {};

const DOM = {
    get(el) {
        if (typeof el !== 'string') {
            return el;
        }

        if (!DOM.get.cacheable[el]) {
            return document.getElementById(el);
        }

        if (!cache[el]) {
            cache[el] = document.getElementById(el);
        }

        return cache[el];
    },

    create(tag, attributes = {}, children = []) {
        const el = document.createElement(tag);
        Object.keys(attributes).forEach((key) => {
            const value = attributes[key];
            el.setAttribute(key, value);
        });
        children.forEach(child => el.appendChild(child));
        return el;
    },

    build(obj) {},

    remove(el) {
        el = DOM.get(el);
        el.parentNode.removeChild(el);
    },

    hide(el) {
        el = DOM.get(el);
        el.style.display = 'none';
    },

    show(el) {
        el = DOM.get(el);
        el.style.display = 'block';
    },

    clone(el) {
        return el.cloneNode(true);
    },

    insert(p, el, point) {
        p.insertBefore(el, point);
    },

    scrollTop(el) {
        el = DOM.get(el);
        return el.scrollTop;
    },

    move(el, x, y) {
        el = DOM.get(el);
        setStyle(el, {
            left: `${x}px`,
            top: `${y}px`,
        });
    },
};

DOM.get.cacheable = {};

export default DOM;
export const get = DOM.get;
