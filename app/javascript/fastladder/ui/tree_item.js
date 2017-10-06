import Cache from '../utils/cache';
import Template from '../utils/template';

export default class TreeItem {
    static cache = new Cache();
    static formatter = Template.get('subscribe_item').compile();

    constructor(data) {
        this.item = { ...data };
        if (this.item.unreadCount === 0) {
            this.item.classname = 'rs-read';
        } else if (this.item.cached) {
            this.item.classname = 'ps-prefetched';
        } else {
            this.item.classname = '';
        }
    }

    toString() {
        return TreeItem.formatter(this.item);
    }
}
