import API from '../ldr/api';
import Application from '../ldr/application';
import VARS from '../ldr/vars';
import Cache from '../utils/cache';
import removeClass from '../utils/css/remove_class';
import switchClass from '../utils/css/switch_class';
import { get as _$ } from '../utils/dom';
import printFeed from './commands/print_feed';
import touch from './commands/touch';
import SubscribeItems from './subscribe/subscribe_items';

const app = Application.getInstance();

function setFocus(id) {
    const el = _$(`subs_item_${id}`);
    if (app.state.lastElement) {
        removeClass(app.state.lastElement, 'fs-reading');
        touch(app.state.lastId, 'onclose');
    }
    if (el) {
        app.state.lastElement = el;
        app.state.lastId = id;
        switchClass(el, 'fs-reading');
        if (app.config.view_mode !== 'flat') {
            const tv = (() => {
                let target = el;
                while (target) {
                    if (/^treeview/.test(target.id)) {
                        return TreeView.getControl(target.id);
                    }
                    target = target.parentNode;
                }
                return null;
            })();
            tv && tv.open();
        }
        const sc = _$('subs_container');
        sc.scrollTop = el.offsetTop - sc.offsetTop - 64;
        sc.scrollLeft = 0;
    }
}

function getFirst(id, callback = () => {}) {
    app.state.viewrange.start = 0;
    app.state.hasNext = true;
    if (getUnread.cache.has(id)) {
        const cachedData = getUnread.cache.get(id);
        // 読み込み中
        if (cachedData === 'prefetch') {
            setTimeout(() => getFirst(id, callback), 10);
        } else {
            printFeed(cachedData);
            callback();
            setFocus(id);
        }
    } else {
        const api = new API('/api/all');
        setFocus(id);
        api.post({
            subscribe_id: id,
            offset: 0,
            limit: 1,
        }, (data) => {
            getUnread.cache.set(id, data);
            printFeed(data);
            callback();
        });
    }
}

function getUnread(id, callback = () => {}) {
    app.state.viewrange.start = 0;
    app.state.hasNext = true;
    const apiUrl = '/api/unread';

    function hasCache() {
        let cachedData = getUnread.cache.get(id);
        if (cachedData === 'prefetch') {
            const start = new Date() - 0;
            const retry = () => {
                const now = new Date() - 0;
                cachedData = getUnread.cache.get(id);
                if (cachedData !== 'prefetch') {
                    loaded(cachedData);
                } else if (now - start > VARS.PREFETCH_TIMEOUT) {
                    prefetchTimeout();
                } else {
                    setTimeout(retry, 100);
                }
            };
            setTimeout(retry, 100);
            return;
        }
        function loaded(cachedData) {
            printFeed(cachedData);
            callback();
            setFocus(id);
        }
        loaded(cachedData);
    }
    function noCache() {
        const api = new API(apiUrl);
        let success = false;
        setFocus(id);
        api.post({ subscribe_id: id }, (data) => {
            success = true;
            getUnread.cache.set(id, data);
            printFeed(data);
            callback();
        });
        // release lock
        setTimeout(() => {
            if (!success) {
                app.state.requested = false;
            }
        }, VARS.LOCK_TIMEOUT);
    }
    function prefetchTimeout() {
        // unlock
        app.state.requested = false;
        appUrl = '/api/unread?timeout';
        noCache();
    }

    getUnread.cache.has(id) ? hasCache() : noCache();
}

getUnread.cache = new Cache({ max: 50 });

const Control = {
    scrollTop() {
        const target = _$('right_container');
        target.scrollTop = 0;
    },

    delScrollPadding() {},

    read(sid, todo) {
        // 全件表示で未読0件のフィードを表示
        if (app.config.show_all === true) {
            const sub = SubscribeItems.get(sid);
            if (sub && sub.unread_count === 0) {
                getFirst(sid, todo);
            } else {
                getUnread(sid, todo);
            }
        } else {
            getUnread(sid, todo);
        }
    },
};

export default Control;
