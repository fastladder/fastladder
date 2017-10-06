import I18n from 'i18n-js';
import { delegate } from 'rails-ujs';
import API from '../ldr/api';
import ajax from '../utils/http/ajax';
import ajaxize from '../utils/http/ajaxize';
import Form from '../utils/form';
import Position from '../utils/position';
import Template from '../utils/template';
import Folder from './folder';
import Rate from './rate';
import ReaderSubscribe from './reader_subscribe';

function subsDelete(event) {
    event.preventDefault();
    event.stopPropagation();
    const { target } = event;
    const [, sid] = target.id.split('_');
    target.disabled = true;
    target.classList.add('loading_button');
    ReaderSubscribe.unsubscribe(sid);
}

const subsEdit = (() => {
    const templateUrl = '/contents/edit';
    let currentButton;
    let template;

    function hide() {
        const editWindow = document.getElementById('subs_edit_window');
        editWindow.parentNode.removeChild(editWindow);
        if (currentButton && currentButton.classList.contains('toggle-on')) {
            currentButton.classList.remove('toggle-on');
        }
    }

    return function subsEdit(event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        const target = this;
        const editWindow = document.getElementById('subs_edit_window');
        if (editWindow) {
            hide();
            if (currentButton === target || target.classList.contains('subs_edit_cancel')) {
                return;
            }
        }

        currentButton = target;
        target.classList.add('toggle-on');
        target.blur();
        const [, sid] = this.getAttribute('rel').split(':');
        if (!template) {
            const retry = () => subsEdit.call(target);
            ajax(`${templateUrl}?${(new Date()).getTime()}`, (res) => {
                template = res;
                retry();
            });
            return;
        }

        const api = new API('/api/feed/subscribed');
        const tmpl = new Template(template).compile();
        const pos = Position.cumulativeOffset(target);

        const w = document.createElement('div');
        w.id = 'subs_edit_window';
        Object.assign(w.style, {
            position: 'absolute',
            border: '1px solid #000',
            backgroundColor: '#fff',
            padding: '10px',
            left: `${pos[0]}px`,
            top: `${pos[1] + target.offsetHeight + 4}px`,
            textAlgin: 'left',
            fontSize: '80%',
            width: '300px',
        });
        document.body.appendChild(w);
        api.post({ subscribe_id: sid }, (res) => {
            if (!res.subscribe_id) {
                w.innerHTML = '登録されていません';
            } else {
                w.innerHTML = tmpl(res);
                (() => {
                    const form = document.getElementById('subs_edit_form') || {};
                    const rateEl = form.rate;
                    if (!rateEl) {
                        return;
                    }
                    rateEl.value = res.rate;
                    rateEl.style.display = 'none';
                    rateEl.parentNode.insertBefore(Rate.create((v) => {
                        rateEl.value = v;
                    }, res.rate), rateEl);
                })();
                Form.fill('subs_edit_form', res);
                ajaxize('subs_edit_form', () => hide());
                document.getElementById('subs_edit_folder').focus();
                updateFolders(document.getElementById('subs_edit_folder'), {
                    selected_id: res.folder_id,
                });
            }
        });
    };
})();

function folderChange(event) {
    const el = this;
    if (el.selectedIndex === 1) {
        const c = prompt(I18n.t('New Folder Name'), '');
        if (!c) {
            this.selectedIndex = 0;
            return;
        }
        Folder.create(c, () => {
            // alert(folder_id);
            updateFolders(el, { selected: c });
        });
    }
}

function updateFolders(el, { selected: selectedName, selected_id: selectedId }) {
    el.options.length = 0;
    el.options[0] = new Option(I18n.t('leave it uncategorized'), '0');
    el.options[1] = new Option(I18n.t('create new folder'), '-');
    const api = new API('/api/folders');
    api.post({}, ({ name2id, names }) => {
        names.forEach((name, i) => {
            const value = name2id[name];
            el.options[i + 2] = new Option(name, value);
            if (name === selectedName || value === selectedId) {
                el.options[i + 2].selected = true;
            }
        });
    });
}

export default function main() {
    API.StickyQuery.ApiKey = ApiKey;
    delegate(document, '.subs_delete', 'click', subsDelete);
    delegate(document, '.subs_edit', 'click', (event) => {
        event.preventDefault();
        event.stopPropagation();
    });
    delegate(document, '.subs_edit', 'keydown', subsEdit);
    delegate(document, '.subs_edit', 'mousedown', subsEdit);
    delegate(document, '.subs_edit_cancel', 'click', subsEdit);
    delegate(document, '.subs_edit_folder', 'change', folderChange);
}
