/*
 EventDispatcher
*/
var Event = {};
Event.list = [];
//Event.sweep_queue = [];
Event.sweep = function(){
	var q = Event.list;
	for(var i=0;i<q.length;i++){
		try{
			removeEvent.apply(this,q[i]);
			q[i] = null;
		} catch(e){
			// alert(e)
		}
	}
};
Event.observe = addEvent;
Event.stop = function(e){
	Event.stopAction(e);
	Event.stopEvent(e);
};
Event.stopAction = function(e){
	e.preventDefault ? e.preventDefault() : (e.returnValue = false)
};
Event.stopEvent = function(e){
	e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true)
};
Event.pointerX = function(event) {
	return event.pageX || (event.clientX +
		(document.documentElement.scrollLeft || document.body.scrollLeft));
};
Event.pointerY = function(event){
	return event.pageY || (event.clientY +
		(document.documentElement.scrollTop || document.body.scrollTop));
};
Event.cancelFlag = {};
Event.cancelNext = function(type){
	Event.cancelFlag[type] = true;
};

Event.userDefined = {
	wheeldown: function(obj, evType, fn, useCapture){
		var callback = function(e){
			var count  = e.wheelDelta ? e.wheelDelta / -120 : e.detail / 3;
			if(count > 0){
				fn(e, count);
			}
		};
		obj.attachEvent ?
			addEvent(obj, 'mousewheel', callback, useCapture) : // IE
			addEvent(obj, 'DOMMouseScroll', callback, useCapture); // firefox
	},
	wheelup: function(obj, evType, fn, useCapture){
		var callback = function(e){
			var count  = e.wheelDelta ? e.wheelDelta / -120 : e.detail / 3;
			if(count < 0){
				fn(e, count);
			}
		};
		obj.attachEvent ?
			addEvent(obj, 'mousewheel', callback, useCapture) : // IE
			addEvent(obj, 'DOMMouseScroll', callback, useCapture); // firefox
	}
};

window.onunload = Event.sweep;
function addEvent(obj, evType, fn, useCapture){
	if(Event.userDefined.hasOwnProperty(evType)){
		return Event.userDefined[evType].apply(null, arguments);
	}
	Event.list.push(arguments);
	if(obj.addEventListener){
		obj.addEventListener(evType, fn, useCapture);
	}else if (obj.attachEvent){
		obj.attachEvent("on"+evType, fn);
	}
	var args = arguments;
	return function(){
		removeEvent.apply(this,args);
	}
}
function removeEvent(obj, evType, fn, useCapture){
	if (obj.addEventListener){
		obj.removeEventListener(evType, fn, useCapture);
		return true;
	}else if (obj.detachEvent){
		obj.detachEvent("on"+evType, fn);
	}
}
var Trigger = Class.create();
Trigger.create = function(type){
	return new Trigger(type)
};
Trigger.extend({
	_type   : null,
	initialize : function(type){
		this.event_list = [];
		this.enable = true;
		this.type = type;
	},
	apply : function(target){
		if(!target){
			target = document.body;
		} else {
			target = $(target)
		}
		addEvent(target, this.type, function(e){
			var e = e || window.event;
			var element = e.target || e.srcElement;
			var args = Array.prototype.slice(arguments);
			args[0] = e;
			if(Event.cancelFlag[e.type] == true){
				Event.cancelFlag[e.type] = false;
				return;
			}
			/* 
			this.event_list.forEach(function(pair){
				this.enable && pair[1].apply(element,args) && pair[2].apply(element,args)
			},this)
			*/
			var pair;
			for(var i=0;i<this.event_list.length;i++){
				pair = this.event_list[i];
				this.enable && pair[1].apply(element,args) && pair[2].apply(element,args);
			}
			element = null;
			e = null;
		}.bind(this))
		this.destroy();
	},
	destroy : function(){},
	add : function(trigger, callback){
		var expression;
		if(isString(trigger)){
			expression = cssTester(trigger);
		} else {
			expression = trigger;
		}
		this.event_list.push([
			trigger, expression, callback
		]);
		return this
	},
	remove : function(trigger){
		this.event_list = this.event_list.reject(function(pair){
			return pair[0] == trigger;
		});
		return this;
	},
	toggle : function(state){
		this.enable = arguments.length ? !this.enable : state;
		return this.enable;
	}
});

