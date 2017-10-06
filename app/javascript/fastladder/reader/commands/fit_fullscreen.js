import { styleUpdater } from '../../events/updater';
import Application from '../../ldr/application';
import { get as _$ } from '../../utils/dom';

export default function fitFullscreen() {
    const app = Application.getInstance();
    const bodyH = document.body.offsetHeight;
    const topPadding = _$('container').offsetTop;
    app.state.containerHeight = bodyH - topPadding + 16;
    styleUpdater.call(/container/);
}
