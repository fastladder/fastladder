import API from '../fastladder/ldr/api';

window.onload = init;
API.StickyQuery = { ApiKey };

const State = {};
State.offset = 0;
State.limit = 20;
State.show_all = false;

let Subs = [];
let FilteredSubs = [];
const SubsIndex = {};

function init() {
    updater('filtered_subs_count', function () {
        this.innerHTML = `${FilteredSubs.length} ${I18n.t('items')}`;
    });
    updater('filtered_subs', function () {
        const header = [
            '<table id="result" cellspacing="0" cellpadding="0">',
            '<tr><th width="80" nowrap>', I18n.t('State'), '</th>',
            '<th width="80%">', I18n.t('Title'), '</th>',
            '<th width="60" nowrap>', I18n.t('Subscribers'), '</th>',
            '<th width="80">', I18n.t('Rate'), '</th>',
            '</tr>',
        ].join('');
        if (State.show_all) {
            this.innerHTML = `${header +
				 FilteredSubs.map(formatter).join('')
				 }</table>`;
            _$('show_all').style.display = 'none';
        } else {
            this.innerHTML = `${header +
				 FilteredSubs.slice(State.offset, State.offset + State.limit).map(formatter).join('')
				 }</table>`;
            if (FilteredSubs.length > State.limit) {
                _$('show_all').innerHTML = `${I18n.t('Show all')} (${FilteredSubs.length} ${I18n.t('items')})`;
                _$('show_all').style.display = 'block';
            } else {
                _$('show_all').style.display = 'none';
            }
        }
        setup_style();
    });
    _$('filtered_subs').innerHTML = `<div class='loading'>${I18n.t('Loading ...')}</div>`;
    load_config();
    load_subs();
    setup_event();
    const MouseUp = new Trigger('mouseup');
    MouseUp.add(True, () => {
        State.mdown = false;
    });
    MouseUp.apply();
}

function setup_style() {
    const browser = new BrowserDetect();
    if (!browser.isIE) {
        _$('result').style.width = '100%';
    }
}

function setup_event() {
    ['filter_from_all', 'filter_from_public', 'filter_from_private'].forEach((id) => {
        Event.observe(_$(id), 'click', do_search);
    });
    let search_queue;
    const delayed_search = do_search.later(300);
    ['filter_subscriber_min', 'filter_subscriber_max', 'filter_string'].forEach((id) => {
        let old_value;
        Event.observe(_$(id), 'keyup', () => {
            const current_value = _$(id).value;
            if (old_value != current_value) {
                if (search_queue) {
                    search_queue.cancel();
                }
                search_queue = delayed_search();
                old_value = current_value;
            }
        });
    });
}

function set_query(param) {
    keys(param).forEach((v) => {
        _$(`filter_${v}`).value = param[v];
    });
    do_search();
}

function mspace_reset(t) {
    Array.forEach(_$(`filter_${t}`).options, (op) => {
        op.selected = true;
    });
    do_search();
}

function show_all() {
    if (FilteredSubs.length > 500) {
        const c = confirm('it might take a while due to the large number of entries.\n are you sure to proceed?');
        if (!c) return;
        State.show_all = true;
        update('filtered_subs');
    } else {
        State.show_all = true;
        update('filtered_subs');
    }
}

const template = new Template([
    '<tr class="[[classname]]" id="tr_[[subscribe_id]]" onmouseover="mover.call(this,event)" onmousedown="mdown.call(this,event)" onselectstart="return false">',
    '<td width="80" nowrap class="check_cell"><div class="check">',
    '<input type="checkbox" id="check_[[subscribe_id]]" onclick="return false" [[checked]]> [[ public_text ]]</div></td>',
    '<td width="80%" style="background-image:url(\'[[icon]]\')" class="title_cell">[[title]]</td>',
    '<td width="60" nowrap>[[#{ subscribers_count > 1 ? subscribers_count + " " + I18n.t("people") : "just you" }]]', '</td>',
    '<td width="80" nowrap><img src="/img/rate/[[rate]].gif"></td>',
    '</tr>',
].join('')).compile();

function formatter(s) {
    const param = {};
    const classname = [];
    if (!s.public) classname.push('secret');
    if (s.selected) {
        param.checked = 'checked';
        classname.push('selected');
    }
    param.classname = classname.join(' ');
    param.public_text = s.public ? I18n.t('Public') : I18n.t('Private');
    return template(s, param);
}

function mark(id, flag) {
    if (flag == -1) {
        _$(`check_${id}`).checked = !_$(`check_${id}`).checked;
    } else {
        _$(`check_${id}`).checked = flag;
    }
    const selected = _$(`check_${id}`).checked;
    if (selected) {
        addClass(`tr_${id}`, 'selected');
    } else {
        removeClass(`tr_${id}`, 'selected');
    }
    item(id).selected = selected;
    return selected;
}
function mdown(e) {
    State.mdown = true;
    Event.stop(e);
    const el = this;
    const id = el.id.split('_')[1];
    const sel = mark(id, -1);
    State.turn = sel;
}
function mover(e) {
    if (!State.mdown) return;
    const el = this;
    const id = el.id.split('_')[1];
    mark(id, State.turn);
}

function do_search() {
    const filter = make_filter();
    FilteredSubs = Subs.filter(filter);
    State.show_all = false;
    update('filtered_subs_count');
    update('filtered_subs');
}

