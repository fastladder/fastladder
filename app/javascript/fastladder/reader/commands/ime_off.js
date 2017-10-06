import BrowserDetect from '../../utils/browser_detect';

const browser = new BrowserDetect();

let Keybind;

export default function imeOff(msg) {
    if (!browser.isFirefox || !browser.isWin) {
        return;
    }
    const s = document.createElement('span');
    s.innerHTML = '<input type="password" id="ime_off" style="visibility:hidden">';
    document.body.appendChild(s);
    setTimeout(() => {
        try {
            const el = document.getElementById('ime_off');
            if (el) {
                el.focus();
                document.body.removeChild(s);
                Keybind.lastInvoke = null;
                if (msg) {
                    message('IMEをオフにしました');
                }
            }
        } catch (e) {
            window.__ERROR__ = e;
        }
    }, 10);
}
