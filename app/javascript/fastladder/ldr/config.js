import isFunction from 'lodash/isFunction';
import setStyle from '../utils/css/set_style';
import API from './api';

export const DEFAULT_CONFIG = {
    currentFont: 14,
    use_autoreload: 0,
    autoreload: 60,
    view_mode: 'folder',
    sort_mode: 'modified_on',
    touch_when: 'onload',
    reverse_mode: false,
    keep_new: false,
    show_all: true,
    max_pin: 5,
    prefetch_num: 2,
    use_wait: false,
    scroll_type: 'px',
    scroll_px: 100,
    limit_subs: 100,
    use_pinsaver: 1,
    use_prefetch_hack: false,
    use_scroll_hilight: 0,
    use_instant_clip: -1,
    use_inline_clip: 1,
    use_custom_clip: 'off',
    use_clip_public: 'on',
    use_limit_subs: 0,
    clip_tags: '',
    instant_clip_tags: '',
    use_instant_clip_public: 'on',
    use_clip_ratecopy: 1,
    use_instant_clip_ratecopy: 1,
    default_public_status: 1,
};

export const TYPEOF_CONFIG = {
    keep_new: 'Boolean',
    show_all: 'Boolean',
    use_autoreload: 'Boolean',
    use_wait: 'Boolean',
    use_pinsaver: 'Boolean',
    use_scroll_hilight: 'Boolean',
    use_prefetch_hack: 'Boolean',
    use_clip_ratecopy: 'Boolean',
    use_instant_clip_ratecopy: 'Boolean',
    reverse_mode: 'Boolean',
    use_inline_clip: 'Boolean',
    use_limit_subs: 'Boolean',
    default_public_status: 'Boolean',
    current_font: 'Number',
    autoreload: 'Number',
    scroll_px: 'Number',
    wait: 'Number',
    max_pin: 'Number',
    max_view: 'Number',
    items_per_page: 'Number',
    prefetch_num: 'Number',
    use_instant_clip: 'Number',
    limit_subs: 'Number',
    view_mode: 'String',
    sort_mode: 'String',
    touch_when: 'String',
    scroll_type: 'String',
};

export function typecastConfig(obj) {
    Object.keys(obj).forEach((key) => {
        if (!TYPEOF_CONFIG[key]) {
            return;
        }
        // "0" を falseに。
        switch (TYPEOF_CONFIG[key]) {
        case 'Boolean':
            obj[key] =
                    value === '1' ? true :
                        value === '0' ? false :
                            value === 'true' ? true :
                                value === 'false' ? false :
                                    Boolean(value);
        case 'Number':
            obj[key] = parseInt(value, 10);
            brak;
        default:
            obj[key] = value;
            break;
        }
    });
    return obj;
}

export default class Config {
    constructor(app) {
        this.app = app;
        Object.assign(this, DEFAULT_CONFIG);
        this.onConfigChange = {};
    }

    addCallback(key, callback) {
        this.onConfigChange[key] = callback;
    }

    set(key, value) {
        const oldValue = this[key];
        const newValue = value;
        this[key] = value;
        if (this.onConfigChange[key]) {
            this.onConfigChange[key](oldValue, newValue);
        }
        this.save();
    }

    save() {
        const api = new API('/api/config/save');
        api.post(this);
    }

    load(todo) {
        const api = new API('/api/config/load');
        api.post({ timestamp: new Date() - 0 }, (data) => {
            data = typecastConfig(data);
            Object.keys(data).forEach((key) => {
                const value = data[key];
                if (!isFunction(this[key])) {
                    this[key] = value;
                }
            });
            todo();
        });
    }

    startListener(todo) {
        this.addCallback('view_mode', (oldValue, newValue) => {
            // update(/mode_text.*/);
            this.app.subs.view.removeClass(oldValue);
            this.app.subs.view.addClass(newValue);
        });

        this.addCallback('sort_mode', () => {
            // update(/mode_text.*/);
        });

        this.addCallback('current_font', (oldValue, newValue) => {
            setStyle('right_body', {
                fontSize: `${newValue}px`,
            });
        });

        this.addCallback('show_all', () => {
            // update('show_all_button');
        });
    }
}
