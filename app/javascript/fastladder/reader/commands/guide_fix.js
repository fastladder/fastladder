import BrowserDetect from '../../utils/browser_detect';
import hasClass from '../../utils/css/has_class';

const browser = new BrowserDetect();

export default function guideFix() {
    if (!hasClass('right_container', 'mode-guide')) {
        return;
    }
    if (browser.isIE) {
        const guideRankBody = _$('guiderankbody');
        if (!guideRankBody) {
            return;
        }
        const width = _$('right_container').offsetWidth - 15;
        guideRankBody.style.width = `${width}px`;
    }
}
