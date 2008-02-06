/*
 hotkey.js
  usage :
   var kb = new HotKey;
   kb.add("a",function(){alert("a")});
   kb.add("A",function(){alert("Shift+a")});
*/
function HotKey(element){
	this._target = element || document;
	this._keyfunc = {};
	this.init();

}
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
}
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
	}

	var keypress_listener = function(e){
		self.globalCallback();
		if(e.metaKey || e.altKey) {return}
		if(cancelNext){
			cancelNext = false;
			self.lastCapture = "keypress";
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
	}
	// keypress listener
	Event.observe(target,"keydown",  keydown_listener, true);
	Event.observe(target,"keypress", keypress_listener, true);
}
HotKey.prototype.invoke = function(input){
	input = input || this.lastInput;
	var e = this.event;
	if(this._keyfunc.hasOwnProperty(input)){
		this._keyfunc[input].call(this,e);
		this.abort && Event.stop(e);
		return true
	}
	return false;
}

HotKey.prototype.get_input = function(e){
	var el  = (e.target || e.srcElement);
	var tag = el.tagName;
	var id  = el.id;
	if(!this.allow.test(id) && this.ignore.test(tag)) return;
	// filter
	if(!this.filter(e)) return false;
	
	var input = HotKey.getChar(e);
	// window.status = [e.type, e.keyCode,e.button, e.which,input];
	if(e.shiftKey && input != "shift"){
		input = (input.length == 1) ? input.toUpperCase() :	"shift+" + input;
	}
	if(e.ctrlKey && !/ctrl/i.test(input))
		 input = "ctrl+" + input;
	return input;
}
HotKey.prototype.sendKey = function(key){
	this._keyfunc[key] && this._keyfunc[key]()
}
HotKey.prototype.add = function(key,func){
	if(key.constructor == Array){
		for(var i=0;i<key.length;i++)
			this.add(key[i], func)
	}else if(key.indexOf("|") != -1){
		this.add(key.split("|"), func);
	}else{
		this._keyfunc[key] = func;
	}
}
HotKey.prototype.clear = function(){
	this._keyfunc = {};
}
