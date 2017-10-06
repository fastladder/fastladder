/*
 hotkey.js
  usage :
   var kb = new HotKey;
   kb.add("a",function(){alert("a")});
   kb.add("A",function(){alert("Shift+a")});
*/
function HotKey(element, name) {
    const ctor = arguments.callee;
    const target = element || document;
    this._target = target;
    this._keyfunc = {};
    this._ctor = ctor;
    if (name) {
        ctor.keysets[name] = this;
    }
    // attach event
    if (!ctor.Base.initialized) {
        Event.observe(target, 'keydown', ctor.Base.invoke_keydown, true);
        Event.observe(target, 'keypress', ctor.Base.invoke_keypress, true);
        ctor.Base.initialized = true;
    }
    this.active = true;
    this.init();
}

HotKey.register_keylistener = function (handler, f) {
    if (handler == 'keydown') {
        this.Base.KeydownListeners.push(f);
    }
    if (handler == 'keypress') {
        this.Base.KeypressListeners.push(f);
    }
};

HotKey.Base = {
    initialized: false,
    KeydownListeners: [],
    KeypressListeners: [],
    invoke_keydown(e) {
        const listeners = HotKey.Base.KeydownListeners;
        for (let i = 0; i < listeners.length; i++) {
            listeners[i].call(this, e);
        }
    },
    invoke_keypress(e) {
        const listeners = HotKey.Base.KeypressListeners;
        for (let i = 0; i < listeners.length; i++) {
            listeners[i].call(this, e);
        }
    },
};

// keycode
HotKey.kc2char = function (kc) {
    const between = function (a, b) {
        return a <= kc && kc <= b;
    };
    const _32_40 = 'space pageup pagedown end home left up right down'.split(' ');
    const kt = {
        8: 'back',
        9: 'tab',
        10: 'enter',
        13: 'enter',
        16: 'shift',
        17: 'ctrl',
        58: ':', // keypress
        60: '<', // keypress
        62: '>', // keypress
        63: '?', // keypress
        229: 'IME',
    };
    return (
        between(65, 90) ? String.fromCharCode(kc + 32) : // keydown  a-z
            between(97, 122) ? String.fromCharCode(kc) : // keypress a-z
                between(48, 57) ? String.fromCharCode(kc) : // 0-9
                    between(96, 105) ? String.fromCharCode(kc - 48) : // num 0-9
                        between(32, 40) ? _32_40[kc - 32] :
                            kt.hasOwnProperty(kc) ? kt[kc] :
                                'null'
    );
};

HotKey.specialCase = function (e) {
    const kc = e.keyCode;
    if (e.type == 'keypress' && e.keyCode == 27) return 'esc';
    if (e.type == 'keydown' && e.keyCode == 46) return 'delete';
    if (e.keyCode >= 112 && e.keyCode <= 123) {
		 if (e.type == 'keydown') { return `f${kc - 111}`; }
		 if (e.which == 0) { return `f${kc - 111}`; }
    }
    return false;
};

// printableなキーが押されたかどうかを判別する
HotKey.isPrintable = function (e) {
    const c = HotKey.getChar(e);
    // 対応してないキー
    if (!c) return true;
    if (/^[0-9a-z]{1,1}$/.test(c)) return true;
    if (/IME|space|\>|\<|\?/i.test(c)) return true;
    return false;
};


// keypress, keydown
// keycode , which
// IE, Opera, Firefox, Safari
HotKey.getChar = function (e) {
    const c = HotKey.specialCase(e);
    if (c) return c;
    const between = function (a, b) {
        return a <= kc && kc <= b;
    };
    var kc = e.keyCode || e.which;
    if (e.keyCode) {
        return HotKey.kc2char(kc);
    } else if (e.which) {
        return HotKey.kc2char(kc);
    }
};

// キーセットの切り替え
HotKey.keysets = {};
HotKey.use_only = function (name) {
    const keysets = this.keysets;
    if (!keysets.hasOwnProperty(name)) return;
    for (const i in keysets) {
        keysets[i].activate(false);
    }
    setTimeout(() => {
        keysets[name].activate(true);
    }, 0);
};

HotKey.prototype.globalCallback = function () {};
HotKey.prototype.ignore = /input|textarea/i;
HotKey.prototype.allow = /element_id/;
HotKey.prototype.filter = function (e) { return true; };
HotKey.prototype.abort = true;
HotKey.prototype.init = function () {
    const self = this;
    const target = this._target;
    let cancelNext;
    const state = '';
    const count = 0;
    // var log = [];
    // keydown -> keypress
    const keydown_listener = function (e) {
        if (!self.active) return;
        self.globalCallback();
        // window.status = count++ + "keydown";
        if (window.opera) { Event.stop(e); return; }
        if (e.metaKey || e.altKey) { return; }
        self.event = e;
        self.lastInput = self.get_input(e);
        self.lastCapture = 'keydown';
        if (self.invoke()) {
            cancelNext = true;
        } else {
            cancelNext = false;
            self.lastCapture = '';
        }
        // log.push(self.lastInput);
    };

    const keypress_listener = function (e) {
        if (!self.active) return;
        self.globalCallback();
        if (e.metaKey || e.altKey) { return; }
        if (cancelNext) {
            cancelNext = false;
            self.lastCapture = 'keypress';
            Event.stop(e);
            return;
        }
        self.event = e;
        const input = self.get_input(e);
        // window.status = count++  + "keypress"+ input;
        if (self.lastCapture != 'keydown' || self.lastInput != input) {
            self.lastInput = input;
            self.lastCapture = 'keypress';
            // log.push(self.lastInput)
            self.invoke();
        }
    };

    // keypress listener
    this._ctor.register_keylistener('keydown', keydown_listener, self);
    this._ctor.register_keylistener('keypress', keypress_listener, self);
};

HotKey.prototype.invoke = function (input) {
    input = input || this.lastInput;
    const e = this.event;
    if (!this._keyfunc.hasOwnProperty(input)) return false;
    if (typeof this._keyfunc[input] !== 'function') return false;
    // abort browser action
    this.abort && Event.stop(e);
    this._keyfunc[input].call(this, e);
    this.lastInvoke = input;
    return true;
};

HotKey.prototype.get_input = function (e) {
    const el = (e.target || e.srcElement);
    const tag = el.tagName;
    const id = el.id;
    if (!this.allow.test(id) && this.ignore.test(tag)) return;
    // filter
    if (!this.filter(e)) return false;
    let input = `${HotKey.getChar(e)}`;
    // window.status = [e.type, e.keyCode,e.button, e.which,input];
    if (e.shiftKey && input != 'shift') {
        input = (input.length == 1) ? input.toUpperCase() :	`shift+${input}`;
    }
    if (e.ctrlKey && !/ctrl/i.test(input)) { input = `ctrl+${input}`; }
    return input;
};

HotKey.prototype.sendKey = function (key) {
    this._keyfunc[key] && this._keyfunc[key]();
};

HotKey.prototype.add = function (key, func) {
    if (key.constructor == Array) {
        for (let i = 0; i < key.length; i++) { this.add(key[i], func); }
    } else if (key.indexOf('|') != -1) {
        this.add(key.split('|'), func);
    } else {
        this._keyfunc[key] = func;
    }
};

HotKey.prototype.remove = function (key) {
    delete this._keyfunc[key];
    return this;
};

HotKey.prototype.activate = function (sw) {
    this.active = sw;
    return this;
};

HotKey.prototype.clear = function () {
    this._keyfunc = {};
};