/*
 queryCSS
 - 特定のElementがCSSruleにマッチするかどうかを判別する
 based on Behaviour.js / BSD Licensed.
*/
/* That revolting regular expression explained 
/^(\w+)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/
  \---/  \---/\-------------/    \-------/
    |      |         |               |
    |      |         |           The value
    |      |    ~,|,^,$,* or =
    |   Attribute 
   Tag
*/
function cssTester(rule){
	return function(){
		return queryCSS(this,rule)
	}
}
function queryCSS(el,rule){
	var tokens = rule.split(' ');
	var checkFunctions = [];
	function cmp(a,b){
		return (""+a).toLowerCase() == (""+b).toLowerCase();
	}
	function isFunction(obj){
		return typeof obj == "function";
	}
	function isArray(obj){
		return obj instanceof Array;
	}
	function expr_rules(rules){
		return function(el){
			var flag = true;
			for(var i=0;i<rules.length;i++){
				var rule = rules[i];
				flag = isArray(rule) ? cmp(el[rule[0]], rule[1]) :
					isFunction(rule) ? rule(el) : rule;
				if(flag == false) return false;
			}
			return true;
		}
	}
	function attrGetter(attr){
		return function(el){
			var res = el.getAttribute(attr);
			return res ? res : ""
		}
	}
	tokens.forEach(function(token){
		var rules = [];
		token = token.replace(/^\s+(.*?)\s+$/,"$1");
		// class or id selector
		var sep = 
			token.indexOf('#') > -1 ? '#' :
			token.indexOf('.') > -1 ? '.' : null;
		if(sep){
			var bits = token.split(sep);
			var tagName = bits[0];
			var value = bits[1];
			var id_or_class = sep == '#' ? 'id' : 'className';
			tagName && rules.push(['tagName', tagName]);
			rules.push([id_or_class,value]);
			checkFunctions.push(expr_rules(rules));
			return;
		}
		if(token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)){
			var tagName   = RegExp.$1;
			var attrName  = RegExp.$2;
			var op = RegExp.$3;
			var attrValue = RegExp.$4;
		 	var getA = attrGetter(attrName);
		 	if(tagName){
		 		tagName == '*' ? rules.push(true) : rules.push(['tagName', tagName]);
		 	}
			var expression =
				op == '=' ? function(el){ return (getA(el) == attrValue) } :
		 		op == '~' ? function(el){ return (getA(el).match(new RegExp('\\b'+attrValue+'\\b'))) } :
				op == '|' ? function(el){ return (getA(el).match(new RegExp('^'+attrValue+'-?'))) } :
				op == '^' ? function(el){ return (getA(el).indexOf(attrValue) == 0) } :
				op == '$' ? function(el){ return (getA(el).lastIndexOf(attrValue) == (getA(el)).length - attrValue.length) }:
				op == '*' ? function(el){ return (getA(el).indexOf(attrValue) > -1) } :
				function(e) { return getA(e) };
			rules.push(expression)
			checkFunctions.push(expr_rules(rules));
			return;
		}
		// just tagName
		var tagName = token;
		if(tagName == "*"){
			checkFunctions.push(function(){return true});
		} else {
			checkFunctions.push(expr_rules([
				["tagName", tagName]
			]));
		}
		return;
	});
	checkFunctions = checkFunctions.reverse();
	var currentNode = el;
	return checkFunctions.every(function(test,i){
		// 最後の条件
		if(i == 0){
			return test(currentNode);
		}
		// 2番目以降、親を辿る
		while(currentNode = currentNode.parentNode){
			var res = test(currentNode);
			if(res) return true
		}
		return false;
	});
}


/*
 hotkey.js
  usage :
   var kb = new HotKey;
   kb.add("a",function(){alert("a")});
   kb.add("A",function(){alert("Shift+a")});
*/
function HotKey(element, name){
	var ctor = arguments.callee;
	var target = element || document;
	this._target = target;
	this._keyfunc = {};
	this._ctor = ctor;
	if(name){
		ctor.keysets[name] = this;
	}
	// attach event
	if(!ctor.Base.initialized){
		Event.observe(target, "keydown",  ctor.Base.invoke_keydown, true);
		Event.observe(target, "keypress", ctor.Base.invoke_keypress, true);
		ctor.Base.initialized = true;
	}
	this.active = true;
	this.init();
}

HotKey.register_keylistener = function(handler, f){
	if(handler == "keydown"){
		this.Base.KeydownListeners.push(f)
	}
	if(handler == "keypress"){
		this.Base.KeypressListeners.push(f)
	}
};

HotKey.Base = {
	initialized : false,
	KeydownListeners  : [],
	KeypressListeners : [],
	invoke_keydown : function(e){
		var listeners = HotKey.Base.KeydownListeners;
		for(var i=0;i<listeners.length;i++){
			listeners[i].call(this, e);
		}
	},
	invoke_keypress : function(e){
		var listeners = HotKey.Base.KeypressListeners;
		for(var i=0;i<listeners.length;i++){
			listeners[i].call(this, e);
		}
	}
};

// keycode
HotKey.kc2char = function(kc){
	var between = function(a,b){
		return a <= kc && kc <= b
	}
	var _32_40 = "space pageup pagedown end home left up right down".split(" ");
	var kt = {
		8  : "back",
		9  : "tab",
		10 : "enter",
		13 : "enter",
		16 : "shift",
		17 : "ctrl",
		58 : ":", // keypress
		60 : "<", // keypress
		62 : ">", // keypress
		63 : "?", // keypress
		229: "IME"
	};
	return (
		between(65,90)  ? String.fromCharCode(kc+32) : // keydown  a-z
		between(97,122) ? String.fromCharCode(kc) :    // keypress a-z
		between(48,57)  ? String.fromCharCode(kc) :    // 0-9
		between(96,105) ? String.fromCharCode(kc-48) : // num 0-9
		between(32,40)  ? _32_40[kc-32] :
		kt.hasOwnProperty(kc) ? kt[kc] : 
		"null"
	)
}

