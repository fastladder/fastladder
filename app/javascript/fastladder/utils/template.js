import { get as _$ } from './dom';

/*
 usage
  new Template("$id") -> $("id")
  new Template("aiueo") -> string
*/
export default class Template {
    static get(id) {
        const el = _$(id);
        // TODO refactor leter
        if (!el) {
            return new Template('test');
        }
        const isTextarea = el.tagName.toLowerCase() === 'textarea';
        const v = isTextarea ? el.value : el.innerHTML;
        return new Template(v);
    }

    constructor(str) {
        if (str.isTemplate) {
            str = str.tmpl;
        }
        this.tmpl = str;
        if (str.charAt(0) === '$') {
            const el = _$(str.slice(1));
            this.tmpl = el.tagName.toLowerCase() === 'textarea' ? el.value : el.innerHTML;
        }
        this.stash = {
            pre: {},
            params: {},
        };
        this.filters = [];
        this.filterForParam = {};
        this.useFilter = false;
        this.isTemplate = true;
    }

    fill(...args) {
        const builder = this.compile();
        return builder(...args);
    }

    preFill() {}

    addFilter(expr, filter) {
        this.useFilter = true;
        if (expr.isString) {
            const f = this.filterForParam;
            if (f[expr]) {
                f[expr].push(filter);
            } else {
                f[expr] = [filter];
            }
        } else if (expr.isFunction) {
            const f = value = filter(value);
            f.gate = expr;
            this.filters.push(f);
        }
    }

    addFilters(o) {
        Object.keys(o).forEach(key => this.addFilter(key, o[key]));
    }

    getParam(key) {
        const { params, pre } = this.stash;
        if (params.hasOwnProperty(key)) {
            return params[key];
        } else if (pre.hasOwnProperty(key)) {
            return pre[key];
        }
        return null;
    }

    filtered(key) {
        const value = this.getParam(key);
        let res = value;
        // filters
        if (this.filters.length) {
            this.filters.forEach((filter) => {
                if (filter.gate.call(this, value, key, this)) {
                    res = filter.call(this, res, key, this);
                }
            });
        } else if (this.filterForParam[key]) {
            this.filterForParam[key].forEach((filter) => {
                res = filter.call(this, res, key, this);
            });
        }
        return res;
    }

    makeBuilder(bufferRef) {
        const buf = bufferRef;
        return (...args) => {
            this.stash.params = {};
            args.forEach(p => Object.assign(this.stash.params, p));
            return buf.join('');
        };
    }

    compile(preVars) {
        const buf = [];
        const builder = this.makeBuilder(buf);
        const sep = /\[\[(.*?)\]\]/g;
        const { tmpl } = this;
        let offset = 0;
        tmpl.replace(sep, (...args) => {
            const { stash } = this;
            const matchText = args[0];
            const matchIdx = args[2];
            const key = args[1].trim();
            buf.push(tmpl.slice(offset, matchIdx));
            offset = matchIdx + matchText.length;
            const n = {};
            // function
            if (key.charAt(0) === '#') {
                const expr = key.match(/{(.*)}/)[1];
                const context = `with(this.param){return ${expr} }`;
                n.toString = new Function(context).bind(stash);
            } else {
                n.toString = () => {
                    const expr = stash.params[key];
                    const res = expr != null ?
                        expr.isFunction
                            ? `${expr()}`
                            : `${this.filtered(key)}`
                        : '';
                    return res;
                };
            }
            buf.push(n);
        });
        buf.push(tmpl.slice(offset));
        return builder;
    }
}
