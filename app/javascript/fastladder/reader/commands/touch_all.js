import { updater } from '../../events/updater';
import API from '../../ldr/api';
import Application from '../../ldr/application';
import switchClass from '../../utils/css/switch_class';
import { get as _$ } from '../../utils/dom';
import SubscribeItems from '../subscribe/subscribe_items';

const app = Application.getInstance();

export default function touchAll(id) {
    if (!id) {
        return;
    }
    const api = new API('/api/touch_all');
    const el = _$(`subs_item_${id}`);
    const info = SubscribeItems.get(id);
    if (el && info) {
        el.innerHTML = info.title;
        switchClass(el, 'rs-read');
    }
    if (info && info.unread_count !== 0) {
        const unread = info.unread_count;
        app.subs.model.unread_count_cache -= unread;
        app.subs.model.unread_feeds_count_cache -= 1;
        info.unread_count = 0;
        api.post({ subscribe_id: id }, () => {
            // message('Marked as read');
            updater.call('total_unread_count');
        });
    }
}