HotKey.specialCase = function(e){
	var kc = e.keyCode;
	// alert([e.type, e.keyCode]);
	if(window.opera && e.type == "keypress" && e.keyCode == 46)  return "delete";
	if(e.type == "keypress" && e.keyCode == 27) return "esc";
	if(e.type == "keydown" && e.keyCode == 46)  return "delete";
	if(112 <= e.keyCode && e.keyCode <= 123){
		 if(e.type  == "keydown"){return "f"+ (kc - 111)}
		 if(e.which == 0){return "f"+ (kc - 111)}
	}
	return false;
}

// printableなキーが押されたかどうかを判別する
HotKey.isPrintable = function(e){
	var c = HotKey.getChar(e);
	// 対応してないキー
	if(!c) return true;
	if(/^[0-9a-z]{1,1}$/.test(c)) return true;
	if(/IME|space|\>|\<|\?/i.test(c)) return true;
	return false;
}


// keypress, keydown
// keycode , which
// IE, Opera, Firefox, Safari
HotKey.getChar = function(e){
	var c = HotKey.specialCase(e);
	if(c) return c;
	var between = function(a,b){
		return a <= kc && kc <= b
	}
	var kc = e.keyCode || e.which;
	if(e.keyCode){
		return HotKey.kc2char(kc)
	} else if(e.which){
		return HotKey.kc2char(kc);
	}
};

// キーセットの切り替え
HotKey.keysets = {};
HotKey.use_only = function(name){
	var keysets = this.keysets;
	if(!keysets.hasOwnProperty(name)) return;
	for(var i in keysets){
		keysets[i].activate(false);
	}
	setTimeout(function(){
		keysets[name].activate(true);
	}, 0);
};

HotKey.prototype.globalCallback = function(){};
HotKey.prototype.ignore = /input|textarea/i;
HotKey.prototype.allow  = /element_id/;
HotKey.prototype.filter = function(e){ return true };
HotKey.prototype.abort = true;
HotKey.prototype.init = function(){
	var self = this;
	var target = this._target;
	var cancelNext;
	var state = "";
	var count = 0;
	//var log = [];
	// keydown -> keypress
	var keydown_listener = function(e){
		if(!self.active) return;
		self.globalCallback();
		//window.status = count++ + "keydown";
		if(window.opera){Event.stop(e);return}
		if(e.metaKey || e.altKey) {return}
		self.event = e;
		self.lastInput = self.get_input(e);
		self.lastCapture = "keydown";
		if(self.invoke()){
			cancelNext = true;
		} else {
			cancelNext = false;
			self.lastCapture  = "";
		}
		// log.push(self.lastInput);
	};

	var keypress_listener = function(e){
		if(!self.active) return;
		self.globalCallback();
		if(e.metaKey || e.altKey) {return}
		if(cancelNext){
			cancelNext = false;
			self.lastCapture = "keypress";
			Event.stop(e);
			return;
		}
		self.event = e;
		var input = self.get_input(e);
		//window.status = count++  + "keypress"+ input;
		if(self.lastCapture != "keydown" || self.lastInput != input){
			self.lastInput = input;
			self.lastCapture = "keypress";
			// log.push(self.lastInput)
			self.invoke();
		}
	};

	// keypress listener
	this._ctor.register_keylistener("keydown", keydown_listener, self);
	this._ctor.register_keylistener("keypress", keypress_listener, self);
};

HotKey.prototype.invoke = function(input){
	input = input || this.lastInput;
	var e = this.event;
	if(!this._keyfunc.hasOwnProperty(input)) return false;
	if(typeof this._keyfunc[input] != "function") return false;
	// abort browser action
	this.abort && Event.stop(e);
	this._keyfunc[input].call(this, e);
	this.lastInvoke = input;
	return true
};

HotKey.prototype.get_input = function(e){
	var el  = (e.target || e.srcElement);
	var tag = el.tagName;
	var id  = el.id;
	if(!this.allow.test(id) && this.ignore.test(tag)) return;
	// filter
	if(!this.filter(e)) return false;
	var input = HotKey.getChar(e) + "";
	// window.status = [e.type, e.keyCode,e.button, e.which,input];
	if(e.shiftKey && input != "shift"){
		input = (input.length == 1) ? input.toUpperCase() :	"shift+" + input;
	}
	if(e.ctrlKey && !/ctrl/i.test(input))
		 input = "ctrl+" + input;
	return input;
};

HotKey.prototype.sendKey = function(key){
	this._keyfunc[key] && this._keyfunc[key]()
};

HotKey.prototype.add = function(key, func){
	if(key.constructor == Array){
		for(var i=0;i<key.length;i++)
			this.add(key[i], func)
	}else if(key.indexOf("|") != -1){
		this.add(key.split("|"), func);
	}else{
		this._keyfunc[key] = func;
	}
};

HotKey.prototype.remove = function(key){
	delete this._keyfunc[key];
	return this;
};

HotKey.prototype.activate = function(sw){
	this.active = sw;
	return this;
};

HotKey.prototype.clear = function(){
	this._keyfunc = {};
};
