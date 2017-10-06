import BrowserDetect from '../browser_detect';
import Pipe from '../pipe';

const filter = new Pipe();
const browser = new BrowserDetect();

if (browser.isKHTML) {
    filter.add((t) => {
        const esc = escape(t);
        return (esc.indexOf('%u') < 0 && esc.indexOf('%') > -1) ? decodeURIComponent(esc) : t;
    });
}

export default function ajax(url, onload) {
    const x = new XMLHttpRequest();
    x.onload = function () {
        const res = filter.call(x.responseText);
        onload(res);
    };
    x.open('GET', url, true);
    x.send('');
}
