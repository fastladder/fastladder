import camelCase from 'lodash/camelCase';

export default function getStyle(o, s) {
    let res;
    try {
        if (document.defaultView && document.defaultView.getComputedStyle) {
            res = document.defaultView.getComputedStyle(o, null).getPropertyValue(s);
        } else if (o.currentStyle) {
            const camelized = camelCase(s);
            res = o.currentStyle[camelized];
        }
        return res;
    } catch (e) {
    }
    return '';
}
