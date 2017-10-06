export default class SubscribeItems {
    static _instance = null;

    static getInstance() {
        if (!this._instance) {
            this._instance = new SubscribeItems();
        }
        return this._instance;
    }

    static get(id) {
        return this.getInstance().get(id);
    }

    static set(id, data) {
        return this.getInstance().set(id, data);
    }

    constructor() {
        this.cache = {};
    }

    get(id) {
        return this.cache[`_${id}`];
    }

    set(id, data) {
        this.cache[`_${id}`] = data;
        return data;
    }
}
