import { Flow } from 'flow_js';
import EventTrigger from '../events/event_trigger';
import { updater } from '../events/updater';
import fitScreen from '../reader/commands/fit_screen';
import guideFix from '../reader/commands/guide_fix';
import imeOff from '../reader/commands/ime_off';
import TreeView from '../ui/tree_view';
import hasClass from '../utils/css/has_class';
import setStyle from '../utils/css/set_style';
import switchClass from '../utils/css/switch_class';
import { get as _$ } from '../utils/dom';
import Form from '../utils/form';
import preload from '../utils/preload';
import Config from './config';
import State from './state';
import StyleInitializer from './style_initializer';

const ASSET_IMAGES = [
    '/img/rate/0.gif',
    '/img/rate/1.gif',
    '/img/rate/2.gif',
    '/img/rate/3.gif',
    '/img/rate/4.gif',
    '/img/rate/5.gif',
    '/img/rate/pad/0.gif',
    '/img/rate/pad/1.gif',
    '/img/rate/pad/2.gif',
    '/img/rate/pad/3.gif',
    '/img/rate/pad/4.gif',
    '/img/rate/pad/5.gif',
    '/img/icon/default.gif',
    '/img/icon/p.gif',
    '/img/icon/m.gif',
];

let instance;

export default class Application {
    static getInstance() {
        if (!instance) {
            instance = new Application();
        }
        return instance;
    }

    constructor() {
        this.initialized = false;
        this.trigger = new EventTrigger(
            // Window LOAD/UNLOAD
            'AFTER_LOAD', 'BEFORE_UNLOAD',

            // Application INIT
            'BEFORE_INIT', 'AFTER_INIT',
            'BEFORE_CONFIGLOAD', 'AFTER_CONFIGLOAD',
            // sub contents
            'AFTER_INIT_CONFIG', 'AFTER_INIT_GUIDE', 'AFTER_INIT_MANAGE',
            // EVENT
            'WINDOW_RESIZE',
            'BEFORE_ANYKEYDOWN', 'AFTER_ANYKEYDOWN',
            'BEFORE_SUBS_LOAD', 'AFTER_SUBS_LOAD',
            'BEFORE_PRINTFEED', 'AFTER_PRINTFEED', 'COMPLATE_PRINTFEED',
        );
        this.styleInitializer = new StyleInitializer();
        this.state = new State();
        this.config = new Config(this);
    }

    load = (options, done) => {
        let flow;
        const withPass = f => () => flow.pass();

        // call parallel
        const parallelInitializers = [
            // asset preload
            () => this._preloadAssets(() => flow.pass()),
            withPass(this.config.startListener.bind(this)),
            withPass(this.styleInitializer.applyRule.bind(this)),

            // dom cache
            () => {
                Object.assign(_$.cacheable, {
                    right_container: true,
                    left_container: true,
                    subs_container: true,
                    right_body: true,
                    message: true,
                    loadicon: true,
                    loading: true,
                    total_unread_count: true,
                });

                flow.pass();
            },
        ];
        flow = new Flow(parallelInitializers.length, () => {
            this.initialized = true;
            done();
        });
        parallelInitializers.forEach(f => f());
    }

    // preload all assets
    _preloadAssets(done) {
        preload(ASSET_IMAGES, done);
    }

    registerHook(point, callback) {
        this.trigger.addTrigger(point, callback);
    }

    invokeHook(point, args) {
        this.trigger.callTrigger(point, args);
    }

    setupHook() {
        this.registerHook('WINDOW_RESIZE', fitScreen);
        this.registerHook('WINDOW_RESIZE', guideFix);
        this.registerHook('AFTER_INIT_GUIDE', guideFix);
        this.registerHook('AFTER_INIT', imeOff);

        // switch mode
        this.registerHook('BEFORE_PRINTFEED', () => {
            if (!hasClass('right_container', 'mode-feedview')) {
                switchClass('right_container', 'mode-feedview');
            }
        });

        // loading
        this.registerHook('BEFORE_SUBS_LOAD', () => {
            updater.call('reload_button');
        });
        this.registerHook('BEFORE_SUBS_LOAD', () => {
            TreeView.destroy();
            TreeView.count = 0;
        });
        this.registerHook('AFTER_SUBS_LOAD', () => {
            updater.call('reload_button');
        });

        // config load
        this.registerHook('AFTER_CONFIGLOAD', () => {
            setStyle('right_body', {
                fontSize: `${this.config.current_font}px`,
            });
            if (_$('config_form')) {
                Form.fill('config_form', this.config);
            }
            updater.call('show_all_button');
            updater.call(/mode_text.*/);
        });
        // autoreload
        this.registerHook('AFTER_CONFIGLOAD', () => {
            clearInterval(this.state.reloadTimer);
            if (!this.config.use_autoreload) {
                return;
            }
            const freq = Math.max(this.config.autoreload, 60);
            this.state.reloadTimer = setInterval(() => {
                if ((new Date() - this.state.lastUserAction) > freq * 1000) {
                    Control.reloadSubs();
                    this.state.lastUserAction = new Date();
                }
            }, freq * 200);
        });
        // revert pins
        this.registerHook('AFTER_CONFIGLOAD', () => {
            if (this.config.use_pinsaver) {
                return;
            }
            const api = new api('/api/pin/all');
            api.post({}, (pins) => {
                if (!pins || pins.length) {
                    return;
                }
                pins.forEach((v) => {
                    this.pin.pins.unshift({
                        url: v.link,
                        title: v.title,
                        created_on: v.created_on,
                    });
                    this.pin.hash[v.link] = true;
                });
                this.pin.updateView();
            });
        });
        // update paging
        this.registerHook('AFTER_PRINTFEED', (feed) => {
            const ids = ['right_bottom_navi', 'right_top_navi', 'feed_next', 'feed_prev'];
            if (feed.ad) {
                ids.map(id => _$(id)).filter(Boolean).forEach((el) => {
                    el.innerHTML = '';
                });
                _$('feed_paging').style.display = 'none';
            } else {
                _$('feed_paging').style.display = 'block';
                ids.forEach(label => updater.call(label));
            }
        });
    }
}
