import isFunction from 'lodash/isFunction';
import DOM from '../utils/dom';
import HTML from '../utils/html';

export default class TreeView {
    static lazy = false;
    static icon_plus = [
        HTML.IMG({ src: '/img/icon/m.gif' }),
        HTML.IMG({ src: '/img/icon/p.gif' }),
    ];
    static icon_open = [
        HTML.IMG({ src: '/img/icon/m.gif' }) + HTML.IMG({ src: '/img/icon/open.gif' }),
        HTML.IMG({ src: '/img/icon/p.gif' }) + HTML.IMG({ src: '/img/icon/close.gif' }),
    ];
    static count = 0;
    static instance = {};

    static getControl() {
        return TreeView.instance[id];
    }

    static destroy() {
        for (let i = 0; i < TreeView.count; ++i) {
            TreeView.instance[`treeview_${i}`] = null;
        }
    }

    constructor(name, value, { icon_type = 'open' } = {}) {
        TreeView.count++;
        this.count = TreeView.count;
        TreeView.instance[`treeview_${this.count}`] = this;
        this.iconFolder = TreeView[`icon_${icon_type}`];
        this.state = 0;
        this.printed = 0;
        this.generator = isFunction(value) ? value : () => true;
        this.labelText = name;
        this.element = DOM.create('div', {
            id: `treeview_${this.count}`,
            class: 'folder_root',
        }, [
            this.label = DOM.create('span'),
            this.child = DOM.create('div', { style: 'display: none;' }),
        ]);
        this.setStatus(name);
        this.label.addEventListener('click', this._onClick);
        if (!TreeView.lazy) {
            this.print(this.generator());
            this.printed = 1;
        }
    }

    _onClick = () => {
        this.toggle();
    }

    setStatus(text) {
        this.label.innerHTML = this.state ? this.iconFolder[0] : this.iconFolder[1] + text;
    }

    print(text) {
        this.child.innerHTML = text;
    }

    update() {
        this.setStatus(this.labelText);
    }

    open() {
        this.state = 1;
        /* Lazy */
        if (!this.printed) {
            this.print(this.generator());
            this.printed = 1;
        }
        DOM.show(this.child);
        this.update();
    }

    close() {
        this.state = 0;
        DOM.hide(this.child);
        this.update();
    }

    toggle() {
        return this.state ? this.close() : this.open();
    }
}
