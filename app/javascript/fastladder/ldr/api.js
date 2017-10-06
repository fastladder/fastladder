import isFunction from 'lodash/isFunction';
import URLSearchParams from 'url-search-params';

const noop = () => {};

function toQuery(object) {
    return Object.entries(object).reduce((searchParams, [name, value]) => {
        searchParams.set(name, value);
        return searchParams;
    }, new URLSearchParams()).toString();
}

export default class API {
    static StickyQuery = {};
    static lastResponse = '';

    static registerCallback = (options) => {
        Object.keys(options).forEach((key) => {
            const value = options[key];
            API.prototype[`on${key}`] = value;
        });
    };

    constructor(ap) {
        this.ap = ap;
        this.rawMode = false;
    }

    onCreate() {}

    onComplete() {}

    post(param = {}, onload = this.onload) {
        const req = this.req = new XMLHttpRequest();
        const onComplete = this.onComplete;
        if (!isFunction(onload)) {
            onload = noop;
        }
        Object.assign(param, API.StickyQuery);
        const postData = toQuery(param);
        req.open('POST', this.ap, true);
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // req.onreadystatechange = () => {
        //     window.status = req.readyState;
        // }
        req.onload = () => {
            onComplete();
            // alert([this.ap, req.responseText.length]);
            API.lastResponse = req.responseText;
            if (this.rawMode) {
                onload(this.req.responseText);
            } else {
                const json = JSON.parse(this.req.responseText);
                if (json) {
                    onload(json);
                } else {
                    message('Unable to load data');
                    showError();
                }
            }
            this.req = null;
        };
        // alert(postData);
        this.onCreate();
        req.send(postData);
        return this;
    }

    get(params = {}, onload = this.onload) {
        const req = this.req = new XMLHttpRequest();
        const onComplete = this.onComplete;
        if (!isFunction(onload)) {
            onload = noop;
        }
        const postData = toQuery(param);
        req.open('GET', `${this.ap}?${postData}`, true);
        req.onload = () => {
            onComplete();
            API.lastResponse = req.responseText;
            const json = JSON.parse(req.responseText);
            if (json) {
                onload(json);
            } else {
                message('Unable to load data');
            }
            this.req = null;
        };
        this.onCreate();
        req.send(null);
        return this;
    }

    requester(method, param) {
        return onload => this[method.toLowerCase()](param, onload);
    }

    onload() {}

    onerror(errorCode) {
        alert(`エラーコード :${errorCode}`);
    }
}
