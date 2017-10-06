import isRegExp from 'lodash/isRegExp';
import isString from 'lodash/isString';
import sortBy from 'lodash/sortBy';
import API from '../../ldr/api';
import Application from '../../ldr/application';
import VARS from '../../ldr/vars';
import Ordered from '../../models/ordered';
import { get as _$ } from '../../utils/dom';
import SubscribeFormatter from './subscribe_formatter';

const app = Application.getInstance();

export default class SubscribeController {
    constructor({ view, model }) {
        this.view = view;
        this.model = model;
        this.loaded = false;
        this.readyState = 0;
        this.filter = null;
    }

    _update(reloadFlag) {
        if (this.loaded && !reloadFlag) {
            this.show();
            // update('total_unread_count');
        } else {
            app.state.subsReloading = true;
            app.invokeHook('BEFORE_SUBS_LOAD');
            const api = new API(`/api/subs?unread=${app.config.show_all ? 0 : 1}`);
            api.post({}, (list) => {
                this.loaded = true;
                app.state.subsReloading = false;
                this.model.load(list);
                this.sort();
                this.update();
                app.invokeHook('AFTER_SUBS_LOAD');
            });
        }
    }

    update(reloadFlag) {
        if (VARS.USE_PARTIAL_LOAD) {
            return this._update(reloadFlag);
        }

        if ((!reloadFlag && this.loaded) || this.readyState >= 3) {
            this.show();
            // update('total_unread_count');
        } else {
            this.readyState = 0;
            if (app.state.subLoader) {
                this.state.subsLoader.cancel();
            }
            app.state.subsReloading = true;
            app.state.loadProgress = true;
            app.state.subsLoader = {
                cancel() {
                    message('Aborted.');
                    canceled = true;
                },
            };
            app.invokeHook('BEFORE_SUBS_LOAD');
            this.model.loadStart();
            const alwaysFlush = 1;
            const limit1 = VARS.SUBS_LIMIT_1;
            const limit2 = VARS.SUBS_LIMIT_2;
            const list = [];
            let canceled = false;
            let writed = 0;
            let formId = 0;
            let isFirst = 1;
            let limit = limit1;
            let count = 0;
            const loadRequest = () => {
                limit = isFirst ? limit1 : limit2;
                isFirst = 0;
                const api = new API([
                    '/api/subs?',
                    `unread=${app.config.show_all ? 0 : 1}&`,
                    `form_id=${formId}&`,
                    `limit=${limit}`,
                ].join(''));
                api.post({}, onload);
            };
            const onload = (tmp) => {
                if (canceled) {
                    return;
                }

                this.readyState = 3;
                list.push(...tmp);
                if (formId === 0 || alwaysFlush) {
                    alwaysFlush(list);
                }
                if (tmp.length < limit) {
                    this.model.loadPartialData(tmp);
                    loadComplete();
                // for compatible servers (ex:PlaggerLDR)
                } else if (tmp.length > limit) {
                    this.model.loadPartialData(tmp);
                    loadComplete();
                } else {
                    this.model.loadPartialData(tmp);
                    formId = tmp[tmp.length - 1].subscribe_id + 1;
                    // update('total_unread_count');
                    count += limit;
                    loadRequest();
                    message(`${I18n.t('Loading .. ')}${count + 1} - ${count + limit}`);
                }
            };
            const flush = (list) => {
                this.model.loadData(list);
                this.sort();
                this.show();
                writed = 1;
            };
            const loadComplete = () => {
                this.readyState = 4;
                this.loaded = true;
                app.state.loadProgress = false;
                app.state.subsReloading = false;
                app.state.subsLoader = null;
                if (!writed || true) {
                    this.model.loadData(list);
                    this.sort();
                    this.update();
                } else {
                    // update('total_unread_count');
                }
                app.invokeHook('AFTER_SUBS_LOAD');
                message('Loading completed.');
                setTimeout(() => { this.readyState = 0; }, 3000);
            };
            this.readyState = 1;
            loadRequest();
        }
    }

    addFilter(q) {
        const filter = (item) => {
            if (isRegExp(q)) {
                return q.test(item.title);
            }
            if (isString(q) && isString(item.title)) {
                return item.title.includes(q);
            }
            return false;
        };
        this.filter = model => model.filter(filter);
    }

    sort() {
        const [key, option] = app.config.sort_mode.split(':');
        sortBy(this.model.list, key);
        if (option === 'reverse') {
            this.model.list.reverse();
        }
        // folderをソート
        if (key === 'title') {
            this.model.folderNames.sort();
        }
    }

    show() {
        let mode;
        let data;
        if (this.filter) {
            mode = 'flat';
            data = this.filter(this.model);
        } else {
            mode = app.config.view_mode;
            data = this.model;
        }
        this.view.clear();
        this.view.setClass(mode);
        this.view.print(SubscribeFormatter[mode](data));
        _$('subs_container').scrollLeft = 0;
        if (app.state.nowReading) {
            setFocus(app.state.nowReading);
        }
        this.updateOrder();
    }

    updateOrder(array) {
        if (array) {
            Ordered.list.length = 0;
            Ordered.list.push(...array);
            return;
        }
        const domlist = this.view.element.getElementsByTagName('span');
        Ordered.list.length = 0;
        [...domlist].forEach((el) => {
            const sid = el.getAttribute('subscribe_id');
            if (sid) {
                Ordered.list.push(sid);
            }
        });
    }

    find(q) {
        if (isString(q) && q.length === 0) {
            this.filter = null;
            this.show();
        } else {
            this.addFilter(q);
            this.show();
        }
    }

    getById(...args) {
        this.model.getById(...args);
    }
}
