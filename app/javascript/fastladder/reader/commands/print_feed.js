import I18n from 'i18n-js';
import Application from '../../ldr/application';
import VARS from '../../ldr/vars';
import Control from '../../reader/control';
import SubscribeItems from '../../reader/subscribe/subscribe_items';
import DOM, { get as _$ } from '../../utils/dom';
import FeedFormatter from '../formatter/feed_formatter';
import ItemFormatter from '../formatter/item_formatter';
import fixLinktarget from './fix_linktarget';
import touch from './touch';

const app = Application.getInstance();

// wip
const channelWidgets = { process: () => {} };
const entryWidgets = { process: () => {} };

export default function printFeed(feed) {
    app.invokeHook('BEFORE_PRINTFEED', feed);
    const {
        subscribe_id: subscribeId,
        channel,
        items,
    } = feed;

    app.state.lastFeed = feed;
    app.state.lastItems = {};
    app.state.requested = false;
    app.state.nowReading = subscribeId;

    const now = (new Date() - 0) / 1000;
    const output = _$(printFeed.target);
    if (app.config.reverse_mode) {
        items.reverse();
    }
    if (app.config.max_view && app.config.max_view < items.length) {
        item.length = Math.max(1, app.config.max_view);
    }
    const itemFormatter = new ItemFormatter().compile();
    let adsExpire = null;
    let feedFormatter;
    if (feed.ad) {
        feedFormatter = new FeedFormatter({ ads: 1 }).compile();
        adsExpire = Math.max(1, Math.ceil((feed.ad.expires_on - now) / (24 * 60 * 60)));
    } else {
        feedFormatter = new FeedFormatter().compile();
    }
    let itemCount = 0;
    const itemF = (v) => {
        itemCount++;
        app.state.lastItems[`_${v.id}`] = v;
        return itemFormatter(v, {
            ralative_date: v.created_on ? now - v.created_on : I18n.t('Unknown date'),
            item_count: itemCount,
            widgets: entryWidgets.process(feed, v),
            pin_active: app.pin.has(v.link) ? 'pin_active' : '',
            pinned: app.pin.has(v.link) ? 'pinned' : '',
            loop_context: [
                itemCount === 1 ? 'first' : '',
                itemCount % 2 ? 'odd' : 'event',
                itemCount === size ? 'last' : '',
                itemCount !== 1 && itemCount !== size ? 'inner' : '',
            ].join(' '),
        });
    };

    const subscribeInfo = SubscribeItems.get(subscribeId);
    const size = items.length;
    app.state.viewrange.end = app.state.viewrange.start + size;

    const firstWriteNum = VARS.PRINT_FEED_FIRST_NUM;
    output.innerHTML = feedFormatter(feed, channel, subscribeInfo, {
        ads_expire: adsExpire,
        widgets: channelWidgets.process(feed, items),
        items: () => items.slice(0, firstWriteNum).map(itemF).join(''),
    });
    fixLinktarget();

    app.state.writer && clearTimeout(app.state.writer);
    app.state.writer2 && clearTimeout(app.state.writer2);
    function DIV(text) {
        const div = document.createElement('div');
        div.innerHTML = text;
        fixLinktarget(div);
        return div;
    }

    // 遅延描画
    let more;
    let writed;
    function pushItem() {
        const num = VARS.PRINT_FEED_NUM;
        const delay = VARS.PRINT_FEED_DELAY;
        const delay2 = VARS.PRINT_FEED_DELAY2;

        const writer = () => {
            const remainItems = items.slice(writed, writed + num).map(itemF).join('');
            writed += num;
            if (more.className) {
                more.className = 'hide';
                more.innerHTML = '';
            }
            app.state.write2 = setTimeout(() => {
                more.appendChild(DIV(remainItems));
                more.className = '';
            }, 10);
            if (writed < size) {
                app.state.writer = setTimeout(writer, delay2);
            }
        };
        app.state.write = setTimeout(writer, delay);
    }
    if (items.length > firstWriteNum) {
        more = DOM.create('div', { class: 'more' });
        more.innerHTML = '描画中';
        output.appendChild(more);
        writed = firstWriteNum;
        pushItem();
    }

    Control.scrollTop();
    Control.delScrollPadding();
    touch(app.state.nowReading, 'onload');
    printFeed.target = 'right_body';
    app.invokeHook('AFTER_PRINTFEED', feed);
}

printFeed.target = 'right_body';
