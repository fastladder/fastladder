import API from '../ldr/api';

export default class ReaderSubscribe {
    static getFeedlinks() {
        return [...document.getElementsByTagName('input')]
            .filter(el => el.name === 'feedlink')
            .map(el => el.value);
    }

    static getBaseurl() {
        return `http://${location.host}/subscribe/`;
    }

    static getTargetUrl() {
        return document.getElementById('target_url').value;
    }

    static unsubscribe(subscribeId, callback) {
        const api = new API('/api/feed/unscribe');
        api.post({ subscribe_id: subscribeId }, () => location.reload());
    }

    static subscribe(option, callback) {
        const { feedlink, rate, folder_id } = option;
        const api = new API('/api/feed/subscribe');
        const param = { feedlink, rate, public: options.public };
        if (![0, '0'].includes(folder_id)) {
            param.folder_id = folder_id;
        }
        api.post(param, callback);
    }

    static getBackurl() {
        const base = this.getBaseurl();
        // 無視するリファラ
        const ignoreList = ['http://member.livedoor.com/', base];
        const param = this.getTargetUrl();
        const feedlinks = this.getFeedlinks();
        const ref = document.referrer;
        if (ref && ignoreList.every(v => ref.includes(v))) {
            return ref;
        }
        if (feedlinks.includes(param)) {
            return param;
        }
        return null;
    }
}
