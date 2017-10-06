import sumBy from 'lodash/sumBy';
import Application from '../../ldr/application';
import SubscribeCollection from './subscribe_collection';
import SubscribeItems from './subscribe_items';

export default class SubscribeModel {
    constructor() {
        this.loaded = false;
        this.id2subs = null;
        this.limited = null;
        this.folderCount = null;
        this.folderUnread = null;
        this.folderNames = null;
    }

    load(list) {
        this.loadStart();
        this.loadPartialData(list);
        this.loadData(list);
    }

    loadData(list) {
        this.loaded = true;
        this.list = list;
        this.generateCache();
    }

    loadStart() {
        this.id2subs = {};
        this.folderCount = {};
        this.folderNames = [];
        this.rate2subs = {};
        this.rateNames = [5, 4, 3, 2, 1, 0];
        this.maxSubs = 0;
        this.minSubs = Number.POSITIVE_INFINITY;
        this.unreadCountCache = 0;
        this.unreadFeedsCountCache = 0;
    }

    loadPartialData(list) {
        this._generateCache(list);
    }

    getList() {
        const app = Application.getInstance();
        if (app.config.use_limit_subs && app.config.limit_subs) {
            return this.list.slice(0, app.config.limit_subs);
        }
        return this.list;
    }

    generateCache() {
        this.folderNames = Object.keys(this.folderCount);
        this.makeSubscribersNames();
    }

    // partial
    _generateCache(list) {
        function push(obj, key, value) {
            if (obj[key]) {
                obj[key].push(value);
            } else {
                obj[key] = [value];
            }
        }

        list.forEach((v) => {
            SubscribeItems.set(v.subscribe_id, v);
            this.id2subs[v.subscribe_id] = v;
            push(this.rate2subs, v.rate, v);
            const t = this.folderCount[v.folder];
            this.folderCount[v.folder] = t ? t + 1 : 1;
            this.maxSubs = Math.max(this.maxSubs, v.subscribers_count);
            this.minSubs = Math.min(this.minSubs, v.subscribers_count);
            if (v.unread_count) {
                this.unreadFeedsCountCache++;
            }
        });
        this.unreadCountCache += sumBy(list, 'uunread_count');
    }

    makeDomainNames() {}

    makeSubscribersNames() {
        const { length: len } = this.list;
        const split = 6;
        const limit = len / split;
        const subsCounts = this.list.map(item => item.subscribers_count);
        subsCounts.sort((a, b) => (a === b ? 0 : a > b ? 1 : -1));
        const res = [];
        let pos = 0;
        let begin = this.minSubs;
        subsCounts.forEach((v) => {
            if (pos > limit) {
                const end = Math.max(begin + 1, v);
                res.push(`${begin}-${end}`);
                begin = end;
                pos = 0;
            }
            pos++;
        });
        res.push(`${begin}-${Math.max(begin + 1, this.maxSubs)}`);
        res.reverse();
        this.subscribersNames = res;
        return res;
    }

    // 任意フィルタ
    filter(callback) {
        const filtered = this.list.filter(callback);
        return new SubscribeCollection(filtered);
    }

    getFolderNames() {
        return this.folderNames || [];
    }

    getRateNames() {
        return this.rateNames || [];
    }

    getSubscribersNames() {}

    getDomainNames() {}

    getById() {}

    getByFolder(name) {
        const filtered = this.getList().filter(item => item.folder === name);
        return new SubscribeCollection(filtered);
    }

    getByRate() {}

    getBySubscribersCount() {}

    getByDomain() {}

    getUnreadFeeds() {}

    getUnreadFeeds_count() {}

    getUnreadCount() {}
}
