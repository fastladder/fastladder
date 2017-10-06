import I18n from 'i18n-js';
import sortBy from 'lodash/sortBy';
import { delegate } from 'rails-ujs';
import { styleUpdater } from '../events/updater';
import API from '../ldr/api';
import Application from '../ldr/application';
import { typecastConfig } from '../ldr/config';
import VARS from '../ldr/vars';
import Finder from '../models/finder';
import Pin from '../models/pin';
import ahah from '../utils/http/ahah';
import ajaxize from '../utils/http/ajaxize';
import setStyle from '../utils/css/set_style';
import switchClass from '../utils/css/switch_class';
import DOM, { get as _$ } from '../utils/dom';
import Form from '../utils/form';
import Roma from '../utils/roma';
import Template from '../utils/template';
import getFolders from './commands/get_folders';
import fitScreen from './commands/fit_screen';
import Control from './control';
import SubsItem from './item/subs_item';
import LoadEffect from './load_effect';
import SubscribeController from './subscribe/subscribe_controller';
import SubscribeModel from './subscribe/subscribe_model';
import SubscribeView from './subscribe/subscribe_view';

const app = Application.getInstance();
const feedlink2id = {};

function setupEvent() {
    // wip...
}

function setupHotkey() {
    // wip...
}

function printDiscover(list) {
    const output = _$('discover_items');
    const subs = Template.get('discover_select_sub').compile();
    const unsub = Template.get('discover_select_unsub').compile();
    if (list.length === 0) {
        output.innerHTML = [
            '<div class="discover_loading">',
            '<img src="/img/icon/orz.gif">　',
            I18n.t('print_discover_notfound'),
            '</div>',
        ].join('');
    } else {
        const seen = {};
        const uniqList = [];
        sortBy(list, 'subscribers_count');
        list.forEach((item) => {
            if (!seen[item.feedlink]) {
                uniqList.push(item);
                seen[item.feedlink] = true;
            }
        });
        output.innerHTML = uniqList.map((item) => {
            const users = item.subscribers_count === 1 ? 'user' : 'users';
            if (item.subscribe_id) {
                feedlink2id[item.feedlink] = item.subscribe_id;
                return unsub(item, { users });
            }
            return subs(item, { users });
        }).join('');
    }
}

const _init = {
    manage() {
        if (app.state.guestMode) {
            message('この機能は使えません');
            return;
        }
        switchClass('right_container', 'mode-manage');
        ahah('/contents/manage', 'right_body', () => {
            getFolders(() => {
                // update('manage_item');
                // update('manage_folder');
            });
        });
    },

    config() {
        ahah('/contents/config', 'right_body', () => {
            switchClass('right_container', 'mode-config');
            // Controll.scrollTop();
            Form.fill('config_form', app.config);
            ajaxize('config_form', {
                before: () => true,
                after(res, req) {
                    message('Your settings have been saved');
                    typecastConfig(req);
                    Object.assign(app.config, req);
                },
            });
            // TabClick.call(_$('tab_config_basic'));
            app.invokeHook('AFTER_INIT_CONFIG');
        });
    },

    guide() {
        ahah('/contents/guide', 'right_body', () => {
            switchClass('right_container', 'mode-guide');
            // Control.scrollTop();
            app.invokeHook('AFTER_INIT_GUIDE');
        });
    },
};

const defaultRightInit = _init.guide;

function loadContent() {
    const q = location.href;
    const o = q.indexOf('#') + 1;
    if (!o) {
        defaultRightInit();
        return;
    }
    const param = q.slice(o);
    if (_init[param]) {
        _init[param]();
    } else {
        defaultRightInit();
    }
}

function init() {
    app.load({}, () => {
        app.setupHook();
        app.invokeHook('BEFORE_INIT');
        window.onerror = (a, b, c) => {
            document.getElementById('message').innerHTML = [a, b, c];
            return false;
        };

        app.state.leftpaneWidth = VARS.LEFTPANE_WIDTH;

        DOM.show('container');
        DOM.show('footer');
        fitScreen();
        DOM.show('right_container');

        API.registerCallback({
            Create: LoadEffect.Start,
            Complete: LoadEffect.Stop,
        });

        app.pin = new Pin();

        app.subs = new SubscribeController({
            model: new SubscribeModel(),
            view: new SubscribeView('subs_body'),
        });

        app.finder = new Finder('finder');
        app.finder.clear();
        app.finder.addCallback((q) => {
            if (!q) {
                return app.subs.find('');
            }
            let query;
            const roma = new roma();
            try {
                query = new RegExp(roma.toRegExp(q), 'i');
            } catch (e) {
                query = q;
            }
            app.subs.find(query);
        });

        setupEvent();
        setupHotkey();

        ajaxize('discover_form', {
            before() {
                const output = _$('discover_items');
                output.innerHTML = [
                    '<div class="discover_loading">',
                    '<img src="/img/icon/loading.gif">　',
                    I18n.t('print_discover_loading'),
                    '</div>',
                ].join('');
            },
            after: printDiscover,
        });

        setTimeout(() => {
            loadContent();
            app.invokeHook('BEFORE_CONFIGLOAD');
            app.config.load(() => {
                app.invokeHook('AFTER_CONFIGLOAD');
                app.subs.update();
            });
        }, 10);

        app.invokeHook('AFTER_INIT');
    });

    styleUpdater.addCallback('left_container', (el) => {
        setStyle(el, {
            display: app.state.showLeft ? 'block' : 'none',
            width: `${app.state.leftpaneWidth}px`,
            height: `${app.state.containerHeight}px`,
        });
    });

    styleUpdater.addCallback('subs_container', (el) => {
        const h = app.state.containerHeight - _$('subs_tools').offsetHeight;
        setStyle(el, {
            display: app.state.showLeft ? 'block' : 'none',
            width: `${app.state.leftpaneWidth}px`,
            height: `${h}px`,
        });
    });

    styleUpdater.addCallback('right_container', (el) => {
        const borderW = 2;
        setStyle(el, {
            height: `${app.state.containerHeight}px`,
            width: `${document.body.offsetWidth - app.state.leftpaneWidth - borderW}px`,
        });
    });
}

export default function main() {
    window.addEventListener('load', init);
    window.addEventListener('resize', () => app.invokeHook('WINDOW_RESIZE'));

    delegate(document, '[rel^="Control:"]', 'click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { target } = event;
        const rel = target.getAttribute('rel');
        const [, action, rawArgs] = rel.match(/^Control:([^(]+)(?:\(([^)]*)\))?$/) || [];
        const args = rawArgs
            .split(/\s*,\s*/)
            .map(rawArg => +rawArg.replace(/(?:^'|'$)/g, ''));
        Control[action](...args);
    });

    const subsItem = new SubsItem();
    delegate(document, '.treeitem', 'mouseover', subsItem.onhover);
    delegate(document, '.treeitem', 'mouseout', subsItem.onunhover);
}
