export default class Cache {
    constructor({ max } = {}) {
        this._index = {};
        this._expires = {};
        this._cache = [];
        this.max = max || 0;
    }

    _get(key) {
        return this._index[`_${key}`];
    }

    get(key) {
        return this._get(key)[1];
    }

    set(key, value) {
        // delete
        if (this.max && this._cache.length > this.max) {
            const toDelete = this._cache.shift();
            delete this._index[`_${toDelete[0]}`];
        }
        // update
        if (this.has(key)) {
            this._get(key)[1] = value;
        } else {
            // create
            const pair = [key, value];
            this._cache.push(pair);
            this._index[`_${key}`] = pair;
        }
        return value;
    }

    setExpr(key, expr) {
        this._exprs[`_${key}`] = expr;
    }

    getExpr(key) {
        return this._exprs[`_${key}`] || null;
    }

    checkExpr(key) {
        const expr = this.getExpr(key);
        if (expr) {
            const r = new Date() - expr;
            const f = r < 0;
            return f;
        }
        return true;
    }

    has(key) {
        return this._index.hasOwnProperty(`_${key}`) && this.checkExpr(key);
    }

    clear() {
        this._index = {};
        this._cache = [];
    }

    findOrCreate(key, callback) {
        return this.has(key) ? this.get(key) : this.set(key, callback());
    }
}
