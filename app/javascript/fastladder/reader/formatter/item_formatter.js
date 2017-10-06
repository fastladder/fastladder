import DateTime from '../../utils/date_time';
import Template from '../../utils/template';

const Filter = {
    paddingLeft(str) {
        return v => (v ? str + v : '');
    },

    sandwich(l, r) {
        return v => (v ? l + v + r : '');
    },

    author(v) {
        return Filter.paddingLeft('by ')(v);
    },

    created_on(v) {
        return Filter.paddingLeft('投稿: ')(Filter.toDate(v));
    },

    modified_on(v) {
        return Filter.paddingLeft(' | 更新: ')(Filter.toDate(v));
    },

    toDate(v) {
        return v ? new DateTime(v * 1000).toString() : '';
    },

    toRelativeDate(v) {
        // wip
        return v;
    },

    enclosure(v, k, tmpl) {
        if (!v) {
            return '';
        }
        const t = tmpl.getParam('enclosure_type') || '';
        return `<a href="${v}">DL : ${t}</a>`;
    },

    category(v, k, tmpl) {
        if (!v) {
            return '';
        }
        return v.split(' ').join('&nbsp;');
    },
};

export default class ItemFormatter {
    static TMPL = Template.get('inbox_items');

    constructor() {
        this.tmpl = new Template(ItemFormatter.TMPL);
        const filters = {
            created_on: Filter.created_on,
            modified_on: Filter.modified_on,
            author: Filter.author,
            enclosure: Filter.enclosure,
            category: Filter.category,
        };
        this.tmpl.addFilter(filters);
    }

    compile() {
        return this.tmpl.compile();
    }

    resetCount() {
        this.itemCount = 0;
    }
}
