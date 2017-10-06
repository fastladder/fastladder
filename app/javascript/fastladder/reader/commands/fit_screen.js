import { styleUpdater } from '../../events/updater';
import Application from '../../ldr/application';
import BrowserDetect from '../../utils/browser_detect';
import { get as _$ } from '../../utils/dom';
import fitFullscreen from './fit_fullscreen';

const browser = new BrowserDetect();

export default function fitScreen() {
    const app = Application.getInstance();
    if (app.state.fullscreen) {
        return fitFullscreen();
    }
    const leftpaneWidth = app.state.leftpaneWidth;
    const bodyH = document.body.offsetHeight;
    const topPadding = _$('container').offsetTop;
    let bottomPadding = _$('footer').offsetHeight - 20;
    if (browser.isMac && browser.isFirefox) {
        bottomPadding += 20;
    }
    const ch = bodyH - topPadding - bottomPadding - 4;
    app.state.containerHeight = ch;
    styleUpdater.call(/container/);
}
