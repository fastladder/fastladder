import fixLinktarget from '../../reader/commands/fix_linktarget';
import Pipe from '../pipe';
import ajax from './ajax';

const TT = {
    config: {
        base_url: `http://${location.host}`,
        image_base: `http://${location.host}`,
    },
};

const filter = new Pipe();
filter.add(txt => txt.replace(/\[%(.*?)\]/g, (_, key) => {
    const keys = key.split('.');
    try {
        return keys.reduce((object, property) => object[property], TT);
    } catch (e) {
        return '';
    }
}));

const globalCallback = new Pipe();
globalCallback.add((el) => {
    fixLinktarget(el);
    return el;
});

export default function ahah(url, id, onload = () => {}) {
    const uniq = new Date() - 0;
    ajax(`${url}?${uniq}`, (txt) => {
        const el = document.getElementById(id);
        const result = filter.call(txt);
        el.innerHTML = result;
        globalCallback.call(el);
        onload(result);
    });
}
