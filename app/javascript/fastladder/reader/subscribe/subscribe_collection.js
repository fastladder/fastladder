import sumBy from 'lodash/sumBy';

export default class SubscribeCollection {
    constructor(list) {
        this.list = list;
        this.isCollection = true;
    }

    getList() {
        return this.list;
    }

    getUnreadCount() {
        return sumBy(this.list, 'unread_count');
    }
}
