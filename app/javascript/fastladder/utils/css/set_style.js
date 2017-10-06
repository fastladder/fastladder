import camelCase from 'lodash/camelCase';
import isString from 'lodash/isString';
import { get as _$ } from '../dom';
import parseCSS from './parse_css';

export default function setStyle(element, style) {
    element = _$(element);
    const es = element.style;
    if (isString(style)) {
        if (es.cssText) {
            es.cssText = style;
        } else {
            setStyle(element, parseCSS(style));
        }
    } else {
        Object.keys(style).forEach((key) => {
            let value = style[key];
            if (setStyle.hack.hasOwnProperty(key)) {
                [key, value] = setStyle.hack[key](key, value);
            }
            element.style[camelCase(key)] = value;
        });
    }
}

setStyle.hack = {
    opacity(key, value) {
        if (!/MSIE/.test(navigator.userAgent)) {
            return [key, value];
        }

        return ['filter', `alpha(opacity=${value * 100})`];
    },
};