function make_filter() {
    const filters = [];
    function add_filter(f) {
        filters.push(f);
    }
    if (!_$('filter_from_all').checked) {
        if (_$('filter_from_public').checked) {
            add_filter(s => s.public);
        }
        if (_$('filter_from_private').checked) {
            add_filter(s => !s.public);
        }
    }
    if (_$('filter_subscriber_min').value) {
        const min = _$('filter_subscriber_min').value;
        add_filter(s => s.subscribers_count >= min);
    }
    if (_$('filter_subscriber_max').value) {
        const max = _$('filter_subscriber_max').value;
        add_filter(s => s.subscribers_count <= max);
    }

    const selected = function (el) { return el.selected; };
    if (_$('filter_rate')) {
        var el = _$('filter_rate');
        if (!Array.every(el.options, selected)) {
            (function () {
                const p = [];
                Array.forEach(el.options, (o) => {
                    o.selected && p.push(o.value);
                });
                const tmp = p.join('');
                add_filter(s => contain(tmp, `${s.rate}`));
            }());
        }
    }
    if (_$('filter_folder')) {
        var el = _$('filter_folder');
        if (!Array.every(el.options, selected)) {
            (function () {
                const tmp = {};
                Array.forEach(el.options, (o) => {
                    o.selected && (tmp[o.value] = true);
                });
                add_filter(s => tmp.hasOwnProperty(s.folder));
            }());
        }
    }

    if (_$('filter_string').value) {
        const str = _$('filter_string').value;
        add_filter((sub) => {
            const lc = str.toLowerCase();
            return (contain(sub.title_lc, lc) || contain(sub.link_lc, lc));
        });
    }
    return function (s) {
        return filters.every(expr => expr(s));
    };
}
function item(id) {
    return SubsIndex[`_${id}`];
}
function load_subs() {
    const api = new API('/api/lite_subs');
    api.post({}, (res) => {
        Subs = res;
        const parted = res.partition(sub => sub.public);
        _$('public_subs_count').innerHTML = `${parted[0].length} ${I18n.t('items')}`;
        _$('private_subs_count').innerHTML = `${parted[1].length} ${I18n.t('items')}`;
        res.forEach((sub) => {
            SubsIndex[`_${sub.subscribe_id}`] = sub;
            sub.link_lc = sub.link.toLowerCase();
            sub.title_lc = sub.title.toLowerCase();
        });
        onsubs_load();
    });
}

function onsubs_load() {
    setup_mspace();
}

Array.prototype.count_by_key = function (key, prefix) {
    const result = {};
    if (!prefix) { prefix = ''; }
    this.forEach((obj) => {
        if (!result[prefix + obj[key]]) {
            result[prefix + obj[key]] = 1;
        } else {
            result[prefix + obj[key]]++;
        }
    });
    return result;
};

function setup_mspace() {
    const rate_cell = _$('mspace_rate');
    const folder_cell = _$('mspace_folders');
    const rate_count = Subs.count_by_key('rate');
    const folder_count = Subs.count_by_key('folder');
    const rate_text = [
        'Not Rated',
        '1 star',
        '2 stars',
        '3 stars',
        '4 stars',
        '5 stars',
    ];
    let buf = [];
    buf.push("<select id='filter_rate' multiple style='height:120px;width:100%' onchange='do_search()'>");
    [5, 4, 3, 2, 1, 0].forEach((num) => {
        if (rate_count[num]) {
            buf.push(`<option value='${num}' selected>${rate_text[num]} (${rate_count[num]})</option>`);
        }
    });
    buf.push('</select>');
    rate_cell.innerHTML = buf.join('');
    buf = ["<select id='filter_folder' multiple style='height:120px;width:100%' onchange='do_search()'>"];
    const folder_names = keys(folder_count).sort((a, b) => folder_count[b] - folder_count[a]);
    folder_names.unshift('');
    folder_names.forEach((name, i) => {
        if (name == '' && i != 0) return;
        let v = name;
        const count = folder_count[name];
        if (v == '') { v = I18n.t('[ Uncategolized ]'); }
        buf.push(`<option value="${name.escapeHTML()}" selected>${v} (${count})</option>`);
    });
    buf.push('</select>');
    folder_cell.innerHTML = buf.join('');
    do_search();
}

function load_config() {
    const api = new API('/api/config/load');
    api.post({}, (res) => {
        if (res.hasOwnProperty('default_public_status')) {
            const s = res.default_public_status ? I18n.t('Private') : I18n.t('Public');
        } else {
        }
    });
}
function set_member_public(v) {
    const api = new API('/api/config/save');
    api.post({ member_public: v }, () => {
        location.href = location.href;
    });
}
function select_all() {
    let first;
    FilteredSubs.forEach((sub, i) => {
        if (i == 0) { first = !sub.selected; }
        sub.selected = first;
    });
    update('filtered_subs');
}

let progress = false;
function set_public(flag) {
    if (progress) return;
    const api = new API('/api/feed/set_public');
    const selected = Subs.filter(sub => (sub.selected && sub.public != flag));
    if (selected.length == 0) return;
    const text = flag ? I18n.t('Public') : I18n.t('Private');
    const c = confirm(`Are you sure to mark ${selected.length} feeds as "${text}"?`);
    if (!c) return;
    const sid = selected.pluck('subscribe_id').join(',');
    const param = {
        subscribe_id: sid,
        public: flag,
    };
    const status = _$('set_public_progress');
    status.style.display = 'inline';
    status.innerHTML = I18n.t('Now saving');
    api.post(param, () => {
        selected.forEach((sub) => {
            sub.public = flag;
        });
        Subs.forEach((sub) => {
            sub.selected = false;
        });
        update('filtered_subs');
        status.innerHTML = '';
        status.style.display = 'none';
        progress = 0;
    });
    progress = 1;
}

