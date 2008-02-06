// ------------------------------
// compat.js : 2007-03-12T09:21:39
// ------------------------------

// compat
Array.prototype.forEach = function(callback,thisObject){
	for(var i=0,len=this.length;i<len;i++)
		callback.call(thisObject,this[i],i,this)
};
Array.prototype.map = function(callback,thisObject){
	for(var i=0,res=[],len=this.length;i<len;i++)
		res[i] = callback.call(thisObject,this[i],i,this);
	return res
};
Array.prototype.filter = function(callback,thisObject){
	for(var i=0,res=[],len=this.length;i<len;i++)
		callback.call(thisObject,this[i],i,this) && res.push(this[i]);
	return res
};
Array.prototype.indexOf = function(searchElement,fromIndex){
	var i = (fromIndex < 0) ? this.length+fromIndex : fromIndex || 0;
	for(;i<this.length;i++)
		if(searchElement === this[i]) return i;
	return -1
};
Array.prototype.lastIndexOf = function(searchElement,fromIndex){
	var max = this.length-1;
	var i = (fromIndex < 0)   ? Math.max(max+1 + fromIndex,0) :
			(fromIndex > max) ? max :
			max-(fromIndex||0) || max;
	for(;i>=0;i--)
		if(searchElement === this[i]) return i;
	return -1
};
Array.prototype.every = function(callback,thisObject){
	for(var i=0,len=this.length;i<len;i++)
		if(!callback.call(thisObject,this[i],i,this)) return false;
	return true
};
Array.prototype.some = function(callback,thisObject){
	for(var i=0,len=this.length;i<len;i++)
		if(callback.call(thisObject,this[i],i,this)) return true;
	return false
};

// generic
if(!Array.forEach){
	(function(){
		var methods = "forEach map filter indexOf lastIndexOf every some".split(" ");
		methods.forEach(function(mn){
			Array[mn] = function(){
				// var args = Array.from(arguments);
				var args = Array.prototype.slice.call(arguments, 0);
				var self = args.shift();
				return Array.prototype[mn].apply(self,args);
			}
		});
	})();
}


(function(){
// IE
if(typeof ActiveXObject == "function"){
	var empty = function(){};
	_XMLHttpRequest = function(){
		var self = this;
		var props = "readyState,responseText,responseXML,status,statusText".split(",");
		this.readyState  = 0;
		this.__request__ = new ActiveXObject("Microsoft.XMLHTTP");
		this.__request__.onreadystatechange = function(){
			for(var i=0;i<props.length;i++){
				try{
					self[props[i]] = self.__request__[props[i]]
				}catch(e){
				}
			}
			self.onreadystatechange();
			if(self.readyState == 4){
				self.onload();
				self.__request__.onreadystatechange = empty;
				self.__request__ = null;
				self.onreadystatechange = empty;
				self.onload = empty;
			}
		}
		this.onreadystatechange = empty;
		this.onload = empty;
	}
	var methods = "open,abort,send,setRequestHeader,getResponseHeader,getAllResponseHeaders".split(",");
	var make_method = function(name){
		_XMLHttpRequest.prototype[name] = function(){
			var params = new Array(arguments.length);
			for(var i=0;i<params.length;i++) params[i] = "_"+i;
			return Function(
				params.join(","),
				["return this.__request__.",name,"(",params.join(","),")"].join("")
			).apply(this,arguments);
		}
	};
	for(var i=0;i<methods.length;i++) make_method(methods[i]);
	try{ XMLHttpRequest = _XMLHttpRequest } catch(e){}
} else if(typeof XMLHttpRequest != "undefined"){
	_XMLHttpRequest = XMLHttpRequest;
}
})();

// ------------------------------
// END OF compat.js
// ------------------------------

// ------------------------------
// common.js : 2007-06-27T09:15:39
// ------------------------------

/*
 良く使う関数
*/

var GLOBAL = this;

// bench
function $(el){
	//return typeof el == 'string' ? document.getElementById(el) : el;
	if(typeof el == 'string'){
		return ($.cacheable[el])
			? $.cache[el] || ($.cache[el] = document.getElementById(el))
			: document.getElementById(el)
	} else {
		return el
	}
}
$.cache = {};
$.cacheable = {};

var setText;
var getText;
(function(){
	// private value
	var text = {};
	setText = function(key, value){
		if(isString(key)){
			text[key] = value;
		} else {
			Object.extend(text, key)
		}
	};
	getText = function(key){
		return text[key]
	};
})();

// translate
function tl(str){
	str = "" + str;
	var t = getText(str) || getText(str.toLowerCase());
	return (t) ? t : str;
}

function getlocale(){
	var na = window.navigator;
	/*
	na.language
	na.userLanguage*/
}



var _ = {};
$N = function (name, attr, childs) {
	var ret = document.createElement(name);
	for (k in attr) {
		if (!attr.hasOwnProperty(k)) continue;
		v = attr[k];
		(k == "class") ? (ret.className = v) :
		(k == "style") ? setStyle(ret,v) : ret.setAttribute(k, v);
	}
	var t = typeof clilds;
	(isString(childs))? ret.appendChild(document.createTextNode(childs)) :
	(isArray(childs)) ? foreach(childs,function(child){
		isString(child)
			? ret.appendChild(document.createTextNode(child))
			: ret.appendChild(child);
		})
	: null;
	return ret;
};
function $DF(){
	var df = document.createDocumentFragment();
	foreach(arguments,function(f){ df.appendChild(f) });
	return df;
}
function reserveName(name){
	var root = this;
	var ns = name.split(".");
	for(var i=0;i<ns.length;i++){
		var current = ns[i];
		if(!root[current]) root[current] = {};
		root = root[current]
	}
}
function True(){return true}
function False(){return false}

//
function BrowserDetect(){
	var ua = navigator.userAgent;
	if(ua.indexOf( "KHTML" ) > -1) this.isKHTML = true;
	if(ua.indexOf( "Macintosh" ) > -1) this.isMac   = true;
	if(ua.indexOf( "Windows" ) > -1) this.isWin   = true;
	if(ua.indexOf( "Gecko" ) > -1 && !this.isKHTML) this.isGecko = true;
	if(ua.indexOf( "Firefox" ) > -1) this.isFirefox = true;
	this.isWindows = this.isWin;
	if(window.opera){
		this.isOpera = true;
	} else if(ua.indexOf( "MSIE" ) > -1){
		this.isIE = true;
	}
}



Array.from = function(array) {
	// arguments
	if(array.callee){
		return Array.prototype.slice.call(array,0)
	}
	var length = array.length;
	var result = new Array(length);
	for (var i = 0; i < length; i++)
		result[i] = array[i];
	return result;
};
Function.prototype.cut = function() {
	var func = this;
	var template = Array.from(arguments);
	return function() {
		var args = Array.from(arguments);
		return func.apply(null, template.map(function(arg) {
			return arg == _ ? args.shift() : arg;
		}));
	}
};
Function.prototype.o = function(a) {
	var f = this;
	return function() {
		return f(a.apply(null, arguments));
	}
};

/*
 Class
*/
Class = function(){return function(){return this}};
Class.Traits = {};
Class.create = function(traits){
	var f = function(){
		this.initialize.apply(this, arguments);
	};
	f.prototype.initialize = function(){};
	f.isClass = true;
	f.extend = function(other){
		extend(f.prototype,other);
		return f;
	};
	if(traits && Class.Traits[traits])
		f.extend(Class.Traits[traits]);
	return f;
};
// 他のクラスまたはオブジェクトをベースに新しいクラスを作成する
Class.base = function(base_class){
	if(base_class.isClass){
		var child = Class.create();
		child.prototype = new base_class;
		return child;
	} else {
		var base = Class();
		base.prototype = base_class;
		var child = Class.create();
		child.prototype = new base;
		return child;
	}
};
// クラスを合成
Class.merge = function(a,b){
	var c = Class.create();
	var ap = a.prototype;
	var bp = b.prototype;
	var cp = c.prototype;
	var methods = Array.concat(keys(ap),keys(bp)).uniq();
	foreach(methods,function(key){
		if(isFunction(ap[key]) && isFunction(bp[key])){
			cp[key] = function(){
				ap[key].apply(this,arguments);
				return bp[key].apply(this,arguments);
			}
		} else {
			cp[key] = 
				isFunction(ap[key]) ? ap[key] :
				isFunction(bp[key]) ? bp[key] : null
		}
	});
	return c;
}
/*
*/


/* generic */
if(!Array.concat){
	(function(){
		var methods = "concat slice shift push unshift pop sort reverse".split(" ");
		foreach(methods,function(mn){
			Array[mn] = function(){
				var args = Array.from(arguments);
				var self = args.shift();
				return Array.prototype[mn].apply(self,args);
			}
		})
	})();
}


function extend(self,other){
	for(var i in other){
		self[i] = other[i]
	}
	return self;
}
function base(obj){
	function f(){return this};
	f.prototype = obj;
	return new f;
}
function clone(obj){
	var o = {};
	for(var i in obj){
		o[i] = obj[i]
	};
	return o
}
function keys(hash){
	var tmp = [];
	for(var key in hash){
		tmp.push(key)
	}
	return tmp;
}
function each(obj,callback){
	for(var i in obj){
		callback(obj[i],i)
	}
}

function foreach(a,f){
	var c = 0;
	var len = a.length;
	var i = len % 8;
	if (i>0) do {
		f(a[c],c++,a);
	} while (--i);
	i = parseInt(len >> 3);
	if (i>0) do {
		f(a[c],c++,a);f(a[c],c++,a);
		f(a[c],c++,a);f(a[c],c++,a);
		f(a[c],c++,a);f(a[c],c++,a);
		f(a[c],c++,a);f(a[c],c++,a);
	} while (--i);
};
/*
function foreach(array,callback){
	var len = array.length;
	for(var i=0;i<len;i++){
		callback(array[i],i,array)
	}
}
*/
/* Perlのjoin、中の配列も含めて同じルールでjoinする  */
function join(){
	var args = Array.from(arguments);
	var sep = args.shift();
	var to_s = Array.prototype.toString;
	Array.prototype.toString = function(){return this.join(sep)}
	var res = args.join(sep);
	Array.prototype.toString = to_s;
	return res;
}

/*  */

function Arg(n){
	return function(){ return arguments[n] }
}
function This(){
	return function(){ return this }
}
// 関数の結果に対してsend
Function.prototype.send = function(method,args){
	var self = this;
	return function(){
		return send(self.apply(this,arguments),method,args)
	}
};
function send(self,method,args){
	if(isFunction(self[method]))
		return self[method].apply(self,args);
	else if(isFunction(self.method_missing))
		return self.method_missing(method,args)
	else
		return null
}
// methodに別名を付ける
function alias(method){
	return function(){
		return this[method].apply(this,arguments)
	}
}

/*
 transform functions
*/
function sender(method){
	var args = Array.slice(arguments,1);
	return function(self){
		var ex_args = Array.from(arguments);
		return send(self,method,args.concat(ex_args))
	}
}
// thisに対してmethodを呼び出す関数を生成する
// methodは文字列もしくは関数
/*
 invoker(arg(1),)
*/
function invoker(method){
	var args = Array.slice(arguments,1);
	if(isFunction(method)){
		return function(){
			var ex_args = Array.from(arguments);
			return method.apply(this,args.concat(ex_args))
		}
	} else {
		return function(){
			var ex_args = Array.from(arguments);
			return send(this,method,args.concat(ex_args))
		}
	}
}
/*
 push : function(item){ return this.list.push(item) }
 -> push : delegator("list","push");
*/
function delegator(key,method){
	return function(){
		var self = this[key];
		return self[method].apply(self,arguments);
	}
}

function getter(attr){
	return function(self){return self[attr]}
}

/*
 extend buildin object
*/
foreach("String,Number,Array,Function".split(","),function(c){
	var klass = GLOBAL[c];
	klass.isClass = true;
	klass.extend = function(other){
		return extend(klass.prototype,other);
	}
	klass.prototype["is"+c] = true
})
Object.extend = extend;
/*
  and more extra methods
*/

Array.prototype.min = function(cmp){return (cmp?this.sort(cmp):this.sort()).first()}
Array.prototype.max = function(cmp){return (cmp?this.sort(cmp):this.sort()).last()}
Array.prototype.compact = function(){
	return this.remove("");
}

Array.extend({
	isArray : true,
	clone : function(){ return this.concat() },
	clear : function(){ this.length = 0; return this },
	delete_at : function(pos){
		return this.splice(pos,1);
	},
	first : function(size){
		return (size == undefined) ? this[0] : this.slice(0,size)
	},
	last : function(size){
		return (size == undefined) ? this[this.length-1] : this.slice(this.length-size)
	},
	select : alias("filter"),
	remove : function(to_remove){
		return this.select(function(val){return val != to_remove ? true : false});
	},
	compact : invoke("remove",""),
	// 重複をなくす、破壊的
	uniq : function(){
		var tmp = {};
		var len = this.length;
		for(var i=0;i<this.length;i++){
			if(tmp.hasOwnProperty(this[i])){
				this.splice(i,1);
				if(this.length == i){break}
				i--;
			}else{
				tmp[this[i]] = true;
			}
		}
		return this;
	},
	// 各要素にメソッドを送る
	invoke : function(){
		var args = Array.from(arguments);
		var method = args.shift();
		return this.map(sender(method,args));
	},
	// ハッシュの配列から指定キーのvalueのみを集めた配列を返す
	pluck : function(name){
		return this.map(getter(name))
	},
	partition : function(callback,thisObj) {
		var trues = [], falses = [];
		this.forEach(function(v,i,self){
			(callback.call(thisObj,v,i,self) ? trues : falses).push(v);
		});
		return [trues, falses];
	}
});

/*
 detect
*/
function isString(obj){
	return (typeof obj == "string" || obj instanceof String) ? true : false
}
function isNumber(obj){
	return (typeof obj == "number" || obj instanceof Number) ? true : false;
}
function isElement(obj){
	return obj.nodeType ? true : false;
}
function isFunction(obj){
	return typeof obj == "function";
}
function isArray(obj){
	return obj instanceof Array;
}
function isRegExp(obj){
	return obj instanceof RegExp
}
function isDate(obj){
	return obj instanceof Date
}


/* Accessor */
function Accessor(){
	var value;
	var p_getter = this.getter;
	var p_setter = this.setter;
	var accessor = function(new_value){
		if(arguments.length){
			var setter = accessor.setter || p_setter;
			return (value = setter(new_value, value));
		} else {
			var getter = accessor.getter || p_getter;
			return getter(value)
		}
		return (arguments.length) ? (value = new_value) : value
	};
	accessor.isAccessor = true;
	return accessor;
}
Accessor.prototype.getter = function(value){ return value };
Accessor.prototype.setter = function(value){ return value };

/*
 Cookie
*/
var Cookie = Class.create();
Cookie.extend({
	initialize: function(opt){
		this._options = "name,value,expires,path,domain,secure".split(",");
		this._mk_accessors(this._options);
		this.expires.setter = function(value){
			if(isDate(value)){
				value = this.expires.toString();
			} else if(isNumber(value)){
				value = new Date(new Date() - 0 + value).toString();
			}
			return value
		}
		if(opt) this._set_options(opt);
	},
	_set_options : function(opt){
		var self = this;
		this._options.forEach(function(key){
			opt.hasOwnProperty(key) && self[key](opt[key])
		})
	},
	_mk_accessors: function(args){
		for(var i=0;i<args.length;i++){
			var name = args[i];
			this[name] = new Accessor()
		}
	},
	parse: function(str){
		var hash = {};
		var ck = str || document.cookie;
		var pairs = ck.split(/\s*;\s*/);
		pairs.forEach(function(v){
			var tmp = v.split("=",2);
			hash[tmp[0]] = tmp[1];
		})
		return hash;
	},
	bake: function(){
		document.cookie = this.as_string();
	},
	as_string: function(){
		var e,p,d,s;
		e = this.expires();
		p = this.path();
		d = this.domain();
		s = this.secure();
		var options = [
			(e ? ";expires=" + e.toGMTString() : ""),
			(p ? ";path=" + p : ""),
			(d ? ";domain=" + d : ""),
			(s ? ";secure" : "")
		].join("");
		var cookie = [this.name(),"=",this.value(),options].join("");
		return cookie;
	}
});
Cookie.default_expire = 60*60*24*365*1000;
function setCookie(name,value,expires,path,domain,secure){
	if(isDate(expires)){
		expire_str = "expires="+expires.toString();
	} else if(isNumber(expires)){
		expire_str = "expires="+new Date(new Date() - 0 + expire).toString();
	} else {
		expire_str = "expires="+new Date(new Date() - 0 + Cookie.default_expire).toString();
	}
	if(!path) path = "; path=/;";
	var cookie = new Cookie({
		name    : name,
		value   : value,
		path    : path || "/",
		expires : expires
	});
	cookie.bake();
}
function getCookie(key){
	var hash = new Cookie().parse();
	return hash[key];
}


/* Array */
Array.extend({
	collect : alias("map"),
	reduce : function(callback){
		return this.map(callback).join("")
	}
});
/* Number */
Number.extend({
	toHex : invoker("toString",16),
	zerofill : function(len){
		var n = "" + this;
		for(;n.length < len;)
			n = "0" + n;
		return n;
	},
	// 両端を含む
	between : function(a,b){
		var min = Math.min(a,b);
		var max = Math.max(a,b);
		return (this >= min && this <= max);
	}
});
/* Function */
Function.extend({
	applied : function(thisObj,args){
		var self = this;
		return function(){
			return self.apply(thisObj,args)
		}
	},
	bindThis : function(thisObj){
		var self = this;
		return function(){
			return self.apply(thisObj,arguments)
		}
	},
	bind : alias("bindThis"),
	// 引数をsliceする
	slicer : function(to,end){
		var self = this;
		return function(){
			var sliced = Array.slice(arguments,to,end);
			return self.apply(this,sliced);
		}
	}
});


function loadRaw(url){
	var req = new XMLHttpRequest;
	var res;
	req.open("GET",url,false);
	req.onload = function(){
		res = req.responseText;
	};
	req.send(null);
	return res;
}
function loadJson(url,callback){
	if(dev){
		if(!dummy[url]){return}
		var json = dummy[url].isString ? eval("("+dummy[url]+")") : dummy[url];
		callback(json);
		return;
	}
	var req = new XMLHttpRequest;
	req.open("GET",url,true);
	req.onload = function(){
		eval("var json ="+req.responseText);
		callback(json)
	};
	req.send(null)
}

/*
 className
*/
function hasClass(element,classname){
	element = $(element);
	var cl = element.className;
	var cls = cl.split(/\s+/);
	return cls.indexOf(classname) != -1;
}
function addClass(element,classname){
	element = $(element);
	var cl = element.className;
	if(!contain(cl,classname)){
		element.className += " " + classname;
	}
}
function removeClass(element,classname){
	element = $(element);
	var cl = element.className;
	var cls = cl.split(/\s+/);
	element.className = cls.remove(classname).join(" ");
}
function switchClass(element, classname){
	element = $(element);
	var cl = element.className;
	var tmp = classname.split("-");
	var ns = tmp[0];
	var cls = cl.split(/\s+/);
	var buf = [];
	cls.forEach(function(v){
		if(v.indexOf(ns+"-") != 0) buf.push(v)}
	);
	buf.push(classname);
	element.className = buf.join(" ");
}
function toggleClass(element, classname){
	element = $(element);
	hasClass(element, classname) ?
		removeClass(element, classname):
		addClass(element, classname);
}
/* 文字列が含まれているかの判別 */
function contain(self,other){
	if(isString(self) && isString(other)){
		return self.indexOf(other) != -1
	}
	if(isRegExp(other)){
		return other.test(self)
	}
}


/* Form */

var Form = {};
Form.toJson = function(form){
	var json = {};
	var len = form.elements.length;
	foreach(form.elements, function(el){
		if(!el.name) return;
		var value = Form.getValue(el);
		if(value != null){
			json[el.name] = value
		}
	});
	return json;
};
Form.getValue = function(el){
	return (
		(/text|hidden|submit/.test(el.type)) ? el.value :
		(el.type == "checkbox" && el.checked) ? el.value :
		(el.type == "radio"    && el.checked) ? el.value :
		(el.tagName == "SELECT") ? el.options[el.selectedIndex].value :
		null
	)
};
// formを埋める
Form.fill = function(form,json){
	form = $(form);
	foreach(form.elements, function(el){
		var name = el.name; 
		var value = json[name];
		if(!name || value == null) return;
		(/text|hidden|select|submit/.test(el.type)) ? 
			(el.value = value) :
		(el.type == "checkbox") ? (el.value = value, el.checked = true) :
		(el.type == "radio") ?
			(value == el.value) ? (el.checked = true) : (el.checked = false) :
		null
	})
}
Form.setValue = function(el, value){
	el.value = value;
	
}

Object.extend(Form,{
	disable: function(el){
		$(el).disabled = "disabled";
	},
	enable: function(el){
		$(el).disabled = "";
	},
	disable_all: function(el){
		el = $(el);
		Form.disable(el);
		var child = el.getElementsByTagName("*");
		foreach(child, Form.disable);
	},
	enable_all: function(el){
		el = $(el);
		Form.enable(el);
		var child = el.getElementsByTagName("*");
		foreach(child, Form.enable);
	}
});


/* DateTime */
function DateTime(time){
	this._date = time ? new Date(time) : new Date;
	this._update();
	this.toString = function(){ return [this.ymd(),this.hms()].join(" ")}
	this.valueOf  = function(){ return this._date - 0 };
}
DateTime.now = function(){
	return new DateTime;
};
DateTime.prototype = {
	_update : function(){
		var dt = this._date;
		this.year  = dt.getFullYear();
		this.month = this.mon  = dt.getMonth() + 1;
		this.day   = this.mday = this.day_of_month = dt.getDate();
		this.hour  = dt.getHours();
		this.minute = this.min = dt.getMinutes();
		this.second = this.sec = dt.getSeconds();
	},
	ymd : function(sep){
		sep = arguments.length ? sep : "/";
		return [this.year,this.month,this.day].invoke("zerofill",2).join(sep)
	},
	hms : function(sep){
		sep = arguments.length ? sep : ":";
		return [this.hour,this.minute,this.second].invoke("zerofill",2).join(sep)
	}
};
DateTime.prototype.ymd_jp = function(){
	var ymd = [this.year,this.month,this.day].invoke("zerofill",2)
	return ymd[0]+"年"+ymd[1]+"月"+ymd[2]+"日";
};

/* Cache */

var Cache = Class.create();
Cache.extend({
	initialize : function(option){
		this._index = {};
		this._exprs = {};
		this._cache = [];
		if(option){
			this.max = option.max || 0;
		}
	},
	_get: function(key){
		return this._index["_" + key];
	},
	get: function(key){
		return this._get(key)[1]
	},
	set: function(key,value){
		// delete
		if(this.max && this._cache.length > this.max){
			var to_delete = this._cache.shift();
			delete this._index["_" + to_delete[0]];
		}
		// update
		if(this.has(key)){
			this._get(key)[1] = value;
		} else {
			// create
			var pair = [key,value];
			this._cache.push(pair);
			this._index["_"+key] = pair;
		}
		return value;
	},
	set_expr: function(key,expr){
		this._exprs["_" + key] = expr;
	},
	get_expr: function(key){
		return this._exprs["_" + key] || null;
	},
	check_expr: function(key){
		var expr = this.get_expr(key);
		if(expr){
			var r = new Date() - expr;
			var f = (r < 0) ? true : false;
			// if(!f) message("再読み込みします")
			return f;
		} else {
			return true;
		}
	},
	has : function(key){
		return (this._index.hasOwnProperty("_" + key) && this.check_expr(key));
	},
	clear : function(){
		this._index = {};
		this._cache  = [];
	},
	find_or_create : function(key,callback){
		return this.has(key) ? this.get(key) : this.set(key,callback())
	}
});

Number.extend({
	times: function(callback){
		var c = 0;
		for(;c<this;c++) callback(c)
	}
});

String.escapeRules = [
	[/&/g , "&amp;"],
	[/</g , "&lt;"],
	[/>/g , "&gt;"]
];
String.unescapeRules = [
	[/&lt;/g,  "<"],
	[/&gt;/g,  ">"],
	[/&amp;/g, "&"]
];
String.extend({
	strip : invoker("replace",/^\s+(.*?)\s+$/,"$1"),
	repeat : function(num){
		var buf = [];
		for(var i=0;i<num;buf[i++]=this);
		return buf.join("");
	},
	mreplace : function(rule){
		var tmp = ""+this;
		foreach(rule,function(v){
			tmp = tmp.replace(v[0],v[1])
		});
		return tmp;
	},
	escapeHTML : invoker("mreplace",String.escapeRules),
	unescapeHTML : invoker("mreplace",String.unescapeRules),
	ry : function(max,str){
		if(this.length <= max) return this;
		var tmp = this.split("");
		return Array.concat(this.slice(0,max/2),str,this.slice(-max/2)).join("")
	},
	camelize : invoker("replace",/-([a-z])/g, Arg(1).send("toUpperCase"))
});

/* Math */
Math.rand = function(num){return Math.random() * num};



function inspect(obj){
	return keys(obj).map(function(key){
		return key +" = "+obj[key] + "\n";
	})
}
Object.hasMethod = function(object,method){
	if(object && typeof object[method] == "function")
		return  true;
	else
		return false;
};


/* JSON */
var JSON = {};
JSON.parse = function(str){
	try{
		var res = eval("(" + str + ")");
	} catch(e){
		// alert(inspect(e))
		return null;
	}
	return res;
}

Array.toJSON = function(array){
	var i=0,len=array.length,json=[];
	for(;i<len;i++)
		json[i] = (array[i] != null) ? Object.toJSON(array[i]) : "null";
	return "[" + json.join(",") + "]";
}
Array.prototype.toJSON = function(){
	return Array.toJSON(this);
}
String.toJSON = function(string){
	return '"' +
		string.replace(/(\\|\")/g,"\\$1")
		.replace(/\n|\r|\t/g,function(){
			var a = arguments[0];
			return  (a == '\n') ? '\\n':
					(a == '\r') ? '\\r':
					(a == '\t') ? '\\t': ""
		}) + '"'
}
String.prototype.toJSON = function(){
	return String.toJSON(this)
}
Number.toJSON = function(number){
	return isFinite(number) ? String(number) : 'null'
}
Number.prototype.toJSON = function(){
	return Number.toJSON(this)
}
Boolean.prototype.toJSON = function(){return this}
Function.prototype.toJSON = function(){return this}
RegExp.prototype.toJSON = function(){return this}

// strict but slow
String.prototype.toJSON = function(){
	var tmp = this.split("");
	for(var i=0;i<tmp.length;i++){
		var c = tmp[i];
		(c >= ' ') ?
			(c == '\\') ? (tmp[i] = '\\\\'):
			(c == '"')  ? (tmp[i] = '\\"' ): 0 :
		(tmp[i] = 
			(c == '\n') ? '\\n' :
			(c == '\r') ? '\\r' :
			(c == '\t') ? '\\t' :
			(c == '\b') ? '\\b' :
			(c == '\f') ? '\\f' :
			(c = c.charCodeAt(),('\\u00' + ((c>15)?1:0)+(c%16)))
		)
	}
	return '"' + tmp.join("") + '"';
}
Object.toJSON = function(obj){
	var json = [];
	if(typeof obj == 'undefined') return "null";
	if(obj == null) return "null";
	if(typeof obj.toJSON == 'function'){
		return obj.toJSON();
	}
	for(var i in obj){
		if(!obj.hasOwnProperty(i)) continue;
		if(typeof obj[i] == "function") continue;
		json.push(
			i.toJSON()+":"+((obj[i] != null)? Object.toJSON(obj[i]) : "null")
		)
	}
	return "{" + json.join(",") + "}";
}

Object.toQuery = function(self){
	var buf = [];
	for(var key in self){
		var value = self[key];
		if(isFunction(value)) continue;
		buf.push(
			encodeURIComponent(key)+"="+
			encodeURIComponent(value)
		)
	}
	return buf.join("&");
}


/* from prototype.js */

var Position = {
  // set to true if needed, warning: firefox performance problems
  // NOT neeeded for page scrolling, only if draggable contained in
  // scrollable elements
  includeScrollOffsets: false,

  // must be called before calling withinIncludingScrolloffset, every time the
  // page is scrolled
  prepare: function() {
    this.deltaX =  window.pageXOffset
                || document.documentElement.scrollLeft
                || document.body.scrollLeft
                || 0;
    this.deltaY =  window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop
                || 0;
  },

  realOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.scrollTop  || 0;
      valueL += element.scrollLeft || 0;
      element = element.parentNode;
    } while (element);
    return [valueL, valueT];
  },

  cumulativeOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return [valueL, valueT];
  },

  positionedOffset: function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
      if (element) {
        p = Element.getStyle(element, 'position');
        if (p == 'relative' || p == 'absolute') break;
      }
    } while (element);
    return [valueL, valueT];
  },

  offsetParent: function(element) {
    if (element.offsetParent) return element.offsetParent;
    if (element == document.body) return element;

    while ((element = element.parentNode) && element != document.body)
      if (Element.getStyle(element, 'position') != 'static')
        return element;

    return document.body;
  },

  // caches x/y coordinate pair to use with overlap
  within: function(element, x, y) {
    if (this.includeScrollOffsets)
      return this.withinIncludingScrolloffsets(element, x, y);
    this.xcomp = x;
    this.ycomp = y;
    this.offset = this.cumulativeOffset(element);

    return (y >= this.offset[1] &&
            y <  this.offset[1] + element.offsetHeight &&
            x >= this.offset[0] &&
            x <  this.offset[0] + element.offsetWidth);
  },

  withinIncludingScrolloffsets: function(element, x, y) {
    var offsetcache = this.realOffset(element);

    this.xcomp = x + offsetcache[0] - this.deltaX;
    this.ycomp = y + offsetcache[1] - this.deltaY;
    this.offset = this.cumulativeOffset(element);

    return (this.ycomp >= this.offset[1] &&
            this.ycomp <  this.offset[1] + element.offsetHeight &&
            this.xcomp >= this.offset[0] &&
            this.xcomp <  this.offset[0] + element.offsetWidth);
  },

  // within must be called directly before
  overlap: function(mode, element) {
    if (!mode) return 0;
    if (mode == 'vertical')
      return ((this.offset[1] + element.offsetHeight) - this.ycomp) /
        element.offsetHeight;
    if (mode == 'horizontal')
      return ((this.offset[0] + element.offsetWidth) - this.xcomp) /
        element.offsetWidth;
  },

  clone: function(source, target) {
    source = $(source);
    target = $(target);
    target.style.position = 'absolute';
    var offsets = this.cumulativeOffset(source);
    target.style.top    = offsets[1] + 'px';
    target.style.left   = offsets[0] + 'px';
    target.style.width  = source.offsetWidth + 'px';
    target.style.height = source.offsetHeight + 'px';
  },

  page: function(forElement) {
    var valueT = 0, valueL = 0;

    var element = forElement;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;

      // Safari fix
      if (element.offsetParent==document.body)
        if (Element.getStyle(element,'position')=='absolute') break;

    } while (element = element.offsetParent);

    element = forElement;
    do {
      valueT -= element.scrollTop  || 0;
      valueL -= element.scrollLeft || 0;
    } while (element = element.parentNode);

    return [valueL, valueT];
  },

  clone: function(source, target) {
    var options = Object.extend({
      setLeft:    true,
      setTop:     true,
      setWidth:   true,
      setHeight:  true,
      offsetTop:  0,
      offsetLeft: 0
    }, arguments[2] || {})

    // find page position of source
    source = $(source);
    var p = Position.page(source);

    // find coordinate system to use
    target = $(target);
    var delta = [0, 0];
    var parent = null;
    // delta [0,0] will do fine with position: fixed elements,
    // position:absolute needs offsetParent deltas
    if (Element.getStyle(target,'position') == 'absolute') {
      parent = Position.offsetParent(target);
      delta = Position.page(parent);
    }

    // correct by body offsets (fixes Safari)
    if (parent == document.body) {
      delta[0] -= document.body.offsetLeft;
      delta[1] -= document.body.offsetTop;
    }

    // set position
    if(options.setLeft)   target.style.left  = (p[0] - delta[0] + options.offsetLeft) + 'px';
    if(options.setTop)    target.style.top   = (p[1] - delta[1] + options.offsetTop) + 'px';
    if(options.setWidth)  target.style.width = source.offsetWidth + 'px';
    if(options.setHeight) target.style.height = source.offsetHeight + 'px';
  },

  absolutize: function(element) {
    element = $(element);
    if (element.style.position == 'absolute') return;
    Position.prepare();

    var offsets = Position.positionedOffset(element);
    var top     = offsets[1];
    var left    = offsets[0];
    var width   = element.clientWidth;
    var height  = element.clientHeight;

    element._originalLeft   = left - parseFloat(element.style.left  || 0);
    element._originalTop    = top  - parseFloat(element.style.top || 0);
    element._originalWidth  = element.style.width;
    element._originalHeight = element.style.height;

    element.style.position = 'absolute';
    element.style.top    = top + 'px';;
    element.style.left   = left + 'px';;
    element.style.width  = width + 'px';;
    element.style.height = height + 'px';;
  },

  relativize: function(element) {
    element = $(element);
    if (element.style.position == 'relative') return;
    Position.prepare();

    element.style.position = 'relative';
    var top  = parseFloat(element.style.top  || 0) - (element._originalTop || 0);
    var left = parseFloat(element.style.left || 0) - (element._originalLeft || 0);

    element.style.top    = top + 'px';
    element.style.left   = left + 'px';
    element.style.height = element._originalHeight;
    element.style.width  = element._originalWidth;
  }
}

// Safari returns margins on body which is incorrect if the child is absolutely
// positioned.  For performance reasons, redefine Position.cumulativeOffset for
// KHTML/WebKit only.
if (/Konqueror|Safari|KHTML/.test(navigator.userAgent)) {
  Position.cumulativeOffset = function(element) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      if (element.offsetParent == document.body)
        if (Element.getStyle(element, 'position') == 'absolute') break;

      element = element.offsetParent;
    } while (element);

    return [valueL, valueT];
  }
}

Position.cumulativeOffsetFrom = function(element,from) {
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element && element != from);
    return [valueL, valueT];
};


/* CSS */
function parseCSS(text){
	var pairs = text.split(";");
	var res = {};
	pairs.forEach(function(pair){
		var tmp = pair.split(":");
		res[tmp[0].strip()] = tmp[1];
	});
	return res;
}
// cssセット、透明度、floatの互換性を取る
function setStyle(element,style){
	element = $(element);
	var es = element.style;
	if(isString(style)){
		es.cssText ? (es.cssText = style) : setStyle(element,parseCSS(style));
	} else {
		// objectの場合
		each(style,function(value,key){
			if(setStyle.hack.hasOwnProperty(key)){
				var tmp = setStyle.hack[key](key,value);
				key = tmp[0],value = tmp[1]
			}
			element.style[key.camelize()] = value
		});
	}
}
setStyle.hack = {
	opacity : function(key,value){
		return (
			(/MSIE/.test(navigator.userAgent))
				? ["filter" , 'alpha(opacity='+value*100+')']
				: [ key , value]
		)
	}
}

function getStyle(o,s){
	var res;
	try{
		if (document.defaultView && document.defaultView.getComputedStyle){
			res = document.defaultView.getComputedStyle(o, null).getPropertyValue(s);
		} else {
			if (o.currentStyle){
				var camelized = s.replace(/-([^-])/g, function(a,b){return b.toUpperCase()});
				res = o.currentStyle[camelized];
			}
		}
		return res;
	} catch(e){}
	return "";
}

var Element = {};
Element.getStyle = getStyle;
/*
*/

// var Config = {}
// Task
/*
 並列してリクエストを投げる、
  - 完了したものからcompleteフラグを立てる
  - 監視者のupdateメソッドを呼び出す
 
 var task = new Task([loadConfig,func,func]);
 task.oncomplete = function(){
 	// complete !
 };
 task.exec();

 api["config/load"] = new API("/api/config/load").requester("post");
 new Task(loadconfig);
 API.prototype.toTask = function(){
  
 }
*/


Object.extend(Function.prototype,{
	/* TIMERS */
	_timeouts : [],
	_interals : [],
	do_later  : function(ms){
		this._intervals.push(setTimeout(this,ms));
		return this;
	},
	bg : function(ms){
		this._intervals.push(setInterval(this,ms));
		return this;
	},
	kill : function(){
		this._timeouts.forEach(function(pid){
			clearTimeout(pid)
		});
		this._intervals.forEach(function(pid){
			clearInterval(pid)
		})
	},
	/* TASK */
	observers : [],
	complete  : function(result){
		this.result_code = result;
		this.observers.invoke("update", this)
	},
	_changed  : false,
	changed   : function(state){
		return arguments.length ? (this._changed = state) : this._changed;
	},
	add_observer : function(observer){
		this.observers.push(observer)
		return this;
	}
})
function loadConfig(){
	var task = arguments.callee;
	var api = new API("/api/config/load");
	return api.post({},function(res){
		extend(Config,res);
		task.complete();
	});
}
function Task(tasks,callback){
	var self = this;
	this.tasks = tasks;
	tasks.map(function(v){
		return isFunction(v) ? v : send(v,"toTask")
	}).invoke("add_observer", this);
	if(callback){
		this.oncomplete = callback;
		this.exec();
	}
	return this;
}
Task.prototype = {
	isTask : true,
	exec : function(){
		this.tasks.invoke("call",null);
	},
	update : function(f){
		send(this,"onprogress");
		
	}
}

Array.prototype.toTask = function(){
	return new Task(this);
}

/*
 super 
*/
/*
 parent
  this.parent.update();
  this.parent.parent.update();
   -> parent(this,"update")
*/
/*
function parent(obj, method, args){
	var p = obj.parent;
	while(p){
		send(p,method,args);
		p = obj.parent;
	}
}
*/

/*
 invoke 別のクラスに処理を伝播させる
  invoke(this, "method_name", arguments);
*/
function invoke(obj, method, args){
	var o = obj.parent;
	for (;typeof(o) != 'undefined'; o = o.parent) {
		if (typeof(o[method]) == 'function') {
			return o[method].apply(obj, args);
		}
	}
	return false;
}
/*
 next たらいまわしにする。
  this.parent.childs
   next(this, "initialize");
  
*/
function next(obj, method, args){
	obj.parent.childs.invoke(method,args)
}

function childOf(element, ancestor){
	element = $(element), ancestor = $(ancestor);
    while (element = element.parentNode)
      if (element == ancestor) return true;
    return false;
}
function $ref(element){
}
String.prototype.op = function(){
	return new Function("a,b","return a"+this+"b");
}


// regexp merger
// 正規表現を複数行にわたって記述できるようにします。

RegExp.prototype.get_body = function(){
	var str = this.toString();
	return str.slice(1,str.lastIndexOf("/"));
};
RegExp.prototype.get_flags = function(){
		return [
			this.ignoreCase ? "i":"",
			this.global     ? "g":"",
			this.multiline  ? "m":""
		].join("");
};
RegExp.concat = function(){
	var args = Array.from(arguments);
	var buf = [];
	args.forEach(function(reg){
		buf.push(reg.get_body());
	});
	var flag = args[args.length-1].get_flags();
	return new RegExp(buf.join(""), flag);
}

Array.prototype.flatten = function(){
	var res = [];
	this.forEach(function(a){
		if(isArray(a))
			a = a.flatten();
		res = res.concat(a)
	});
	return res;
};
Function.prototype.forEachArgs = function(callback){
	var f = this;
	return function(){
		var target = Array.from(arguments).flatten();
		if(!target.length) return;
		target.forEach(function(v){
			callback ? f(callback(v)) : f(v)
		})
	}
};

/*
 Element Updater
*/
function MakeUpdater(label){
	var hash = {};
	var updater = (label?label+"_":"") + "updater";
	var update  = (label?label+"_":"") + "update";
	function get_func(label){
		return(
			isFunction(hash["_"+label])
			 ? hash["_" + label]
			 : function(){}
		);
	}
	var u = GLOBAL[update] = function(label){
		if(isRegExp(label)){
			keys(hash).filter(function(l){
				l = l.slice(1);
				return label.test(l)
			}).forEach(function(label){
				label = label.slice(1);
				get_func(label).call($(label));
			})
		} else {
			return get_func(label).call($(label));
		}
	}.forEachArgs();
	GLOBAL[updater] = function(label, callback){
		if(callback){
			hash["_"+label] = callback;
		} else {
			return function(){ u(label) }
		}
	};
}
MakeUpdater();




// ------------------------------
// END OF common.js
// ------------------------------

// ------------------------------
// event.js : 2007-03-12T09:21:39
// ------------------------------

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


// ------------------------------
// END OF event.js
// ------------------------------

// ------------------------------
// template.js : 2007-03-12T09:21:39
// ------------------------------

/*
 usage
  new Template("$id") -> $("id")
  new Template("aiueo") -> string

*/
function Template(str){
	if(str.isTemplate){
		str = str.tmpl;
	}
	this.tmpl = str;
	if(str.charAt(0) == "$"){
		var el = $(str.slice(1));
		this.tmpl = (el.tagName == "textarea") ? el.value : el.innerHTML;
	}
	this.stash = {
		pre : {},
		params : {}
	};
	this.filters = [];
	this.filter_for_param = {};
	this.use_filter = false;
}
Template.prototype = {
	isTemplate: true,
	fill: function(){
		var args = Array.from(arguments);
		var builder = this.compile();
		return builder.apply(this,args);
	},
	pre_fill : function(){
	
	},
	add_filter: function(expr,filter){
		this.use_filter = true;
		if(expr.isString){
			var f = this.filter_for_param;
			f[expr] ? f[expr].push(filter) : (f[expr] = [filter]);
			return;
		}
		if(expr.isFunction){
			var f = function(value){return filter(value)};
			f.gate = expr;
			this.filters.push(f)
		}
	},
	add_filters : function(o){
		var self = this;
		each(o,function(value,key){
			self.add_filter(key,value)
		});
	},
	
	get_param : function(key){
		var params = this.stash.params;
		var pre = this.stash.pre;
		if(params.hasOwnProperty(key))
			return params[key]
		else if(pre.hasOwnProperty(key))
			return pre[key]
		return null;
	},

	filtered: function(key){
		var self  = this;
		var value = this.get_param(key);
		var res = value;
		// filters
		if(this.filters.length){
			this.filters.forEach(function(filter){
				if(filter.gate.call(self,value,key,self))
					res = filter.call(self,res,key,self)
			})
		}else if(this.filter_for_param[key]){
				this.filter_for_param[key].forEach(function(filter){
					res = filter.call(self,res,key,self)
				})
		}
		return res;
	},
	make_builder: function(buffer_ref){
		var self = this;
		var buf  = buffer_ref;
		return function(){
			var args = Array.from(arguments);
			self.stash.params = {};
			args.forEach(function(p){
				extend(self.stash.params,p)
			});
			return buf.join("")
		};
	},
	compile: function(pre_vars){
		var self = this;
		var buf = [];
		var builder = this.make_builder(buf);
		var sep = /\[\[(.*?)\]\]/g;
		var offset = 0;
		var tmpl = this.tmpl;
		tmpl.replace(sep, function(){
			var a = arguments;
			var stash = self.stash;
			var match_text = a[0];
			var match_idx = a[2];
			var key = a[1].strip();
			buf.push(tmpl.slice(offset,match_idx));
			offset = match_idx + match_text.length;
			var n = {};
			// function
			if(key.charAt(0) == "#"){
				var context = [];
				var expr = key.match(/{(.*)}/)[1];
				context.push("with(this.params){return(");
				context.push(expr);
				context.push(")}");
				n.toString = new Function(context.join("")).bind(stash);
			} else {
				n.toString = function(){
					var expr = stash.params[key];
					var res = (expr != null) ?
						(expr.isFunction) 
							? "" + expr()
							: "" + self.filtered(key) 
							: "";
					return res
				}
			};
			buf.push(n);
		});
		buf.push(tmpl.slice(offset));
		return builder;
	}
};


Template.get = function(id){
	var el = $(id);
	var is_textarea = (el.tagName.toLowerCase() == "textarea");
	var v = is_textarea ? el.value : el.innerHTML;
	return new Template(v)
}


// ------------------------------
// END OF template.js
// ------------------------------

// ------------------------------
// api.js : 2007-07-01T19:11:18
// ------------------------------

/*
 API
*/
var API = Class.create();
API.extend({
	initialize: function(ap){ this.ap = ap; this.raw_mode = false; },
	onCreate:   function(){},
	onComplete: function(){},
	post: function(param,onload){
		this.req = new _XMLHttpRequest;
		var onload = onload || this.onload;
		var oncomplete = this.onComplete;
		if(typeof onload != "function"){
			onload = Function.empty;
		}
		var req = this.req;
		Object.extend(param, API.StickyQuery);
		var postdata = Object.toQuery(param);
		this.req.open("POST",this.ap,true);
		this.req.setRequestHeader(
			"Content-Type", "application/x-www-form-urlencoded"
		);
		/*
		this.req.onreadystatechange = function(){
			//window.status = req.readyState;
		};*/
		this.req.onload = function(){
			oncomplete();
			//alert([this.ap,this.req.responseText.length]);
			API.last_response = req.responseText;
			if(this.raw_mode){
				onload(this.req.responseText);
			} else {
				var json = JSON.parse(this.req.responseText);
				if(json){
					onload(json);
				} else {
					message("Unable to load data");
					show_error();
				}
			}
			this.req = null;
		}.bind(this);
		// alert(postdata);
		this.onCreate();
		this.req.send(postdata);
		return this;
	},
	get: function(param,onload){
		this.req = new _XMLHttpRequest;
		var onload = onload || this.onload;
		var oncomplete = this.onComplete;
		if(typeof onload != "function"){
			onload = Function.empty;
		}
		var req = this.req;
		Object.extend(param, API.StickyQuery);
		var postdata = Object.toQuery(param);
		this.req.open("GET",this.ap + "?" + postdata,true);
		this.req.onload = function(){
			oncomplete();
			API.last_response = req.responseText;
			var json = JSON.parse(this.req.responseText);
			if(json){
				onload(json);
			} else {
				message("Unable to load data");
			}
			this.req = null;
		}.bind(this);
		this.onCreate();
		this.req.send(null);
		return this;
	},
	requester: function(method,param){
		return function(onload){
			return this[method.toLowerCase()](param,onload)
		}.bind(this)
	},
	onload:  function(){},
	onerror: function(error_code){
		alert("エラーコード :"+ error_code)
	}
});
API.last_response = "";
API.registerCallback = function(options){
	each(options,function(value,key){
		API.prototype["on"+key] = value;
	})
};

/* for JSONP */
function ScriptLoader(ap){
	this.ap = ap;
};
ScriptLoader.prototype = {
	pre_params: {},
	get: function(param, callback){
		var self = this;
		this.count = ScriptLoader.count;
		ScriptLoader.count++;
		self.param = param;
		callback = callback || self.onload;
		ScriptLoader.callback["_"+this.count] = function(){
			callback.apply(self, arguments);
			self._remove();
		};
		ScriptLoader.connection_count++;
		var p = {};
		Object.extend(p, this.pre_params);
		Object.extend(p, param);
		if(!p.callback){
			p["callback"] = "ScriptLoader.callback._" + this.count;
		}
		var query = this._query(p);
		var url = this.ap + "?" + query;
		this._append(url);
	},
	post: function(){ /* Not support */
	},
	onload: function(){},
	_query: function(self){
		var buf = [];
		for(var key in self){
			var value = self[key];
			if(isFunction(value)) continue;
			buf.push(
				encodeURIComponent(key)+"="+
				encodeURIComponent(value)
			)
		}
		return buf.join("&");
	},
	_append: function(url){
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.charset = "utf-8";
		s.src = url;
		this._script = s;
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(s)
	},
	_remove: function(){
		ScriptLoader.connection_count--;
		if(ScriptLoader.DEBUG) return;
		delete ScriptLoader.callback["_" + this.count];
		try{
			var head = document.getElementsByTagName("head")[0];
			head.removeChild(this._script)
		}catch(e){}
	}
};
ScriptLoader.count = 0;
ScriptLoader.callback = {};
ScriptLoader.connection_count = 0;
ScriptLoader.DEBUG = true;


// ------------------------------
// END OF api.js
// ------------------------------

// ------------------------------
// ui.js : 2007-03-12T09:21:39
// ------------------------------

/* Event */
Event.observeWheel = function(el,callback){
	var browser = new BrowserDetect;
	// IE
	if(browser.isIE){
		Event.observe(el,"mousewheel",function(e){
			Event.stop(e);
			callback(e.wheelDelta/-120);
		})
	} else if(browser.isOpera){
		Event.observe(el,"mousewheel",function(e){
			Event.stop(e);
			callback(e.wheelDelta/120);
		})
	} else if(browser.isGecko){
		Event.observe(el,"DOMMouseScroll",function(e){
			Event.stop(e);
			callback(e.detail/3);
		})
	} else if(browser.isKHTML){
		el.onmousewheel = function(e){
			Event.stop(e);
			callback(e.wheelDelta/-120);
		}
	}
};

/* DOM  */
var DOM = {};
DOM.create = function(tag){
	return document.createElement(tag);
};
DOM.build = function(obj){
	
}
DOM.remove = function(el){
	el = $(el);
	el.parentNode.removeChild(el);
};
DOM.hide = function(el){
	$(el).style.display = "none";
};
DOM.show = function(el){
	$(el).style.display = "block";
}
DOM.clone = function(el){
	return el.cloneNode(true);
}
DOM.insert = function(p,el,point){
	p.insertBefore(el,point);
};
DOM.scrollTop = function(el){
	var element = $(el);
	return element.scrollTop;
};
DOM.move = function(el,x,y){
	el = $(el);
	setStyle(el,{
		left : x+"px",
		top  : y+"px"
	});
}


/*
 rate
*/

var Rate = {};
Rate.image_path = "/img/rate/";
Rate.image_path_p = "/img/rate/pad/";
Rate._calc_rate = function(e){
	var el = this;
	var img_w = el.offsetWidth;
	var cell = img_w / 6;
	var offsetX = !isNaN(e.offsetX) ? e.offsetX : e.layerX - el.offsetLeft;
	if(offsetX == 0) offsetX++;
	if(offsetX>img_w) offsetX = img_w;
	var rate = Math.ceil(offsetX/cell) - 1;
	//window.status = [img_w,cell,el.offsetLeft,e.layerX,offsetX];
	return rate;
};
Rate.click = function(e){
	var el = this;
	var rate = Rate._calc_rate.call(this,e);
	var sid = el.getAttribute("sid");
	set_rate(sid,rate);
	el.src = Rate.image_path_p + rate + ".gif";
	el.setAttribute("orig_src",el.src);
};
Rate.out = function(e){
	var src;
	var el = this;
	if(src = el.getAttribute("orig_src")){
		el.src = src
	}
};
Rate.hover = function(e){
	var el = this;
	if(!el.getAttribute("orig_src")){
		el.setAttribute("orig_src",el.src);
	}
	var rate = Rate._calc_rate.call(this,e);
	el.src = Rate.image_path_p + rate + ".gif";
};



var FlatMenu = Class.create();
FlatMenu._setstyle = function(element,extra){
	setStyle(element,{
		display  : "none",
		width    : "160px",
		position : "absolute",
		backgoundColor : "transparent",
		backgroundImage : "url('/img/alpha/alpha_03.png')",
		padding  : "0px 2px 2px 0px",
		fontSize : "12px",
		border   : "1px solid gray",
		borderColor : "#ccc #ccc #ccc #ccc",
		borderStyle : "solid none none solid"
	});
};
FlatMenu.extend({
	initialize: function(parent, base_element){
		this.parent = parent;
		this.base_element = base_element;
		this.menu = [];
		this.element = DOM.create("div");
		this.element.className = "FlatMenu";
		addEvent(this.element,"selectstart", Event.stop);
		addEvent(this.element,"mousedown",   Event.stop);
		FlatMenu._setstyle(this.element);
		if(this.base_element){
			this.base_element.appendChild(this.element);
		} else {
			document.body.appendChild(this.element);
		}
		return this;
	},
	add: function(text){
		this.menu.push(text)
	},
	clear: function(){
		this.menu = [];
	},
	update:function(){
		this.element.innerHTML = this.menu.join("").aroundTag("div");
	},
	snap: function(el){
		el = el || this.parent;
		if(this.base_element){
			var pos = Position.cumulativeOffsetFrom(this.parent, this.base_element);
		} else {
			var pos = Position.cumulativeOffset(this.parent);
		}
		var left = pos[0];
		var top  = pos[1] + this.parent.offsetHeight;
		DOM.move(this.element,left,top);
	},
	visible: false,
	setStyle: function(style){
		setStyle(this.element, style);
	},
	setEvent: function(obj){
		var el = this.element;
		each(obj,function(fn,type){
			Event.observe(el, type, fn)
		})
	},
	show: function(){
		this.update();
		this.snap();
		FlatMenu.hideAll();
		FlatMenu._instance.push(this);
		if(!this.visible){
			DOM.show(this.element);
			this.visible = true;
		}
	},
	hide: function(){
		if(this.visible){
			DOM.remove(this.element);
			this.visible = false;
		}
		if(isFunction(this.onhide)){
			var onhide = this.onhide;
			this.onhide = null;
			onhide();
		}
	}
});
FlatMenu.create_on = function(parent, base_element){
	return new FlatMenu(parent, $(base_element));
}
FlatMenu._instance = [];
FlatMenu.hideAll = function(){
	FlatMenu._instance.invoke("hide");
	FlatMenu._instance = [];
};
FlatMenu.hide = FlatMenu.hideAll;

var Slider = Class.create();
Slider.extend({
	default_config: {
		size  : 150,
		handle_width : 10,
		value : 0,
		from : 0,
		to   : 100,
		step : 0.1
	},
	initialize: function(id,config){
		var self = this;
		var op = extend({},this.default_config);
		this.config = extend(op,config);
		this.observers = [];
		this.base   = $(id);
		this.bar    = $N("DIV",{"class":"slider-bar"});
		this.handle = $N("DIV",{"class":"slider-handle"});
		this.setup_style();
		var o = this.config;
		this.value = o.value;
		// value range
		this.min = Math.min(o.from, o.to);
		this.max = Math.max(o.from, o.to);
		// positon range
		this.min_pos = 0;
		this.max_pos = o.size;

		this.updatePosition();
		// style
		this.handle_width = this.handle.offsetWidth;
		this.base_width = this.base.offsetWidth;
		// click pos
		this.click_pos = o.handle_width / 2;

		$(id).appendChild(this.bar);
		$(id).appendChild(this.handle);
		this.mdown = false;
		Event.observe(this.handle, "mousedown", this._handle_mousedown.bind(this));
		Event.observe(this.base, "mousedown", this._base_mousedown.bind(this));
		Event.observeWheel(this.base, this._base_mousewheel.bind(this));
		return this;
	},
	setup_style: function(){
		var config = this.config;
		this.base.style.width   = config.size + config.handle_width + "px";
		this.bar.style.width    = config.size + "px";
		this.bar.style.left     = config.handle_width / 2 + "px";
		this.handle.style.width = config.handle_width - 2 + "px";
	},
	_handle_mousedown: function(e){
		this.mdown = true;
		this.old_value = this.value;
		Event.stop(e);
		this.click_pos = Event.pointerX(e) - this.base.offsetLeft - this.px_value;
		addClass(this.handle, "active");
		this.onsliderstart();
		this.start_drag();
	},
	_base_mousedown: function(e){
		this.click_pos = this.config.handle_width / 2;
		this.move_handle(e);
		this.updateValue();
		this.onslidermove(this.value);
		this.onsliderstop();
	},
	_base_mousewheel: function(count){
		this.movePosition(count * 10);
		this.updateValue();
		this.onslidermove(this.value);
		this.onsliderstop();
	},
	cancel_select : function(){
		this.observers.push(
			Event.observe(this.handle, "dragstart", Event.stop),
			Event.observe(this.handle, "selectstart", Event.stop),
			Event.observe(document, "dragstart", Event.stop),
			Event.observe(document, "selectstart", Event.stop)
		);
	},
	getValue: function(){
		return this.value;
	},
	setValue: function(val){
		if(this.min > val){
			this.value = this.min
		} else if(this.max < val){
			this.value = this.max
		} else {
			this.value = val;
		}
	},
	move_handle: function(e){
		var x = Event.pointerX(e);
		var config = this.config;
		var pos = x - this.base.offsetLeft - this.click_pos;
		this.setPosition(pos);
	},
	updateValue: function(){
		var o = this.config;
		var pos = this.getPosition();
		var value = o.from + (o.to - o.from) * pos / o.size ;
		this.value = value;
	},
	updatePosition: function(){
		var o = this.config;
		var value = this.getValue();
		var left  = (o.from - o.to) * value / o.size ;
		this.setPosition(left);
	},
	movePosition: function(num){
		this.setPosition(this.getPosition() + num);
	},
	getPosition: function(e){
		return this.px_value;
	},
	setPosition: function(pos){
		pos = Math.max(pos, 0);
		pos = Math.min(pos, this.max_pos);
		this.px_value = pos;
		this.handle.style.left = Math.floor(pos) + "px";
	},
	_mousemove: function(e){
		this.move_handle(e);
		this.updateValue();
		this.onslidermove(this.value);
	},
	_mousestop: function(e){
		this.mdown = false;
		removeClass(this.handle,"active");
		this.stop_observe();
		this.onsliderstop();
	},
	start_drag: function(){
		this.observers.push(
			Event.observe(document,"mousemove", this._mousemove.bind(this)),
			Event.observe(document,"mouseup", this._mousestop.bind(this))
		);
		this.cancel_select();
	},
	stop_observe: function(){
		this.observers.forEach(function(f){f()});
	}
});





// ------------------------------
// END OF ui.js
// ------------------------------

// ------------------------------
// reader_proto.js : 2007-03-12T09:21:39
// ------------------------------

/*
 Prototype拡張
*/
Function.empty = function(){};

/*
 String.prototype
*/
String.prototype.startWith = function(str){
	return this.indexOf(str) == 0
};
String.prototype.aroundTag = function(tag){
	return ["<",tag,">",this,"</",tag,">"].join("")
};
String.prototype.strip_tags = function(){
	return this.replace(/<.*?>/g, "")
};

/*
String.prototype.escapeHTML = function() {
	var div = document.createElement('div');
	var text = document.createTextNode(this);
	div.appendChild(text);
	return div.innerHTML;
};
String.prototype.unescapeHTML = function() {
	var div = document.createElement('div');
	div.innerHTML = this.stripTags();
	return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
};
*/
// 簡易テンプレート
String.prototype.fill  = function(){
	var param = {};
	Array.from(arguments).forEach(function(o){
		extend(param,o)
	})
	return this.replace(/\[\[(.*?)\]\]/g,function($0,$1){
		var key = $1.strip();
		return param[key] ? param[key] : "";
	})
};
/*
 Number.prototype
*/
Number.prototype.toRelativeDate = function(){
	var k = this > 0 ? this : -this;
	var u = "sec";
	var jp = {
		sec : "秒",
		min : "分",
		hour: "時間",
		day : "日",
		Mon : "ヶ月"
	};
	var vec = this >= 0 ? "前" : "後";
	var st = 0;
	(k>=60) ? (k/=60,u="min",st=1) : 0;
	(st && k>=60) ? (k/=60,u="hour",st=1) : st=0;
	(st && k>=24) ? (k/=24,u="day" ,st=1) : st=0;
	(st && k>=30) ? (k/=30,u="Mon" ,st=1) : st=0;
	k = Math.floor(k);
	v = jp[u];
	return (isNaN(k)) ? "nan" : k+v+vec;
}

Array.prototype.reject = function(callback, thisObj){
	return this.filter(callback.invert(), thisObj);
}

Array.prototype.filter_by = function(attr,value){
	return this.filter(function(v){
		return v[attr] == value
	})
}
Array.prototype.sum = function(){
	var sum = 0;
	this.forEach(function(v){
		sum += v;
	});
	return sum;
};
Array.prototype.sum_of = function(name){
	return this.pluck(name).sum();
};
// documentFragmentに変換
Array.prototype.toDF = function(){
	var nodelist = this;
	var df = document.createDocumentFragment();
	foreach(nodelist,function(node){
		df.appendChild(node)
	});
	return df;
};
// 条件に一致する最初のoffset値を返す
Array.prototype.indexOfA = function(callback,thisObj){
	for(var i=0,len=this.length;i<len;i++){
		if(callback.call(thisObj,this[i],i,this)){
			return i
		}
	}
	return -1
}
// 複数の関数をひとつにまとめる
Array.prototype.asCallback = function(){
	var self = this;
	var args = arguments;
	return function(){
		return self.map(function(fn){
			return fn.apply(self,args)
		})
	}
}

Array.prototype.indexOfStr = function(searchElement,fromIndex){
	searchElement = "" + searchElement;
	var i = (fromIndex < 0) ? this.length+fromIndex : fromIndex || 0;
	for(;i<this.length;i++)
		if(searchElement == this[i]) return i;
	return -1
};

Array.prototype.mode = function(){
	var hash = {};
	var len = this.length;
	this.forEach(function(v,i){
		hash[v] = hash[v] ? hash[v]+1 : 1;
	});
	var mode = keys(hash).sort(function(a,b){
		return  hash[b] - hash[a];
	});
	return mode[0];
};

Array.prototype.sort_by = function(key){
	return this.sort(function(a,b){
		return(
			a[key] == b[key] ? 0:
			a[key] <  b[key] ? 1: -1
		)
	})
}

// 補完
Array.prototype.like = function(str){
	var res;
	var find = 0;
	this.forEach(function(v){
		if(find) return;
		if(v.startWith(str)){
			find = 1;
			res  = v;
		}
	});
	return res;
}

/*
 Function.prototype
*/
Function.prototype.add_bench = function(id){
	var self = this;
	return function(){
		var start = new Date;
		var res = self.apply(this,arguments);
		var end = new Date;
		$(id).innerHTML = end-start + "ms";
		return res;
	}
};
// 束縛
Function.prototype.curry = function () {
	var args = Array.from(arguments);
	var self = this;
	return function () {
		return self.apply(this, args.concat(Array.from(arguments)));
	};
};
Function.prototype.bindArgs = Function.prototype.curry;

Function.prototype.addAfter = function(callback){
	var self = this;
	return function(){
		var res = self.apply(this, arguments);
		if(isFunction(callback)){
			callback();
		}
		return res;
	}
}


Function.prototype.later = function(ms){
	var self = this;
	return function(){
		var args = arguments;
		var thisObject = this;
		var res = {
			complete: false,
			cancel: function(){clearTimeout(PID);},
			notify: function(){clearTimeout(PID);later_func()}
		};
		var later_func = function(){
			self.apply(thisObject,args);
			res.complete = true;
		};
		var PID = setTimeout(later_func,ms);
		return res;
	};
};

Function.prototype.invert = function(){
	var self = this;
	return function(){
		var res = self.apply(this, arguments);
		return res ? false : true;
	}
}

Function.prototype.next = function(fn){
	var self = this;
	fn = isFunction(fn) ? fn : Function.empty;
	return function(){
		var res = self.apply(this,arguments);
		fn();
		return res;
	}
};



// ------------------------------
// END OF reader_proto.js
// ------------------------------

// ------------------------------
// reader_common.js : 2007-03-12T09:21:39
// ------------------------------

/*
 reader common
*/

var Queue = Class.create();
Queue.extend({
	initialize: function(){ this.queue = [] },
	step : 1,
	interval : 100,
	push: function(f){
		this.queue.push(f);
	},
	exec: function(){
		var queue = this.queue;
		var step = this.step;
		var interval = this.interval;
		(function(){
			var self = arguments.callee;
			var count = 0;
			while(count < step){
				var f = queue.shift();
				isFunction(f) && f();
				count++;
			}
			if(queue.length){
				self.later(interval)()
			}
		}).later(interval)();
	}
});


// ------------------------------
// END OF reader_common.js
// ------------------------------

// ------------------------------
// reader_pref.js : 2007-07-05T08:49:18
// ------------------------------

/*
 system default
*/
var LDR_VARS = {
	LeftpaneWidth   : 250, // マイフィードの幅
	DefaultPrefetch : 2,   // デフォルトの先読み件数
	MaxPrefetch     : 5,   // 最大先読み件数
	PrintFeedFirstNum : 3, // 初回に描画する件数
	PrintFeedDelay  : 500, // 2件目以降を描画するまでの待ち時間
	PrintFeedDelay2 : 100, // 21件目以降を描画するまでの待ち時間
	PrintFeedNum    : 20,  // 一度に描画する件数
	SubsLimit1      : 100, // 初回にロードするSubsの件数
	SubsLimit2      : 200, // 二回目以降にロードするSubsの件数
	ViewModes : ['flat','folder','rate','subscribers']
};

/*
 Error message
*/
var error_message = {};
error_message.login = {
	title : "You need to sign in to Fastladder",
	body : "<p>" + "Please reload the browser and sign in again" + "</p>"
};
error_message.xmlhttp = {
	title : "Your browser is not supported by Fastladder",
	body : "<p>" + "Your browser is out of date.  (Please upgrade your browser.)" + "</p>"
};
error_message.busy = {
	title : "Failed to retrieve data.",
	body : "<p>" + "Our servers might be busy.  Please try again later." + "</p>"
};

var KeyHelpOrder = [
	[ 'read_next_subs', 'scroll_next_item', 'pin' ],
	[ 'read_prev_subs', 'scroll_prev_item', 'open_pin'],
	[ 'reload_subs',    'unsubscribe', 'view_original'],
	[ 'read_head_subs', 'scroll_next_page', 'feed_next'],
	[ 'read_end_subs', 'scroll_prev_page', 'feed_prev'],
	[ 'compact', 'toggle_leftpane', 'focus_findbox'],
	[ '', 'toggle_clip', 'instant_clip']
];




if(typeof Language != "undefined" && Language == 'English'){

setText({
	'flat'        : 'Flat',
	'folder'      : 'Folder',
	'rate'        : 'Rating',
	'subscribers' : 'Subscribers',
	'domain'      : 'Domain'
});

// sort
setText({
	'modified_on'          : 'New',
	'modified_on:reverse'  : 'Old',
	'unread_count'         : 'Unread items (desc.)',
	'unread_count:reverse' : 'Unread items (asc.)',
	'title:reverse'        : 'Title',
	'rate'                 : 'Rating',
	'subscribers_count'    : 'Subscribers (desc.)',
	'subscribers_count:reverse'  : 'Subscribers (asc.)'
});

// api
setText({
	'set_rate_complete'      : 'Rating have been changed.',
	'create_folder_complete' : 'I created folder',
	'print_discover_loading' : 'Finding a feed. Please wait.',
	'print_discover_notfound': 'I could not find a valid feed.'
});

setText({
	'prefetching'       : 'prefetching.',
	'prefetch_complete' : 'prefetching done.'
});

setText({
	'unread_count_tmpl': '[[feed_count]] feeds&nbsp;&nbsp;|&nbsp;&nbsp;[[count]] items',
	'unread_count_title_tmpl': "Fastladder ([[count]])",
	'mark_all_read_tmpl': " are you sure to mark [[count]] feeds as read?",
	'manage_unsubscribe_confirm_tmpl': 'Are you sure to remove [[ count ]] feed(s) from your subscription?',
	'manage_unsubscribe_progress_tmpl': 'Removing feeds: [[ remain ]] items to go',
	'manage_folder_delete_confirm': 'Are you sure to remove "[[folder]]"?  (Items inside won\'t be removed)',
	'show_all_help_message_tmpl': 'Show only updated feeds: [[ state ]]',
	'unsubscribe_confirm': 'Are you sure to remove [[title]] from your subscription?',
	'unsubscribe_confirm2': 'Are you sure to unsubscribe this feed?'
});


// errors
setText({
	'cannot_popup' : 'Please disable the pop up block for this domain to use this function.'
})


// menu
LDR_VARS.MenuItems = [
			{title:"Quick Guide", action:"init_guide()"},
			{title:"Settings", action:"init_config()"},
			{title:"Edit Subscription list", action:"init_manage()"},
			'-----',
			{title:"Expanded view / List view", action:"Control.compact()"},
			{title:"Toggle order", action:"Control.reverse()"},
			'-----',
			{title:"Mark all feeds as read", action:"Control.mark_all_read()"}
];

var KeyHelpOrder = [
	[ 'read_next_subs', 'scroll_next_item', 'pin' ],
	[ 'read_prev_subs', 'scroll_prev_item', 'open_pin'],
	[ 'reload_subs',    'unsubscribe', 'view_original'],
	[ 'read_head_subs', 'scroll_next_page', 'feed_next'],
	[ 'read_end_subs', 'scroll_prev_page', 'feed_prev'],
	[ 'compact', 'toggle_leftpane', 'focus_findbox']
];


} else {
// japanese resource

error_message.login = {
	title : "ログインしてください",
	body : "<p>" + "ブラウザをリロードして再度ログインしてください。" + "</p>"
};
error_message.xmlhttp = {
	title : "お使いのブラウザは動作対象外です",
	body : "<p>" + "ブラウザのバージョンが古いためご利用いただけません。" + "</p>"
};
error_message.busy = {
	title : "データの受信に失敗しました",
	body : "<p>" + "サーバーが混雑している可能性があります。<br>しばらく時間をおいてから再度アクセスしてください。" + "</p>"
};

// mode
setText({
	'flat'        : 'フラット',
	'folder'      : 'フォルダ',
	'rate'        : 'レート',
	'subscribers' : '購読者数',
	'domain'      : 'ドメイン'
});

// sort
setText({
	'modified_on'          : '新着順',
	'modified_on:reverse'  : '旧着順',
	'unread_count'         : '未読が多い',
	'unread_count:reverse' : '未読が少ない',
	'title:reverse'        : 'タイトル',
	'rate'                 : 'レート',
	'subscribers_count'    : '読者が多い',
	'subscribers_count:reverse'  : '読者が少ない'
});

// api
setText({
	'set_rate_complete'      : 'レートを変更しました',
	'create_folder_complete' : 'フォルダを作成しました',
	'print_discover_loading' : 'フィードを探しています',
	'print_discover_notfound': '登録可能なフィードが見つかりませんでした',
	'this is the last item' : '最後だよ',
	'End of feeds.  Press s to return to the top.' : "最後のフィードです。sキーで先頭に戻ります"
});

setText({
	'prefetching'       : '先読み中',
	'prefetch_complete' : '先読み完了',
	'Loading .. ' : 'ロード中',
	'Loading completed.' : 'ロード完了'	
});

setText({
	'unread_count_tmpl': "未読 [[feed_count]]フィード&nbsp;&nbsp;|&nbsp;&nbsp;[[count]]エントリ",
	'unread_count_title_tmpl': "livedoor Reader ([[count]])",
	'mark_all_read_tmpl':	"[[count]]件のフィードを既読にします。よろしいですか？",
	'There is no item to mark as read':	'既読にすべきフィードがありません',
	'notice_ime_off': '※ショートカットキーが使えない場合は日本語入力を無効にしてみてください。',
	'manage_unsubscribe_confirm_tmpl': "[[ count ]]件のフィードの登録を解除します。よろしいですか？",
	'manage_unsubscribe_progress_tmpl': "フィードを削除しています:残り[[remain]]件",
	'manage_folder_delete_confirm': "[[folder]]を削除してよろしいですか？(中のアイテムは削除されません)",
	'unsubscribe_confirm': 	"「[[title]]」の登録を解除しますか？",
	'unsubscribe_confirm2': "登録を解除しますか？"
});

setText({
	'Unknown date' : "日時不明"
});


// errors
setText({
	'cannot_popup' : 'この機能を使うにはポップアップブロックを解除してください。'
})

// keyboard help
setText({
	'close' : '閉じる',
	'more' : 'もっと表示',
	'compact' : '隠す',
	'show in window' : '別ウィンドウで開く'
});

setText({
	'Now saving': '変更を保存しています',
	'Wait a minutes' : 'しばらくお待ち下さい',
	'Public' : '公開',
	'Private': '非公開',
	'leave it uncategorized' : '未分類',
	'uncategorized' : '未分類',
	'New Folder Name': '新しいフォルダ名を入力してください'
});


LDR_VARS.MenuItems = [
			{title:"livedoor Reader Guide", action:"init_guide()"},
			{title:"設定変更", action:"init_config()"},
			{title:"フィードの整理", action:"init_manage()"},
			'-----',
			{title:"本文の表示 / 非表示の切替", action:"Control.compact()"},
			{title:"新着順 / 旧着順表示の切替", action:"Control.reverse()"},
			'-----',
			{title:"全て読んだことにする", action:"Control.mark_all_read()"}
];

}






var DefaultConfig = {
	current_font   : 14,
	use_autoreload : 0,
	autoreload     : 60,
	view_mode      : 'folder',
	sort_mode      : 'modified_on',
	touch_when     : 'onload',
	reverse_mode   : false,
	keep_new       : false,
	show_all       : true,
	max_pin        : 5,
	prefetch_num   : 2,
	use_wait       : false,
	scroll_type    : 'px',
	scroll_px      : 100,
	limit_subs     : 100,
	use_pinsaver   : 1,
	use_prefetch_hack : false,
	use_scroll_hilight: 0,
	use_instant_clip : -1,
	use_inline_clip : 1,
	use_custom_clip : "off",
	use_clip_public : "on",
	use_limit_subs : 0,
	clip_tags : "",
	instant_clip_tags : "",
	use_instant_clip_public : "on",
	use_clip_ratecopy : 1,
	use_instant_clip_ratecopy : 1,
	default_public_status : 1
};

var TypeofConfig = {
	keep_new       : 'Boolean',
	show_all       : 'Boolean',
	use_autoreload : 'Boolean',
	use_wait       : 'Boolean',
	use_pinsaver   : 'Boolean',
	use_scroll_hilight: 'Boolean',
	use_prefetch_hack : 'Boolean',
	use_clip_ratecopy : 'Boolean',
	use_instant_clip_ratecopy : 'Boolean',
	reverse_mode   : 'Boolean',
	use_inline_clip : 'Boolean',
	use_limit_subs  : 'Boolean',
	default_public_status : 'Boolean',
	current_font   : 'Number',
	autoreload     : 'Number',
	scroll_px      : 'Number',
	wait           : 'Number',
	max_pin        : 'Number',
	max_view       : 'Number',
	items_per_page : 'Number',
	prefetch_num   : 'Number',
	use_instant_clip : 'Number',
	limit_subs     : 'Number',
	view_mode      : 'String',
	sort_mode      : 'String',
	touch_when     : 'String',
	scroll_type    : 'String'
};

var KeyConfig = {
	 'read_next_subs'   : 's|shift+ctrl|shift+down',
	 'read_prev_subs'   : 'a|ctrl+shift|shift+up',
	 'read_head_subs'   : 'w|shift+home',
	 'read_end_subs'    : 'W|shift+end',
	 'feed_next'        : '>|J',
	 'feed_prev'        : '<|K',
	 'reload_subs'      : 'r',
	 'scroll_next_page' : 'space|pagedown',
	 'scroll_prev_page' : 'shift+space|pageup',
	 'pin'              : 'p',
	 'open_pin'         : 'o',
	 'view_original'    : 'v|ctrl+enter',
	 'scroll_next_item' : 'j|enter',
	 'scroll_prev_item' : 'k|shift+enter',
	 'compact'          : 'c',
	 'focus_findbox'    : 'f',
	 'blur_findbox'     : 'esc',
	 'unsubscribe'      : 'delete',
	 'toggle_leftpane'  : 'z',
	 'toggle_fullscreen': 'Z',
	 'toggle_keyhelp'   : '?'
};

if(typeof Language != "undefined" && Language == 'English'){
	var KeyHelp = {
		 'scroll_next_item' : 'Next item',
		 'scroll_prev_item' : 'Previous item',
		 'scroll_next_page' : 'Scroll down',
		 'scroll_prev_page' : 'Scroll up',
		 'feed_next'        : 'Older items',
		 'feed_prev'        : 'Newer items',
		 'view_original'    : 'Open item',
		 'pin'              : 'Pin',
		 'open_pin'         : 'Open pinned items',
		 'toggle_clip'      : 'Bookmark',
		 'instant_clip'     : 'Quick bookmark',
		 'compact'          : 'Collapse/Expand item',
		 'unsubscribe'      : 'Unsubscribe',
		 'reload_subs'      : 'Reload left pane',
		 'toggle_leftpane'  : 'Collapse/Expand left pane',
		 'focus_findbox'    : 'Focus on search box',
		 'read_next_subs'   : 'Next feed',
		 'read_prev_subs'   : 'Previous feed',
		 'read_head_subs'   : 'Move to the top of unread feed',
		 'read_end_subs'    : 'Move to the bottom of unread feed',
		 'toggle_keyhelp'   : 'Open this menu'
	};

} else {
	var KeyHelp = {
		 'scroll_next_item' : '次のアイテム',
		 'scroll_prev_item' : '前のアイテム',
		 'scroll_next_page' : '下にスクロール',
		 'scroll_prev_page' : '上にスクロール',
		 'feed_next'        : '過去の記事に移動',
		 'feed_prev'        : '未来の記事に移動',
		 'view_original'    : '元記事を開く',
		 'pin'              : 'ピンを付ける / 外す',
		 'open_pin'         : 'ピンを開く',
		 'toggle_clip'      : 'クリップボタン',
		 'instant_clip'     : '一発クリップ',
		 'compact'          : '本文の表示 / 非表示',
		 'unsubscribe'      : '購読停止',
		 'reload_subs'      : 'フィード一覧の更新',
		 'toggle_leftpane'  : 'マイフィードを畳む / 戻す',
		 'focus_findbox'    : '検索ボックスに移動',
		 'read_next_subs'   : '次のフィードに移動',
		 'read_prev_subs'   : '前のフィードに移動',
		 'read_head_subs'   : '最初の未読に移動',
		 'read_end_subs'    : '最後の未読に移動',
		 'toggle_keyhelp'   : 'ヘルプを表示 / 非表示'
	};
}




// ------------------------------
// END OF reader_pref.js
// ------------------------------

// ------------------------------
// reader_main.js : 2007-07-13T14:12:21
// ------------------------------

// API
API.StickyQuery = { ApiKey: ApiKey };

var initialized = false;
window.onload   = init;

window.onresize = function(){invoke_hook('WINDOW_RESIZE')};

function preload(){
	var preload_image = function(url){ new Image().src = url }.forEachArgs();
	preload_image([
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
		'/img/icon/m.gif'
	]);
}
preload();

// last_error
window.__ERROR__ = null;
Function.prototype._try = function(){
	var self = this;
	return function(){
		try{
			return self.apply(this, arguments)
		} catch(e){
			__ERROR__ = e;
			// alert(e);
		}
	}
};
// for customize
function _addRule(){
	if(document.styleSheets){
		// Mozilla, (safari?)
		if(document.styleSheets[0].insertRule){
			_addRule = function(selector, property){
				document.styleSheets[0].insertRule(
					selector + "{" + property + "}", document.styleSheets[0].cssRules.length);
			}._try();
		// IE
		} else if(document.styleSheets[0].addRule){
			_addRule = function(selector, property){
				document.styleSheets[0].addRule(selector, "{" + property + "}");
			}._try();
		}
	} else if(window.opera){
		_addRule = function(selector, property){
			var sheet = selector + "{" + property + "}";
			var link = document.createElement('link');
			link.setAttribute('rel',  'stylesheet');
			link.setAttribute('type', 'text/css');
			link.setAttribute('href', 'data:text/css,' + encodeURIComponent(sheet));
			document.getElementsByTagName('head')[0].appendChild(link);
		}._try();
	}
}
_addRule._try();

function LDR_addStyle(){
	var arg = arguments;
	if(isString(arg[0]) && isArray(arg[1])){
		arg[1].forEach(function(v){
			_addRule(arg[0],v);
		});
	} else {
		_addRule.apply(this,arguments)
	}
}

LDR_addStyle("pre",[
	"font-family:monospace;",
	"border:1px solid #808080;",
	"background:#f4f2ef;",
	"padding:1em;"
]);

function ld_check(){
	var c = document.cookie;
	return (c.indexOf(".LUID") != -1) || (c.indexOf(".LL") != -1);
}
function show_error(){
	State.show_error = true;
	update("error_window")
}
function hide_error(){
	State.show_error = false;
	Element.hide("error_window");
}
function show_all_mouseover(){
	State.help_show = true;
	State.help_snap = this;
	var tmpl = getText('show_all_help_message_tmpl');
	State.help_message = tmpl.fill({state: Config.show_all ? 'disabled' : 'enabled' });
	update("help_window");
}
function show_all_mouseout(){
	State.help_show = false;
	update("help_window");
}

var Buttons = {
	"up:mousedown": function(event){
		if(event.shiftKey){
			Control.reverse()
		} else {
			Control.go_prev()
		}
	},
	"down:mousedown"    : "autoscroll.call(this, event)",
	// keyhelp
	"keyhelp:click"     : "Control.open_keyhelp()",
	"keyhelp:mouseover" : "Control.show_keyhelp.call(this,event)",
	"keyhelp:mouseout"  : "Control.hide_keyhelp.call(this,event)",
	// pin
	"pin:onclick"       : "Control.pin_click.call(this,event);",
	"pin:onmouseover"   : "Control.pin_hover.call(this,event);",
	"pin:onmouseout"    : "Control.pin_mouseout.call(this,event);",
	// guide
	"guide:onclick"     : "init_guide()"
}

var buttons = [
	{
		id      : "up_button",
		observe : "mousedown",
		icon    : '/img/icon/allow_up.gif'
	},
	{
		id      : "down_button",
		observe : "mousedown",
		icon    : '/img/icon/allow_down.gif'
	},
	{
		id      : "pin_button",
		observe : "click,mouseover,mouseout",
		icon    : '/img/icon/pin.gif',
		innerHTML : '<span id="pin_count"></span>'
	},
	{
		id      : "keyhelp_button",
		observe : "click,mouseover,mouseout",
		icon    : '/img/icon/key_q.gif'
	}
];
function as_event(obj,element){
	var f = isFunction(obj) ? obj : new Function("event", obj);
	return function(event){
		event = event || window.event;
		return f.call(element, event)
	}
}
function create_button(v){
	var li = $N("li", {});
	li.id = v.id;
	li.className = "button icon";
	li.style.backgroundImage = 'url('+v.icon+')';
	if(v.innerHTML){
		li.innerHTML = v.innerHTML;
	}
	var button_id = v.id.split("_")[0];
	var events = (""+v.observe).split(",");
	events.forEach(function(ev){
		li["on"+ev] = as_event(Buttons[button_id+":"+ev], li);
	});
	return li;
}
function setup_buttons(){
	var ul = $("control_buttons_ul");
	buttons.forEach(function(v){
		var li =create_button(v);
		ul.appendChild(li);
	});
}
function add_button(el){
	var ul = $("control_buttons_ul");
	if(isElement(el)){
		ul.appendChild(el);
	} else if(isString(el)){
		var li = document.createElement("li");
		li.innerHTML = el;
		ul.appendChild(li);
	} else { 
		ul.appendChild(create_button(el));
	}
}
//setup_buttons();

function LDR_getApiKey(){
	var ck = new Cookie().parse();
	for(var key in ck){
		if(/_sid/.test(key)){
			return ck[key]
		}
	}
}
if(/^\[/.test(ApiKey)){
	API.StickyQuery = { ApiKey: LDR_getApiKey() };
}

/*
 DOM Cache
*/
$.enable_cache = function(id){
	$.cacheable[id] = true;
}.forEachArgs();
$.enable_cache(
	'right_container',
	'left_container',
	'subs_container',
	'right_body',
	'message',
	'loadicon',
	'loading',
	'total_unread_count'
);

/*
 Hook
*/
var Hook = Class.create();
Hook.extend({
	initialize: function(){
		this.callbacks = [];
	},
	isHook: true,
	add: function(f){
		this.callbacks.push(f)
	},
	exec: function(){
		var args = arguments;
		this.callbacks.forEach(function(f){
			isFunction(f) && f.apply(null,args)
		})
	},
	clear: function(){
		this.callbacks = []
	}
});

Class.Trigger = Class.create();
Class.Trigger.extend({
	initialize: function(){
		var points = Array.from(arguments);
		var triggers = {};
		points.forEach(function(name){
			var hook_name = name.toLowerCase();
			triggers[hook_name] = new Hook;
		});
		this.triggers = triggers;
	},
	add_trigger: function(point, callback){
		var point = point.toLowerCase();
		if(this.triggers.hasOwnProperty(point)){
			this.triggers[point].add(callback)
		}
	},
	call_trigger: function(point, args){
		point = point.toLowerCase();
		if(this.triggers.hasOwnProperty(point)){
			this.triggers[point].exec(args);
		}
	}
});

var LDR = {};
// まだ作ってないのもあり。
LDR.trigger = new Class.Trigger(
	// Window LOAD/UNLOAD
	'AFTER_LOAD','BEFORE_UNLOAD',
	// Application INIT
	'BEFORE_INIT', 'AFTER_INIT',
	'BEFORE_CONFIGLOAD','AFTER_CONFIGLOAD',
	// sub contents
	'AFTER_INIT_CONFIG','AFTER_INIT_GUIDE','AFTER_INIT_MANAGE',
	// EVENT
	'WINDOW_RESIZE',
	'BEFORE_ANYKEYDOWN','AFTER_ANYKEYDOWN',
	'BEFORE_SUBS_LOAD','AFTER_SUBS_LOAD',
	'BEFORE_PRINTFEED','AFTER_PRINTFEED','COMPLATE_PRINTFEED'
);
LDR.register_hook = function(point, callback){
	this.trigger.add_trigger(point, callback);
}
LDR.invoke_hook = function(point, args){
	this.trigger.call_trigger(point, args);
}
function register_hook(point, callback){
	LDR.register_hook(point, callback);
}
function invoke_hook(point, args){
	LDR.invoke_hook(point, args);
}

function setup_hook(){
	var guide_fix = function(){
		if(!hasClass("right_container","mode-guide")) return;
		if(browser.isIE){
			if(!$("guiderankbody")) return;
			$("guiderankbody").style.width = $("right_container").offsetWidth - 15 + "px";
		}
	}
	register_hook('WINDOW_RESIZE', fit_screen);
	register_hook('WINDOW_RESIZE', guide_fix);
	register_hook('AFTER_INIT_GUIDE', guide_fix);
	register_hook('AFTER_INIT', IME_off);
	// switch mode
	register_hook('BEFORE_PRINTFEED', function(){
		if(!hasClass("right_container","mode-feedview")){
			switchClass("right_container","mode-feedview");
		}
	});

	// loading
	register_hook('BEFORE_SUBS_LOAD', function(){update("reload_button")});
	register_hook('BEFORE_SUBS_LOAD', function(){
		TreeView.destroy();
		TreeView.count = 0;
	});
	register_hook('AFTER_SUBS_LOAD', function(){update("reload_button")});

	// config load
	register_hook('AFTER_CONFIGLOAD', function(){
		setStyle("right_body", {
			fontSize: Config.current_font + "px"
		});
		if($("config_form")){
			Form.fill("config_form", Config);
		}
		update("show_all_button");
		update(/mode_text.*/);
	});
	// autoreload
	register_hook('AFTER_CONFIGLOAD', function(){
		clearInterval(State.reloadTimer);
		if(!Config.use_autoreload) return;
		var freq  = Math.max(Config.autoreload,60);
		State.reloadTimer = setInterval(function(){
			if((new Date - State.LastUserAction) > freq * 1000){
				Control.reload_subs();
				State.LastUserAction = new Date;
			}
		},freq * 200);
	});
	// revert pins
	register_hook('AFTER_CONFIGLOAD', function(){
		if(!Config.use_pinsaver) return;
		var api = new API("/api/pin/all");
		api.post({}, function(pins){
			if(!pins || !pins.length){ return }
			pins.forEach(function(v){
				// 新しいのが上
				pin.pins.unshift({
					url  : v.link,
					title: v.title,
					created_on: v.created_on
				});
				pin.hash[v.link] = true;
			});
			pin.update_view();
		});
	});
}

/*
 State
*/
var State = {};
State.requested = false;
State.last_scroll = 0;
State.LastUserAction = new Date;
State.offset_cache = [];
// どの範囲を表示しているのかを管理する
State.viewrange = {
	start : 0,
	end   : 0
};
State.has_next = true;

/*
 browser
*/
var browser = new BrowserDetect;

/*
 Global
*/
var folder = null;
var feedlink2id = {};
// 記事を読み込む順番
var Ordered = {};

var TT = {
	config : {
		base_url  : 'http://' + location.host,
		image_base: 'http://' + location.host
	}
}
function typecast_config(obj){
	each(obj, function(value,key){
		if(!TypeofConfig[key]) return;
		// "0" を falseに。
		switch(TypeofConfig[key]){
			case 'Boolean':
				 obj[key] = 
					(value == "1") ? true :
					(value == "0") ? false :
					(value == "true") ? true :
					(value == "false") ? false :
					Boolean(value);
				break;
			case 'Number':
				obj[key] = parseInt(value)
				break;
			default:
				obj[key] = value;
		}
	});
	return obj;
}


function debugPrint(text){
	var wd = debugPrint.wd || (debugPrint.wd = window.open());
	try{
		wd.document.write(text);
		wd.document.close();
	}catch(e){
		debugPrint.wd = null;
		debugPrint(text);
	}
}
// formをAjax化する
function ajaxize(element, callback){
	element = $(element);
	var method = element.method;
	var action = element.getAttribute("action");
	// ひとつの場合は完了時処理
	if(isFunction(callback)){
		var before = True;
		var after  = callback
	} else {
		var before = callback.before || True;
		var after  = callback.after  || Function.empty;
	}
	var onsubmit = function(e){
		if(e) Event.stop(e);
		var request = Form.toJson(element);
		if(before(request)){
			var api = new API(action);
			api.onload = function(response){
				after(response,request);
			}
			api.post(request);
		}
	};
	addEvent(element, "submit", onsubmit);
	element.submit = onsubmit;
}

function print_error(t){
	var e = error_message[t];
	if(e){
		$("error_title").innerHTML = e.title;
		$("error_body").innerHTML =  e.body;
	}
}
/*
 DHTML Functions
*/
updater("help_window", function(){
	if(State.help_show){
		Element.show("help_window");
		this.innerHTML = State.help_message;
		var el   = State.help_snap;
		var pos  = Position.cumulativeOffset(el);
		var left = pos[0] + el.offsetWidth + 10;
		var top  = pos[1] - 8;
		DOM.move(this, left,top);
	} else {
		Element.hide(this);
	}
});
updater("error_window",function(){
	Element.show(this);
	centering(this,0,50);
	if(!ld_check()){
		print_error("login");
	} else if(typeof _XMLHttpRequest == "undefined"){
		print_error("xmlhttp");
	} else {
		print_error("busy")
	}
});
updater("mode_text_view",function(){
	this.innerHTML = getText(Config.view_mode);
});
updater("mode_text_sort",function(){
	this.innerHTML = getText(Config.sort_mode);
});
/* navi */
updater("right_bottom_navi", print_navi);
updater("right_top_navi", print_navi);
updater("scroll_offset",function(){
	this.innerHTML = State.scroll_offset + "/"
});

updater("folder_label",function(){
	var item = subs_item(State.now_reading);
	this.innerHTML = [
		(item.folder ? item.folder.ry(8,"...") : tl('Uncategolized')),
		'<img src="/img/icon/tri_d.gif">'
	].join("");
});

/* 未読件数合計 */
updater("total_unread_count", function(){
	var count = subs.model.get_unread_count();
	// var feed_count = subs.model.get_unread_feeds().length;
	var feed_count = subs.model.get_unread_feeds_count();
	var param = {
		count : count || "0",
		feed_count : feed_count || "0"
	};
	if(param.count < 0) return;
	if(State.load_progress){
		addClass(this, "progress")
	} else {
		removeClass(this, "progress")
	}
	var tmpl = getText('unread_count_tmpl');
	var tmpl_title = getText('unread_count_title_tmpl');
	this.innerHTML = tmpl.fill(param);
	if(!State.guest_mode){
		document.title = tmpl_title.fill(param);
	}
});

updater("keybind_table", function(){
	this.innerHTML = format_keybind();
	var h = State.keyhelp_more ? this.offsetHeight + 65 + "px" : "150px";
	$("keyhelp").style.height = h;
});
updater("feed_next", function(){
	this.className = (!State.has_next) ? "disable" : "";
	update("feed_paging_next");
});
updater("feed_prev", function(){
	this.className = (State.viewrange.start == 0) ? "disable" : "";
	update("feed_paging_prev");
});

updater("feed_paging_next", function(){
	this.className = (!State.has_next) ? "disable" : "";
});
updater("feed_paging_prev", function(){
	this.className = (State.viewrange.start == 0) ? "disable" : "";
});

updater("myfeed_tab", function(){
	this.style.borderColor = State.show_left 
	 ? '#a5c5ff white white white'
	 : 'white white #a5c5ff white';
}._try());

updater("show_all_button", function(){
	var style = {
		active : {
			border : "1px solid #fff",
			backgroundColor : "#d4d0c8",
			borderColor : "gray white white gray"
		},
		inactive : {
			border : "1px solid #f5f5f5",
			backgroundColor : "#f5f5f5"
		}
	};
	setStyle(this, style[Config.show_all ? "inactive" : "active"] );
});
updater("reload_button", function(){
	var img_path = State.subs_reloading ? '/img/icon/reload_anime.gif' : '/img/icon/reload.gif';
	var cursor   = State.subs_reloading ? 'wait' : 'pointer';
	setStyle(this, {
		backgroundImage: 'url('+img_path+')',
		cursor: cursor
	});
});

/*
 Ajax and Ahah
*/
function ajax(url, onload){
	x= new _XMLHttpRequest;
	x.onload = function(){
		var res = ajax.filter(x.responseText)
		onload(res)
	}
	x.open("GET",url,true);
	x.send("");
}
ajax.filter = new Pipe;
if(browser.isKHTML){
	ajax.filter.add(function(t){
		var esc = escape(t);
		return(esc.indexOf("%u") < 0 && esc.indexOf("%") > -1) ? decodeURIComponent(esc) : t
	})
}
function ahah(url,el,onload){
	var uniq = new Date - 0;
	onload = onload || Function.empty;
	ajax(url+"?"+uniq,function(txt){
		el = $(el);
		txt = ahah.filter(txt);
		el.innerHTML = txt;
		ahah.global_callback(el);
		onload(txt);
	})
}
ahah.filter = new Pipe;
ahah.filter.add(function(txt){
	return txt.replace(/\[%(.*?)%\]/g, function($0,$1){
		try{
			eval("var str = TT."+$1);
			return str
		}catch(e){return ""}
	})
});
ahah.global_callback = new Pipe;
ahah.global_callback.add(function(el){
	fix_linktarget(el);
	return el;
})

function Pipe(label){
	var q = [];
	Pipe["_" + label] = q;
	var f = function(arg){
		var result = arg;
		foreach(q,function(v,i){
			result = v(result)
		})
		return result;
	};
	f.add = function(task){q.push(task)}
	return f;
}
Pipe.get = function(label){
	return Pipe["_" + label];
}


/*
  Config 
*/

var Config = {};
var onConfigChange = {};
Object.extend(Config, DefaultConfig);
Config.addCallback = function(key, callback){
	onConfigChange[key] = callback;
}
Config.set = function(key,value){
	var old_value = this[key];
	var new_value = value;
	this[key] = value;
	if(onConfigChange[key]){
		onConfigChange[key](old_value,new_value)
	}
	Config.save();
};
Config.save = function(){
	var api = new API("/api/config/save");
	api.post(Config);
};
Config.load = function(todo){
	var api = new API("/api/config/load");
	api.post({timestamp:new Date - 0},function(data){
		data = typecast_config(data);
		each(data,function(value,key){
			if(!isFunction(Config[key]))
				Config[key] = value
		});
		todo();
	});
};
Config.addCallback("view_mode",function(old_value,new_value){
	update(/mode_text.*/);
	subs.view.removeClass(old_value);
	subs.view.addClass(new_value);
});
Config.addCallback("sort_mode",function(old_value,new_value){
	update(/mode_text.*/);
});

Config.addCallback("current_font",function(old_value,new_value){
	setStyle("right_body", {fontSize: new_value + "px"});
});
Config.addCallback("show_all",function(){
	update("show_all_button");
});



var TabManager = {};

function TabClick(e){
	var tab = this;
	var get_target = function(el){
		var rel = el.getAttribute("rel");
		var op  = rel.slice(4);
		var tmp = op.split(">");
		var base = tmp[0];
		var target = tmp[1];
		return [base,target];
	};
	var base   = get_target(tab)[0];
	var target = get_target(tab)[1];
	Element.show(target);
	TabManager[base] = target;
	foreach($(base).getElementsByTagName("*"), function(el){
		var cl = el.className;
		if(!contain(cl,"tab") || !el.getAttribute("rel")) return;
		if(el == tab){
			switchClass(el,"tab-active");
		} else {
			switchClass(el,"tab-inactive");
			Element.hide(get_target(el)[1]);
		}
	});
	update(base);
}

ClickEvent = new Trigger("click");
function setup_event(){
	// Subscribe_idに対応するイベント
	ClickEvent.add('[subscribe_id]', function(){
		var action = get_action(this);
		var sid = this.getAttribute("subscribe_id");
		switch(action){
			case "load" : get_unread(sid);break;
			case "set_rate" : var rate = this.getAttribute("rate");set_rate(sid,rate);break;
		}
	});
	ClickEvent.add('[rel^Control:]', function(){
		var rel = this.getAttribute("rel");
		var action = rel.replace("Control:","");
		eval("Control."+action);
	});
	ClickEvent.add('[rel=subscribe]', function(e){
		Event.stop(e);
		var el = this;
		var feedlink = this.href;
		feed_subscribe(feedlink,function(res){
			el.setAttribute("rel","unsubscribe");
			el.className = "unsub_button";
			if(el.innerHTML == tl('Add')){
				el.innerHTML = tl('Unsubscribe');
			}
			feedlink2id[feedlink] = res.subscribe_id;
		});
	});
	ClickEvent.add('[rel=unsubscribe]', function(e){
		Event.stop(e);
		var el = this;
		var feedlink = this.href;
		var sid = feedlink2id[feedlink];
		feed_unsubscribe(sid,function(res){
			el.setAttribute("rel","subscribe");
			el.className = "sub_button";
			if(el.innerHTML == tl('Unsubscribe')){
				el.innerHTML = tl('Add');
			}
		});
	});
	ClickEvent.add('[rel=discover]', function(e){
		Event.stop(e);
		var el = this;
		var url = this.href;
		var fm = $("discover_form");
		fm.url.value = url;
		fm.submit();
		Control.show_subscribe_form();
	});

	ClickEvent.add('a[href~/subscribe/]', function(e){
		if(browser.isKHTML) return;
		var subscribe_base = "http://" + location.host + "/subscribe/";
		var url = this.href;
		if(url != subscribe_base && url.indexOf(subscribe_base) == 0){
			Event.stop(e);
			var el = this;
			url = url.replace(subscribe_base,"");
			var fm = $("discover_form");
			fm.url.value = url;
			fm.submit();
			Control.show_subscribe_form();
			return false;
		}
	});
	
	ClickEvent.add('[rel^tab:]', TabClick);
	ClickEvent.add(True, FlatMenu.hide);
	ClickEvent.add(True, function(){ State.LastUserAction = new Date });
	ClickEvent.add('[rel^sort:]', function(e){
		var el = this;
		var rel = el.getAttribute("rel");
		var sort_mode  = rel.slice(5);
		MI.sort(sort_mode);
	});
	ClickEvent.apply();
}


var Keybind;
function IME_off(msg){
	if(!browser.isFirefox || !browser.isWin) return;
	var s = $N("span");
	s.innerHTML = '<input type="password" id="ime_off" style="visibility:hidden">';
	document.body.appendChild(s);
	setTimeout(function(){
		var el = $("ime_off");
		if(el){
			el.focus();
			document.body.removeChild(s);
			Keybind.lastInvoke = null;
			if(msg)
				message("IMEをオフにしました");
		}
	}._try(),10);
}

function setup_hotkey(){
	Keybind = new HotKey(null, "reader");
	Keybind.globalCallback = function(){
		State.LastUserAction = new Date;
		if(State.show_error) hide_error();
	};
	var keyconfig = [];
	each(KeyConfig,function(value,key){
		keyconfig.push([
			value, Control[key]
		])
	});
	if(browser.isWin && browser.isFirefox){
		keyconfig.push([
			"IME",
			function(){
				if(this.lastInvoke == "IME"){
					IME_off(true);
				}
			}
		]);
	}
	keyconfig.forEach(function(a){
		Keybind.add(a[0],a[1])
	});

	// 入力フォームでキー操作を効かせる
	Keybind.allow = /finder/i;
	Keybind.filter = hotkey_filter;

	// for safari
	if(browser.isKHTML){
		Keybind.add("up", Event.stop);
		Keybind.add("down", Event.stop);
	}
}
function print_navi(){
	var next_id = get_next();
	var prev_id = get_prev();
	var buf = [];
	if(prev_id){
		buf.push([
			'<div class="button prev" onclick="Control.read_prev_subs()">',
			'<span class="navi_text">≪ [[title]]</span></div>'
		].join("").fill( subs_item(prev_id) ))
	}
	if(next_id){
		buf.push([
			'<div class="next button" onclick="Control.read_next_subs()">',
			'<span class="navi_text">[[title]] ≫</span></div>'
		].join("").fill( subs_item(next_id) ))
	}
	this.innerHTML = buf.join("");
};


function getStyle(element, style){
	element = $(element);
	var value = element.style[style.camelize()];
	if (!value) {
		if (document.defaultView && document.defaultView.getComputedStyle) {
			var css = document.defaultView.getComputedStyle(element, null);
			value = css ? css.getPropertyValue(style) : null;
		} else if (element.currentStyle) {
			value = element.currentStyle[style.camelize()];
		}
	}
	if (window.opera && ['left', 'top', 'right', 'bottom'].include(style))
		if (getStyle(element, 'position') == 'static') value = 'auto';
	return value == 'auto' ? null : value;
}

/*
 Debug用関数
*/
function Dumper(obj){
	var buf = [];
	for(var i in obj){
		buf.push( i+" = "+obj[i]);
	}
	return buf.join("\n")
}

/* Global変数 */
var subs,inbox;

function message(str){
	$("message").innerHTML = getText(str) || str;
}

/* 購読停止 */
function unsubscribe(sid,callback){
	var api = new API("/api/feed/unsubscribe");
	callback = callback || Function.empty;
	var info = subs_item(sid);
	var tmpl = getText('unsubscribe_confirm');  // 'Are you sure to remove [[title]] from your subscription?'
	var tmpl2 = getText('ubsubscribe_confirm2'); // 'Are you sure to unsubscribe this feed?'
	confirm( info ? tmpl.fill(info) : tmpl2) && api.post(
		{subscribe_id:sid},function(res){
			message(tl('feed deleted'));
			callback(res);
		}
	);
}

function touch(id, state){
	if(Config.touch_when == state){
		touch_all(id)
	}
}

/* 既読化 */
function touch_all(id){
	if(!id) return;
	var api = new API("/api/touch_all");
	var el = $("subs_item_"+id);
	var info = subs_item(id);
	if(el && info){
		el.innerHTML = info.title;
		switchClass(el, "rs-read");
	}
	if(info.unread_count == 0){
		return false;
	} else {
		var unread = info.unread_count;
		subs.model.unread_count_cache -= unread;
		subs.model.unread_feeds_count_cache -= 1;
		info.unread_count = 0;
		api.post({subscribe_id : id}, function(){
			message("Marked as read");
			update("total_unread_count");
		});
	}
}

/* レートの設定インターフェース */
function set_rate(id,rate){
	var ap = "/api/feed/set_rate";
	var rate_api = new API(ap);
	rate_api.onload = function(res){
		subs_item(id).rate = rate;
		message("set_rate_complete");
	}
	rate_api.onerror = function(){};
	rate_api.post({
		subscribe_id : id,
		rate : rate
	});
}
function create_folder(name){
	if(!name){
		name = prompt(tl('Folder Name'),"");
		if(!name) return;
	}
	var api = new API("/api/folder/create");
	api.post({name:name},function(res){
		message('create_folder_complete');
		// clear cache
		folder = null;
		Control.move_to(name)
	});
	return name;
}


function default_error(){}




function toggle_pin(item_id){
	var pin_button = $("pin_" + item_id);
	var item = $("item_" + item_id);
	var a = item.getElementsByTagName("a");
	if(!a.length) return;
	var title = a[0].innerHTML;
	var url   = a[0].href;
	if(pin.has(url)){
		pin.remove(url);
		pin_button && removeClass(pin_button, "pin_active");
		removeClass(item, "pinned");
	} else {
		// feed info
		var info = subs_item(State.now_reading);
		pin.add(url,title,info);
		pin_button && addClass(pin_button, "pin_active");
		addClass(item, "pinned");
	}
}

function close_item(item_id){
	DOM.remove($("item_" + item_id));
}

/* Config */
/*
 Pins
*/
var Pin = Class.create();
Pin.extend({
	initialize: function(){
		this.pins = [];
		this.hash = {};
	},
	has: function(url){
		return this.hash[url] ? true : false;
	},
	add: function(url,title,info){
		if(this.has(url)) return;
		this.hash[url] = true;
		var data = {
			title : title,
			url   : url
		};
		if(info){
			data.icon = info.icon
		}
		this.pins.unshift(data);
		if(this.pins.length > 100){
			var p = this.pins.pop();
			this.has[p.url] = false;
		}
		this.update_view();
	},
	remove: function(url){
		if(!this.has(url)) return;
		this.hash[url] = false;
		this.pins = this.pins.select(function(v){
			return v.url != url
		})
		this.update_view();
	},
	shift: function(){
		var p = this.pins.shift();
		if(p){
			this.hash[p.url] = false;
			return p;
		}
	},
	update_view: function(){
		$("pin_button").style.width = "29px";
		$("pin_count").innerHTML = this.pins.length;
	},
	write_list: function(){
		if(!this.pins.length) return;
		var buf = this.pins.map(function(p){
			return '<li><a href="[[url]]">[[title]]</a></li>'.fill(p)
		}).join("");
		var w = window.open();
		w.document.write([
			"<style>",
			"*{font-size:12px;line-height:150%}",
			"</style><ul>",
			buf,"</ul>"
		].join(""));
		w.document.close();
	},
	open: function(url){
		var can_popup = (window.open(url.unescapeHTML())) ? true : false;
		if(can_popup){
			this.remove(url)
		} else {
			message('cannot_popup')
		}
	},
	open_group: function(){
		if(!this.pins.length) return;
		var queue = new Queue();
		var can_popup = false;
		var self = this;
		var count = 0;
		var max_pin = Config.max_pin;
		if(!isNumber(max_pin)) max_pin = DefaultConfig.max_pin;
		foreach(this.pins, function(p){
			if(max_pin > count){
				queue.push(function(){
					can_popup = (window.open(p.url.unescapeHTML())) ? true : false;
				});
			}
			count++;
		});
		queue.interval = 100;
		queue.push(function(){
			if(can_popup){
				(max_pin).times(function(){
					var p = self.shift();
					p && new API("/api/pin/remove").post({
						link:p.url.unescapeHTML()
					});
				})
				self.update_view();
			} else {
				message('cannot_popup')
			}
		})
		queue.exec();
	},
	clear: function(){
		this.pins = [];
		this.hash = {};
		this.update_view();
	}
});
var Pinsaver = Class.create();
Pinsaver.extend({
	add: function(url,title){
		if(!Config.use_pinsaver) return;
		var api = new API("/api/pin/add");
		api.post({
			link : url.unescapeHTML(),
			title: title.unescapeHTML()
		})
	},
	remove: function(url){
		if(!Config.use_pinsaver) return;
		var api = new API("/api/pin/remove");
		api.post({
			link:url.unescapeHTML()
		});
	},
	clear: function(){
		var api = new API("/api/pin/clear");
		api.post({});
	}
})
Pin = Class.merge(Pin, Pinsaver);
var pin = new Pin;


function start_mousetracking(callback){
	State.mousemove = function(e){
		var pos = [e.clientX,e.clientY]; 
		message(pos);
		isFunction(callback) && callback(pos)
	};
	State.stop_mousemove = Event.observe(document.body, "mousemove", State.mousemove);
}
function stop_mousetracking(){
	State.stop_mousemove();
}

// スクロール位置から現在フォーカスが当たっているアイテムを取得
function get_active_item(detail){
	// return 1;
	var sc = $("right_container").scrollTop;
	var divs = $("right_body").getElementsByTagName("h2");
	// for Opera9 beta
	var top_offset = $("right_body").offsetTop;

	var len = divs.length;
	if(!len) return;
	var offsets = [];
	for(var i=0;i<len;i++){
		offsets.push(divs[i].offsetTop - top_offset);
	}
	/*
	var diffs, min, offset;
	if(len == 1){
		offset = 0
	} else {
		diffs  = offsets.map(function(v){return Math.abs(sc - v)});
		min    = Math.min.apply(null, diffs);
		offset = diffs.indexOf(min);
	}
	*/

	var screen = [sc, sc + $("right_container").offsetHeight];
	var pairs = offsets.map(function(v,i,self){
		if(self[i+1]){
			return [v, self[i+1]];
		} else {
			return [v, $("right_body").offsetHeight]
		}
	});
	var full_contain = [];
	var intersections = pairs.map(function(pair,i){
		if(pair[1] < screen[0]) return 0;
		if(pair[0] > screen[1]) return 0;
		var top = Math.max(screen[0], pair[0]);
		var bottom = Math.min(screen[1], pair[1]);
		if(top == pair[0] && bottom == pair[1]){
			full_contain.push(i)
		}
		return bottom - top;
	});
	if(len == 1){
		offset = 0;
	} else {
		if(full_contain.length > 0){
			offset = full_contain.shift();
		} else {
			var max_intersection = Math.max.apply(null, intersections);
			offset = max_intersection == 0 ? len - 1 : intersections.indexOf(max_intersection);
		}
	}

	if(detail){
		var element = divs[offset];
		var link    = element.getElementsByTagName("a")[0];
		var item_id = element.id.replace("head_", "");
		if(!link) return false;
		var info = {
			offset : offset+1,
			item_id : item_id,
			element : element
		};
		Object.extend(info, get_item_info(item_id));
		return info;
	} else {
		return offset;
	}
}
// 現在読んでいるフィードを取得
function get_active_feed(){
	if(State.last_feed){
		return State.last_feed;
	} else {
		return false;
	}
}

State.last_items = {};
// id指定で記事の情報を取得
function get_item_info(id){
	return State.last_items["_"+id];
}

/*
function format_keybind(){
	var help = [];
	var kbd = function(str){
		var list = str.split("|");
		return list.map(function(v){
			if(/\w/.test(v) && v == v.toUpperCase()){
				v = "shift+" + v.toLowerCase();
			}
			v = v.replace("+down","+↓");
			v = v.replace("+up","+↑");
			return v.aroundTag("kbd");
		}).join(" or ");
	};
	each(KeyHelp, function(value,key){
		var kb = KeyConfig[key];
		help.push("<tr><th>" + value + "</th><td>" + kbd(kb) + "</td></tr>");
	});
	return "<table>" + help.join("") + "</table>";
}
*/

function format_keybind(){
	var help = [];
	var kbd = function(str){
		var list = str.split("|");
		if(!State.keyhelp_more){list = [list[0]]};
		return list.map(function(v){
			if(/\w/.test(v) && v == v.toUpperCase()){
				v = "shift+" + v.toLowerCase();
			}
			v = v.replace("+down","+↓");
			v = v.replace("+up","+↑");
			return v.aroundTag("kbd");
		}).join("<br>");
	};
	KeyHelpOrder.forEach(function(row, num){
		if(!State.keyhelp_more && num > 1) return;
		help.push("<tr>");
		row.forEach(function(f){
			var l  = KeyHelp[f];
			var kb = KeyConfig[f];
			if(kb){
				help.push("<th>" + l + ":</th><td>" + kbd(kb) + "</td>");
			} else {
				help.push("<td colspan='2'></td>");
			}
		});
		help.push("</tr>");
	});
	var table = "<table>" + help.join("") + "</table>";
	var button = [
		'<div class="keyhelp_desc">',
		'<div class="keyhelp_ime">',
			getText('notice_ime_off'),
		'</div>',
		'<div class="keyhelp_more">',
			'<span class="button"r onclick="Control.open_keyhelp.call(this,event)">' + tl('Show in window') + '</span>',
			'<span class="button" onclick="Control.toggle_more_keyhelp.call(this,event)">'+ 
			 (State.keyhelp_more ? tl('Compact') : tl('More') + '...') + '</span>',
		'</div>',
		'</div>',
		'<div class="keyhelp_hide">',
			'<span class="button" onclick="Control.hide_keyhelp.call(this,event)">' + tl('Close') + '</span>',
		'</div>'
	];
	return table + button.join("");
}



function check_wait(){
	if(Config.use_wait != 1) return false;
	var st = check_wait.state;
	var key = Keybind.lastInput;
	// 初回
	if(!st[key]){
		st[key] = new Date;
		return false;
	} else {
		var now = new Date;
		if(now - st[key] > Config.wait){
			st[key] = new Date;
			return false;
		} else {
			return true
		}
	}
}
check_wait.state = {};

/*
 ボタンから呼び出される操作など
*/
var Control = {
	pin: function(){
		var item = get_active_item(true);
		if(!item) return;
		toggle_pin(item.item_id);
	},
	open_pin: function(){
		pin.open_group()
	},
	clear_pin: function(){
		pin.clear();
	},
	read_pin: function(url){
		pin.open(url);
	},
	toggle_menu: function(event){
		if(State.show_menu){
			Control.hide_menu.call(this,event);
		} else {
			Control.show_menu.call(this,event);
		}
	},
	hide_menu: function(){
		State.show_menu = false;
	},
	show_menu: function(){
		State.show_menu = true;
		Event.cancelNext("click");
		var menu = FlatMenu.create_on(this);
		// menu.setStyle({ width : "300px" });
		menu.onhide = function(){ State.show_menu = false };
		menu.show();
		var sep = '<div style="height:0px;border-top:1px dotted #ccc;font-size:0px;"></div>';
		var menus = LDR_VARS.MenuItems;
		var tmpl = Template.get("menu_item").compile();
		var write_menu = function(){
			menu.clear();
			foreach(menus,function(v,i){
				v == '-----'
					? menu.add(sep)
					: menu.add(tmpl(v));
			});
			menu.update();
		};
		write_menu();
		return menu;
	},
	pin_click: function(e){
		if(e.shiftKey){
			pin.write_list();
			return
		}
		pin.open_group();
		return
	},
	pin_mouseout: function(){
		State.pin_timer = function(){
			FlatMenu.hide();
		}.later(1000)();
	},
	pin_list: function(){
		pin.write_list();
	},
	pin_hover: function(e){
		function stophide(){
			if(State.pin_timer){ State.pin_timer.cancel() }
		}
		stophide();
		if(!pin.pins.length){
			return;
		}
		var menu = FlatMenu.create_on(this);
		menu.setStyle({
			width : "300px"
		});
		menu.setEvent({
			mouseover: stophide,
			mouseout : Control.pin_mouseout
		});
		menu.show();
		var tmpl = Template.get("pin_item").compile();
		var write_menu = function(){
			menu.clear();
			// 開く件数
			var open_num = Config.max_pin;
			// containerの高さにあわせて調整
			var ch = $("right_container").offsetHeight;
			var view_num = Math.floor((ch-92) / 24);
			menu.add([
				'<span class="button flat_menu pin_list"',
				' rel="Control:pin_list();FlatMenu.hide()">',
				tl('List view'), ' (', pin.pins.length, tl(' items'), ')</span>'
			].join(""));
			foreach(pin.pins,function(v,i){
				if(i > view_num){
					return;
				}
				var item = tmpl({
					title : v.title,
					link  : v.url,
					target : (i < open_num) ? "pin-target" : "",
					icon  : v.icon || 'http://image.reader.livedoor.com/img/icon/default.gif'
				});
				menu.add(item);
			});
			menu.add([
				'<span class="button flat_menu dust_box"',
				' rel="Control:clear_pin();FlatMenu.hide()">',
				tl('Clear'), '</span>'
			].join(""));
			menu.update();
		};
		write_menu();
		return menu;
	},
	reverse: function(){
		Config.set("reverse_mode", !Config.reverse_mode);
		message(
			(Config.reverse_mode)
			 ? 'Show older items first'
			 : 'Show newer items first'
		);
		rewrite_feed();
	},
	compact: function(){
		var o = get_active_item();
		toggleClass("right_body", "compact");
		if(contain($("right_body").className, "compact")){
			message("expanded items / press c to collapse")
		} else {
			message("collapsed items / press c to expand")
		}
		Control.scroll_to_offset(o);
	},
	close_and_next_item: function(id,e){
		if(e) Event.stop(e);
		addClass("item_"+id, "item_read");
		var h = $("item_"+id).offsetHeight;
		Control.add_scroll_padding();
		$("right_container").scrollTop += h + 2;
	},
	view_original: function(){
		var item = get_active_item(true);
		if(!item) return;
		window.open(item.link.unescapeHTML()) || message('cannot_popup');
	},
	create_folder: function(){
		var name = create_folder();
	},
	move_to: function(folder){
		subs_item(State.now_reading).folder = folder;
		update("folder_label");
		move_to(State.now_reading,folder,[
			message.bindArgs(
				(folder ? 'Moved to ' + folder : 'Moved to Uncategolized')
			),
			FlatMenu.hide
		].asCallback());
	},
	toggle_keyhelp: function(){
		(!State.keyhelp_visible) ?
			 Control.show_keyhelp.call($("keyhelp_button")) :
			 Control.hide_keyhelp()
	
	},
	show_keyhelp: function(){
		Element.show("keyhelp");
		update("keybind_table");
		State.keyhelp_visible = true;
	},
	hide_keyhelp: function(){
		Element.hide("keyhelp");
		State.keyhelp_visible = false;
	},
	toggle_more_keyhelp: function(){
		var el = this;
		if(!State.keyhelp_more){
			Control.show_more_keyhelp();
		} else {
			Control.hide_more_keyhelp();
		}
	},
	show_more_keyhelp: function(){
		State.keyhelp_more = true;
		Control.show_keyhelp();
	},
	hide_more_keyhelp: function(){
		State.keyhelp_more = false;
		Control.show_keyhelp();
	},
	open_keyhelp: function(){
		var old_state = State.keyhelp_more;
		State.keyhelp_more = true;
		var w = window.open("","keyhelp","width=580,height=400");
		w.document.write([
			"<style>",
			"*{font-size:12px;font-weight:normal;line-height:150%}",
			"tr,td{vertical-align:top}",
			"kbd{border:1px solid #888;padding:2px}",
			"div{display:none}",
			"</style>",
			format_keybind(),
			'<p class="notice">',
			'※ショートカットキーが使えない場合は日本語入力を無効にしてみてください。<br>',
			'※ブラウザや環境によってはいくつかのショートカットキーが使えない場合があります。',
			'</p>'
		].join(""));
		w.document.close();
		State.keyhelp_more = old_state;
	},
	focus_findbox : function(){
		$("finder").focus();
	},
	blur_findbox : function(){
		var f = $("finder");
		f.value = "";
		f.blur();
	},
	show_subscribe_form: function(){
		Element.show("subscribe_window");
		centering("subscribe_window",0,40);
		show_overlay();
		setTimeout(function(){
			try{
				TabClick.call($("tab_add_feed"));
				$("discover_url").focus();
				$("discover_url").select();
			} catch(e){
			}
		},10);
	},
	hide_subscribe_form: function(){
		Element.hide("subscribe_window");
		DOM.remove("overlay");
	},
	unsubscribe: function(){
		if(State.now_reading){
			unsubscribe(State.now_reading);
		}
	},
	show_folder: function(){
		Event.cancelNext("click");
		var menu = FlatMenu.create_on(this, "right_container");
		menu.show();
		var write_menu = function(){
			menu.clear();
			var tmpl = Template.get("folder_item").compile();
			menu.add([
				'<span class="button create_folder"',
				' rel="Control:create_folder();FlatMenu.hide()">',
				tl('Create New Folder'), '</span>'
			].join(""));
			menu.add(tmpl({
				folder_name : tl('Uncategolized'),
				move_to : ""
			}));
			foreach(folder.names,function(v){
				var checked = subs_item(State.now_reading).folder == v ? "checked" : "";
				var item = tmpl({folder_name : (""+v).ry(8,"..."),  move_to : v, checked : checked});
				menu.add(item);
			});
			menu.add([
				'<span class="button dust_box"',
				' rel="Control:unsubscribe();FlatMenu.hide()">',
				tl('Unsubscribe'), '</span>'
			].join(""));
			menu.update();
		};
		if(folder){
			write_menu();
		} else {
			menu.add(tl('Loading'));
			get_folders(write_menu);
		}
		return menu;
	},
	show_viewmode: function(){
		Event.cancelNext("click");
		var menu = FlatMenu.create_on(this);
		var tmpl = Template.get("viewmode_item").compile();
		var modes  = LDR_VARS.ViewModes;
		foreach(modes,function(v,i){
			var item = tmpl({
				label : getText(v),
				mode  : v,
				checked : Config.view_mode == v ? "checked" : ""
			});
			menu.add(item);
		});
		menu.show();
		return menu;
	},
	show_sortmode: function(){
		Event.cancelNext("click");
		var menu = FlatMenu.create_on(this);
		var tmpl = Template.get("sortmode_item").compile();
		var modes  = [
			"modified_on",
			"modified_on:reverse",
			"unread_count",
			"unread_count:reverse",
			"title:reverse",
			"rate",
			"subscribers_count",
			"subscribers_count:reverse"
		];
		foreach(modes,function(v,i){
			var item = tmpl({
				label : getText(v),
				mode  : v,
				checked : Config.sort_mode == v ? "checked" : ""
			});
			menu.add(item);
		});
		menu.show();
		return menu;
	},
	get_foldernames: function(){
		return subs.list.folder_names;
	},
	feed_next: function(){
		Control.feed_page(1)
	},
	feed_prev: function(){
		Control.feed_page(-1)
	},
	feed_page: function(num){
		// 過去記事取得
		var sid = State.now_reading;
		if(!sid) return;
		var limit;
		var c = Config.items_per_page;
		if(!c){
			limit = 20;
		} else if(c > 200) {
			limit = 200;
		} else {
			limit = c;
		}
		if(num == 1){
			if(!State.has_next) return;
			State.viewrange.start = State.viewrange.end;
		} else if(num == -1){
			if(State.viewrange.start == 0) return;
			State.viewrange.end = State.viewrange.start;
			State.viewrange.start = Math.max(0,State.viewrange.start - limit);
			limit = State.viewrange.end - State.viewrange.start;
		}
		var api = new API("/api/all");
		api.onload = function(json){
			print_feed(json);
			// リクエストよりも件数が少ない場合
			if(json.items.length < limit){
				State.has_next = false;
			} else {
				State.has_next = true;
			}
			update("feed_next","feed_prev");
		};
		api.post({
			subscribe_id : sid,
			offset: State.viewrange.start,
			limit : limit
		});
	},
	get_past: function(){
	},
	scroll_top: function(){
		var target = $("right_container");
		target.scrollTop = 0;
	},
	prefetch: function(){
		var next_group = get_next_group();
		if(!next_group) return;
		next_group.forEach(function(next_id,i){
			if(get_unread.cache.has(next_id)){
				// message("prefetched")
			} else {
				prefetch(next_id,i)
			}
		})
	},
	update_scrollcount: function(num){
	
	
	},
	add_scroll_padding:function(){
		var container = $("right_container");
		setStyle("scroll_padding",{height:container.offsetHeight+"px"});
	},
	del_scroll_padding:function(){
		setStyle("scroll_padding",{height:"0px"})
	},
	scroll_to_px: function(top){
		var container = $("right_container");
		// for opera9 beta
		var top_offset = $("right_body").offsetTop;
		container.scrollTop = top - top_offset;
	},
	scroll_to_zero: function(){
		var container = $("right_container");
		container.scrollTop = 0;
	},
	scroll_to_offset: function(o){
		var divs = $("right_body").getElementsByTagName("h2");
		var item = divs[o] || null;
		if (!item){
			return
		} else {
			var scroll_to = item.offsetTop;
		}
		Control.scroll_to_px(scroll_to);
	},
	next_item_offset: function(){
		var container = $("right_container");
		var sc = container.scrollTop;
		var top_offset = $("right_body").offsetTop;
		var divs = $("right_body").getElementsByTagName("h2");
		var active = (sc == 0) ? -1 : get_active_item();
		if(active != null && active != -1 && divs[active].offsetTop - top_offset > sc){
			return active;
		}
		var can_scroll = divs[active + 1] || null;
		return (can_scroll) ? active + 1 : null;
	},
	prev_item_offset: function(){
		var container = $("right_container");
		var sc = container.scrollTop;
		var top_offset = $("right_body").offsetTop;
		var divs = $("right_body").getElementsByTagName("h2");
		var active = get_active_item();
		if(!active || active == 0){
			return null;
		} else if(divs[active].offsetTop-top_offset < sc){
			return active;
		} else {
			return active - 1;
		}
	},
	scroll_next_item: function(){
		if (check_wait()) return;
		var next_offset = Control.next_item_offset();
		if (next_offset == null){
			writing_complete() && message('this is the last item');
			return;
		}
		Control.add_scroll_padding();
		Control.scroll_to_offset(next_offset);
	},
	scroll_prev_item: function(){
		if(check_wait()) return;
		var prev_offset = Control.prev_item_offset();
		if(prev_offset == null){
			Control.scroll_to_zero();
		} else {
			Control.scroll_to_offset(prev_offset)
		}
	},
	// smooth scroll
	scroll_next_item_smooth: function(){
	},
	// smooth scroll only long item
	scroll_next_item_auto: function(){
	},
	go_next: function(){
		var container = $("right_container");
		var old = container.scrollTop;
		Control.scroll_next_item();
		if(old == container.scrollTop){
			if(State.go_next_flag){
				Control.read_next_subs();
				State.go_next_flag = false;
			} else {
				State.go_next_flag = true;
			}
		}
	},
	go_prev: function(){
		var container = $("right_container");
		var old = container.scrollTop;
		Control.scroll_prev_item();
		if(old == container.scrollTop) Control.read_prev_subs();
	},
	read: function(sid, todo){
		// 全件表示で未読0件のフィードを表示
		if(Config.show_all == true){
			if(subs_item(sid).unread_count == 0){
				get_first(sid, todo);
			} else {
				get_unread(sid, todo);
			}
		} else {
			get_unread(sid, todo);
		}
	},
	read_next_item: function(){},
	read_head_subs: function(){
		if(State.requested) return;
		var head = get_head();
		if(head){
			State.requested = true;
			touch(State.now_reading, "onclose");
			Control.read(head);
			// get_unread(head)
		}
	},
	read_end_subs: function(){
		if(State.requested) return;
		var end = get_end();
		if(end){
			State.requested = true;
			touch(State.now_reading, "onclose");
			Control.read(end);
			// get_unread(end)
		}
	},
	read_next_subs: function(){
		if(State.requested) return;
		var next = get_next();
		if(next){
			State.requested = true;
			touch(State.now_reading, "onclose");
			Control.read(next, Control.prefetch);
			// get_unread(next, Control.prefetch)
		} else {
			if(State.return_to_head){
				State.return_to_head = false;
				Control.read_head_subs();
			} else {
				message(tl('End of feeds.  Press s to return to the top.'));
				State.return_to_head = true;
			}
		}
	},
	read_prev_subs: function(){
		if(State.requested) return;
		var prev = get_prev();
		if(prev){
			State.requested = true;
			touch(State.now_reading, "onclose");
			Control.read(prev)
			// get_unread(prev)
		}
	},
	reload_subs: function(){
		subs.update(true);
		// cacheをクリア
		get_unread.cache.clear();
	},
	/* 次に読むフィードを判別 */
	get_next: function(){
		var now_id = State.now_reading;
		next_id ;
	},
	change_view: function(view){
		Config.set("view_mode", view);
		subs.update();
	},
	change_sort: function(sort){
		Config.set("sort_mode", sort);
		subs.sort();
		subs.update();
	},
	toggle_leftpane: function(){
		(!State.show_left) ? Control.show_leftpane() : Control.hide_leftpane();
	},
	show_leftpane: function(){
		State.leftpane_width = LDR_VARS.LeftpaneWidth;
		State.show_left = true;
		fit_screen();
		DOM.hide("right_top_navi");
		update("myfeed_tab");
	},
	hide_leftpane: function(){
		State.leftpane_width = 0;
		State.show_left = false;
		fit_screen();
		DOM.show("right_top_navi");
		update("myfeed_tab");
	},
	toggle_fullscreen: function(){
		var fs = [];
		var elements = ["header","menu","control","footer"];
		fs[0] = ["header","menu","control","footer"];
		fs[1] = ["menu","control"];
		fs[2] = [];
		if(!State.fullscreen){
			State.fullscreen = 1;
		} else if(State.fullscreen == fs.length-1){
			State.fullscreen = 0;
		} else {
			State.fullscreen++
		}
		Element.hide(elements);
		Element.show(fs[State.fullscreen]);
		fit_screen()
	},
	font: function(num){
		var to;
		var old = Config.current_font;
		if(num == 0){to = 14} else { to = old + num }
		Config.set("current_font", to);
	},
	load_config: function(){},
	save_config: function(){},
	toggle_show_all: function(){
		Config.set("show_all", !Config.show_all);
		update("show_all_button");
		Control.reload_subs()
	},
	scroll_next_page:function(){
		if(check_wait()) return;
		Control.scroll_page(1)
	},
	scroll_prev_page:function(){
		if(check_wait()) return;
		Control.scroll_page(-1)
	},
	scroll_page: function(num){
		var h = $("right_container").offsetHeight - 40;
		var c = 
			(Config.scroll_type == "page") ? h:
			(Config.scroll_type == "half") ? h / 2 :
			(Config.scroll_px || 100);
		$("right_container").scrollTop += c * num;
	},
	scroll_page_or_subs: function(num){
		var before = $("right_container").scrollTop;
		$("right_container").scrollTop += num;
		var after  = $("right_container").scrollTop;
		if(before == after && writing_complete()){
			num > 0 ? Control.read_next_subs() : Control.read_prev_subs();
		}
	},
	mark_all_read: function(){
		var list = Ordered.list;
		if(!list) return;
		var no_feeds = tl('There is no item to mark as read');
		if(list.length == 0){
			alert(no_feeds);
			return;
		}
		var post_list = list.filter(function(id){
			var info = subs_item(id);
			if(!info) return false;
			return (info.unread_count > 0) ? true : false;
		});
		if(post_list.length == 0){
			alert(no_feeds);
			return;
		}
		var tmpl = getText('mark_all_read_tmpl');
		var c = confirm(tmpl.fill({
			count: post_list.length
		}));
		if (!c) return;
		post_list.forEach(function(id){
			var info = subs_item(id);
			var el = $("subs_item_"+id);
			if(el){
				el.innerHTML = info.title;
				switchClass(el, "rs-read");
			}
			var unread = info.unread_count;
			subs.model.unread_count_cache -= unread;
			subs.model.unread_feeds_count_cache -= 1;
			info.unread_count = 0;
		});
		var postdata = post_list.join(",");
		var api = new API("/api/touch_all");
		api.post({subscribe_id : postdata}, function(){
			message("Marked as read");
			update("total_unread_count");
		});
	}
};

function show_overlay(){
	var ol = $N("div",{id:"overlay"});
	document.body.appendChild(ol);
}
function hide_overlay(){
	DOM.remove("overlay");
}

function prefetch(sid,count){
	var max_prefetch = LDR_VARS.MaxPrefetch;
	get_unread.cache.set(sid, "prefetch");
	switchClass("subs_item_" + sid, "ps-prefetching");
	message("prefetching");
	function store_cache(json){
		get_unread.cache.set(sid, json);
		if(json.channel){
			var expr = json.channel.expires * 1000;
		}
		get_unread.cache.set_expr(sid, expr);
		switchClass("subs_item_" + sid, "ps-prefetched");
		message("prefetch_complete");
	}
	if(subs_item(sid).unread_count == 0 && Config.show_all == true){
		var api = new API("/api/all");
		api.post({
			subscribe_id : sid,
			offset : 0,
			limit  : 1
		}, store_cache);
	} else {
		var api = new API("/api/unread?prefetch");
		api.post({ subscribe_id : sid }, store_cache);
	}
}

function get_prefetch_num(){
	var prefetch_num;
	if(Config.use_prefetch_hack){
		prefetch_num = Config.prefetch_num;
		if(0 <= prefetch_num && prefetch_num <= LDR_VARS.MaxPrefetch){
			return prefetch_num;
		} else {
			return LDR_VARS.DefaultPrefetch;
		}
	} else {
		return LDR_VARS.DefaultPrefetch;
	}
}
function get_next_group(){
	var prefetch_num = get_prefetch_num();
	if(prefetch_num == 0) return null;
	var sid = State.now_reading;
	if(!sid && Ordered.list){
		return Ordered.list[0].slice(0, prefetch_num - 1);
	}
	var list = Ordered.list;
	if(!list) return;
	var offset = list.indexOfStr(sid);
	var next_group = list.slice(offset + 1, offset + prefetch_num + 1);
	return next_group;
}


function scroll_hilight(){
	var target = false;
	var timer;
	var count = 0;
	function update_hilight(){
		// message(++count);
		var item = get_active_item(1);
		if(item){
			if (target){
				removeClass(target, "hilight");
			}
			target = $("item_count_" + item.offset);
			addClass(target, "hilight");
		}
	}
	Event.observe($('right_container'), 'scroll', function(){
		if(Config.use_scroll_hilight){
			clearTimeout(timer);
			timer = setTimeout(update_hilight,100);
		}
	});
}
scroll_hilight();

function is_last(){
	var list = Ordered.list;
	if(!list) return true;
	var last_id = list[list.length-1];
	return (State.now_reading == last_id)
}
function writing_complete(){
	if(State.writer && State.writer.complete == false){
		return false;
	}
	if(State.writer2 && State.writer2.complete == false){
		return false;
	}
	return true;
}
State.autoscroll_wait = 2000;
function autoscroll(e){
	if(e.shiftKey){
		if(State.autoscroll_timer){
			clearInterval(State.autoscroll_timer);
			State.autoscroll_wait = State.autoscroll_wait * 0.8;
		}
		State.autoscroll_timer = setInterval(function(){
			writing_complete() && Control.go_next();
			if(is_last()) stop_autoscroll();
		}, State.autoscroll_wait);
	} else {
		stop_autoscroll();
		Control.go_next();
	}
}
function stop_autoscroll(){
	State.autoscroll_wait = 2000;
	clearInterval(State.autoscroll_timer);
	State.autoscroll_timer = null;
}

/*
 Toggle Base
*/
var ToggleBase = Class.create().extend({
	initialize: function(){
		this.observe("click");
	},
	observe: function(){
		var self = this;
		Array.from(arguments).forEach(function(handle){
			self[handle] = function(event){
				self["on"+handle].call(self, this, event)
			}
		});
	},
	onclick: function(el, event){
		Event.stop(event);
		return this.toggle(el)
	},
	toggle: function(el){
		var state = (el.clicked == true) ? this.off(el) : this.on(el);
		return state;
	},
	on: function(el){
		addClass(el, "toggle_on");
		el.clicked = true;
		return "on";
	},
	off: function(el){
		removeClass(el, "toggle_on");
		el.clicked = false;
		return "off";
	}
});

var ShowFolder = Class.create().extend({
	on: function(el, e){
		var self = this;
		this.folder_menu = Control.show_folder.call(el, e);
		this.folder_menu.onhide = function(){
			self.off(el, e)
		}
	},
	off: function(el, e){
		this.folder_menu && this.hide_menu()
	},
	hide_menu: function(){
		this.folder_menu.hide();
		this.folder_menu = null;
	}
});

var FolderToggle = Class.merge(ToggleBase, ShowFolder);
FolderToggle = new FolderToggle;

var ShowViewmode = Class.create().extend({
	sw: Control.show_viewmode,
	on: function(el, e){
		var self = this;
		this.menu = this.sw.call(el, e);
		this.menu.onhide = function(){
			self.off(el, e)
		}
	},
	off: function(el, e){
		this.menu && this.hide_menu()
	},
	hide_menu: function(){
		this.menu.hide();
		this.menu = null;
	}
});
var ShowSortmode = Class.base(ShowViewmode).extend({sw:Control.show_sortmode});
var ViewmodeToggle = Class.merge(ToggleBase, ShowViewmode);
ViewmodeToggle = new ViewmodeToggle;
var SortmodeToggle = Class.merge(ToggleBase, ShowSortmode);
SortmodeToggle = new SortmodeToggle;



State.show_left = true;

// 未読の記事のキャッシュ
var UnreadCache = new Cache({max : 30});

// 先頭の未読
function get_head(){
	var list = Ordered.list;
	if(!list) return;
	var i = list.indexOfA(function(sid){
		var item = subs_item(sid);
		return (item.unread_count && State.now_reading != item.subscribe_id);
	});
	if(i == -1){return list[0]}
	return list[i] || list[0];
}
// 最後の未読
function get_end(){
	var list = Ordered.list;
	if(!list) return;
	list = list.concat().reverse();
	var i = list.indexOfA(function(sid){
		var item = subs_item(sid);
		return (item.unread_count && State.now_reading != item.subscribe_id);
	});
	if(i == -1){return list[0]}
	return list[i] || list[0];
}
// 次のアイテム
function get_next(){
	var sid = State.now_reading;
	if(!sid && Ordered.list){
		return Ordered.list[0];
	}
	var list = Ordered.list;
	if(!list) return;
	var offset = list.indexOfStr(sid);
	var next = list[offset+1];
	return next;
}
// 前のアイテム
function get_prev(){
	var sid = State.now_reading;
	if(!sid && Ordered.list){
		return Ordered.list[0];
	}
	var list = Ordered.list;
	if(!list) return;
	var offset = list.indexOfStr(sid);
	var prev = list[offset-1];
	return prev;
}

var HTML = {};
HTML.IMG = function(o){
	return '<img src="'+o.src+'">';
}
// Folderを登録する。
FolderList = {};
var TreeView = Class.create();
TreeView.lazy = false;
TreeView.icon_plus = [
	HTML.IMG({src:"/img/icon/m.gif"}),
	HTML.IMG({src:"/img/icon/p.gif"})
];
TreeView.icon_open = [
	HTML.IMG({src:"/img/icon/m.gif"}) + HTML.IMG({src:"/img/icon/open.gif"}),
	HTML.IMG({src:"/img/icon/p.gif"}) + HTML.IMG({src:"/img/icon/close.gif"})
];
TreeView.count = 0;
TreeView.get_control = function(id){
	return TreeView.instance[id]
}
TreeView.instance = {};
TreeView.destroy = function(){
	for(var i=0;i<TreeView.count;i++){
		TreeView.instance["treeview_" + i] = null;
	}
};
TreeView.extend({
	initialize: function(name,value,config){
		var tv = TreeView;
		tv.count++;
		tv.instance["treeview_" + tv.count ] = this;
		var self = this;
		// var Folder = this.constructor;
		var Folder = TreeView;
		this.icon_folder = Folder["icon_open"];
		if(config){
			if(config.icon_type){
				this.icon_folder = Folder["icon_"+config.icon_type]
			}
		}
		this.state = 0;
		this.printed = 0;
		this.generator = value.isFunction ? value: function(){return value};
		this.label_text = name;

		this.element = $N("div",{
				"id"    : "treeview_" + tv.count,
				"class" : "folder_root"
			},[
			this.label = $N("span"),
			this.child = $N("div",{style:"display:none"})
		]);
		this.set_status(name);
		this.label.onclick = this._onclick(tv.count);
		// function(){self.toggle()};
		/*this.element.className = "folder_root";*/
		if(!Folder.lazy){
			this.print( this.generator() );
			this.printed = 1;
		}
	},
	_onclick: function(id){
		return function(){ TreeView.instance["treeview_" + id].toggle() }
	},
	set_status: function(text){
		this.label.innerHTML = (
				(this.state) ? this.icon_folder[0] : this.icon_folder[1]
			) + text;
	},
	print: function(text){
		this.child.innerHTML = text;
	},
	update: function(){
		this.set_status(this.label_text);
	},
	open: function(){
		this.state = 1;
		/* Lazy */
		if(!this.printed){
			this.print( this.generator() );
			this.printed = 1;
		}
		DOM.show(this.child);
		this.update();
	},
	close: function(){
		this.state = 0;
		DOM.hide(this.child);
		this.update();
	},
	toggle: function(){
		this.state ? this.close() : this.open();
	}
});
/*  
  TreeItem
*/
function TreeItem(data){
	this.item = clone(data);
	if(this.item.unread_count == 0){
		this.item.classname = "rs-read"
	} else if(this.item.cached){
		this.item.classname = "ps-prefetched"
	} else {
		this.item.classname = " ";
	}
}
TreeItem.prototype.toString = function(){
	var item = this.item;
	return TreeItem.formatter(item)
}
TreeItem.cache = new Cache;
TreeItem.formatter = Template.get("subscribe_item").compile();


function HTMLView(element){
	this.element = element;
}
HTMLView.prototype = {
	print: function(){
		this.element.innerHTML = Array.from(arguments).join("")
	},
	clear: function(){
		this.element.innerHTML = "";
	},
	append: function(el){
		this.element.appendChild(el)
	}
};
var ListItem = Class.create().extend({
	initialize: function(){
		var self = this;
		this.onhover = function(e){
			var el = this;
			setStyle(el, self.focus_style);
			addClass(el, self.focus_class);
		};
		this.onunhover = function(e){
			var el = this;
			setStyle(el, self.normal_style);
			removeClass(el, self.focus_class);
		}
	}
});

/* 
  MenuItem共通
 */
var MenuItem = new (Class.base(ListItem).extend({
	focus_class  : "menu-focus",
	focus_style  : { },
	normal_style : { }
}));
/*
 PinItem
*/
var PinItem = new (Class.base(ListItem).extend({
	focus_class  : "pin-focus",
	focus_style  : { },
	normal_style : { }
}));
/*
 Subscribe item
*/
var SubsItem = new (Class.base(ListItem).extend({
	focus_class  : "fs-focus",
	focus_style  : { },
	normal_style : { }
}));


/* フィードの追加 */
function feed_discover(url){
	var api = new API("/api/feed/discover");
	api.post({url:url}, print_discover);
}
function feed_subscribe(feedlink,callback){
	var api = new API("/api/feed/subscribe");
	callback = callback || Function.empty;
	api.post({feedlink:feedlink},function(res){
		message("Subscription completed");
		callback(res);
		subs.update(true);
	})
}
function feed_unsubscribe(sid, callback){
	var api = new API("/api/feed/unsubscribe");
	callback = callback || Function.empty;
	api.post({subscribe_id:sid},function(res){
		message("購読停止しました");
		callback(res);
		subs.update(true);
	});
}

/*
 
*/
Class.Traits["view"] = {
	initialize: function(element){
		this.element = $(element);
	},
	print: function(v){
		isElement(v)
			?  this.element.appendChild(v)
			: (this.element.innerHTML = v)
	},
	clear: function(){ this.print("") },
	setClass: function(v){
		this.element.className = v;
	},
	addClass: function(v){
		addClass(this.element,v)
	},
	removeClass: function(v){
		removeClass(this.element,v)
	}
};
Class.Traits["controller"] = {
	initialize: function(o){
		this.view  = o.view;
		this.model = o.model;
	}
};

function alert_once(v){
	if(alert_once.alerted) return;
	alert(v);
	alert_once.alerted = 1;
}


/*************************************************
   購読リストの整形。Subsの絞込みや、整形
 *************************************************/
Subscribe = {};
// Template
Subscribe.Template = {
	item   : Template.get("subscribe_item"),
	folder : Template.get("subscribe_folder")
};

/*
 絞り込んだリスト
*/
Subscribe.Collection = Class.create().extend({
	initialize: function(list){ this.list = list },
	isCollection : true,
	get_list : function(){return this.list},
	get_unread_count: function(){
		return this.list.sum_of("unread_count")
	}
});
// 複数のデータをロードしてもアイテムのデータを共通化する
Subscribe.Items = function(id, data){
	if(!data){
		return Subscribe.Items["_"+id]
	} else {
		return Subscribe.Items["_"+id] = data;
	}
}
var subs_item = Subscribe.Items;

Subscribe.Model = Class.create().extend({
	initialize: function(){
		this.loaded = false;
		return this;
	},
	id2subs : null,
	limited : null,
	folder_count  : null,
	folder_unread : null,
	folder_names  : null,
	load : function(list){
		this.load_start();
		this.load_partial_data(list);
		this.load_data(list);
	},
	load_data: function(list){
		this.loaded = true;
		this.list = list;
		this.generate_cache();
	},
	load_start: function(){
		this.id2subs = {};
		this.folder_count = {};
		this.folder_names = [];
		this.rate2subs = {};
		this.rate_names = [5,4,3,2,1,0];
		this.max_subs = 0;
		this.min_subs = Number.POSITIVE_INFINITY;
		this.unread_count_cache = 0;
		this.unread_feeds_count_cache = 0;
	},
	load_partial_data: function(list){
		this._generate_cache(list);
	},
	get_list: function(){
		if(Config.use_limit_subs && Config.limit_subs){
			return this.list.slice(0, Config.limit_subs)
		} else {
			return this.list
		}
	},
	generate_cache: function(){
		this.folder_names = keys(this.folder_count);
		this.make_subscribers_names();
		return;
	},
	// partial
	_generate_cache: function(list){
		function push(obj,key,value){
			if(obj[key]){
				obj[key].push(value)
			} else {
				obj[key] = [value]
			}
		}
		var self = this;
		foreach(list, function(v){
			subs_item(v.subscribe_id, v);
			self.id2subs[v.subscribe_id] = v;
			push(self.rate2subs, v.rate, v);
			var t = self.folder_count[v.folder];
			self.folder_count[v.folder] = t ? t + 1 : 1;
			self.max_subs = Math.max(self.max_subs, v.subscribers_count);
			self.min_subs = Math.min(self.min_subs, v.subscribers_count);
			if(v.unread_count){
				self.unread_feeds_count_cache += 1;
			}
		});
		this.unread_count_cache += list.sum_of("unread_count");
		//alert_once(this.unread_feeds_count_cache);
	},
	make_domain_names: function(){
		function get_domain(url){
			var start = url.indexOf('//') + 2;
			var end   = url.indexOf('/', start);
			if(end == -1) end = url.length;
			return url.slice(start,end);
		}
		var domains = {};
		var domain_count = {};
		var domain_names = {};
		var domain2subs = {};
		foreach(this.list, function(v){
			var d = v.raw_domain;
			var c = d.split(".");
			var l = c.length - 1;
			for(var i=0;i<l;i++){
				var tmp = c.slice(i).join(".");
				if(domain_count[tmp] > 1 || i == l-1){
					v.domain = tmp;
					domain_names[tmp] = domain_names[tmp] ? domain_names[tmp]+1 : 1;
					push(domain2subs,tmp,v);
					return;
				}
			}
		});
		foreach(this.list, function(v){
			if(v.feedlink){
				var d = get_domain(v.feedlink);
				v.raw_domain = d;
				var c = d.split(".");
				c.length.times(function(i){
					if(i == 1) return;
					var v = c.slice(-i).join(".");
					domain_count[v] = domain_count[v] ? domain_count[v]+1 : 1;
				})
			}
		});
		this.domain_names = keys(domain_names);
		this.domain_count = domain_names;
		this.domain2subs  = domain2subs;
	},
	make_subscribers_names: function(){
		var len = this.list.length;
		var split = 6;
		var limit = this.list.length / split;
		var subs_counts = this.list.pluck("subscribers_count");
		subs_counts.sort(function(a,b){
			return(
				a == b ?  0 :
				a >  b ?  1 : -1
			)
		});
		//alert(subs_counts);
		var res = [];
		var pos = 0;
		var begin = this.min_subs;
		subs_counts.forEach(function(v){
			if(pos > limit){
				var end = Math.max(begin+1,v);
				res.push(begin + "-" + end);
				begin = end + 1;
				pos = 0;
			}
			pos++;
		});
		res.push(begin + "-" + Math.max(begin+1, this.max_subs) );
		this.subscribers_names = res.reverse();
		return res;
	},
	// 任意フィルタ
	filter: function(callback){
		var filtered = this.list.filter(callback);
		return new Subscribe.Collection(filtered)
	},
	get_folder_names: function(){
		if(this.folder_names) return this.folder_names;
	},
	get_rate_names: function(){
		if(this.rate_names) return this.rate_names;
	},
	get_subscribers_names: function(){
		if(this.subscribers_names){
			// 多い順で保存されている。
			if(Config.sort_mode == "subscribers_count:reverse"){
				return this.subscribers_names.concat().reverse();
			} else {
				return this.subscribers_names;
			}
		}
	},
	get_domain_names: function(){
		if(this.domain_names) return this.domain_names;
	},
	get_by_id: function(id){
		return this.id2subs[id]
	},
	get_by_folder: function(name){
		var filtered = this.get_list().filter_by("folder",name)
		return new Subscribe.Collection(filtered)
	},
	get_by_rate: function(num){
		var filtered = this.get_list().filter_by("rate",num);
		// filtered = this.rate2subs[num] || [];
		return new Subscribe.Collection(filtered)
	},
	get_by_subscribers_count: function(min,max){
		var filtered = this.get_list().filter(function(item){
			var c = item.subscribers_count;
			return (c >= min && c <= max);
		});
		return new Subscribe.Collection(filtered)
	},
	get_by_domain: function(domain){
		var filtered = this.domain2subs[domain] || [];
		return new Subscribe.Collection(filtered)
	},
	get_unread_feeds: function(){
		return this.filter(function(item){return item.unread_count > 0}).list;
	},
	get_unread_feeds_count: function(){
		if(this.unread_feeds_count_cache){
			return this.unread_feeds_count_cache;
		} else {
			return 0;
			return this.unread_feeds_count_cache = this.get_unread_feeds().length;
		}
	},
	get_unread_count: function(){
		if(this.unread_count_cache){
			return this.unread_count_cache
		} else {
			return this.unread_count_cache = this.list.sum_of("unread_count");
		}
	}
});

Subscribe.Formatter = {
	item: function(v){ return new TreeItem(v) },
	flat: function(model){
		return model.get_list().map(SF.item).join("");
	},
	folder: function(model){
		var folder_names = model.get_folder_names();
		var folders = folder_names.map(function(v){
			var filtered = model.get_by_folder(v);
			var param = {
				name : v,
				unread_count : filtered.get_unread_count()
			};
			var folder = new TreeView(
				ST.folder.fill(param),
				SF.flat.curry(filtered)
			);
			folder.param = param;
			return folder;
		});
		var sep = folders.partition(function(v){return v.param.name == ""});
		var root   = sep[0];
		var folder = sep[1];
		if(root[0]) root[0].open();
		return $DF(
			root.pluck("child").toDF(),
			folder.pluck("element").toDF()
		)
	},
	rate: function(model){
		var rate_names = model.get_rate_names();
		var rates = rate_names.map(function(v){
			var filtered = model.get_by_rate(v);
			var hosi = HTML.IMG({src:Rate.image_path + v + ".gif"});
			var param = {
				name : hosi,
				unread_count : filtered.get_unread_count(),
				feed_count : filtered.list.length
			};
			var folder = new TreeView(
				ST.folder.fill(param),
				SF.flat.curry(filtered),
				{ icon_type : "plus" }
			);
			folder.param = param;
			return folder;
		});
		if(Config.show_all){
			return rates.pluck("element").toDF()
		} else {
			return rates.filter(
				function(v){ return v.param.feed_count > 0 }
			).pluck("element").toDF();
		}
	},
	subscribers: function(model){
		var names = model.get_subscribers_names();
		var subscribers = names.map(function(v){
			var tmp = v.split("-");
			var max = Math.max(tmp[0],tmp[1]);
			var min = Math.min(tmp[0],tmp[1]);
			var filtered = model.get_by_subscribers_count(min,max);
			var param = {
				name : min + " - " + max + " " + tl('users'),
				unread_count : filtered.get_unread_count()
			};
			var folder = new TreeView(
				ST.folder.fill(param),
				SF.flat.curry(filtered)
			);
			folder.param = param;
			return folder;
		});
		if(Config.show_all){
			return subscribers.pluck("element").toDF()
		} else {
			return subscribers.filter(
				function(v){ return v.param.unread_count > 0 }
			).pluck("element").toDF();
		}
	},
	domain: function(model){
		var folder_names = model.get_domain_names();
		var root_items = {list:[]};
		var folders = [];
		folder_names.forEach(function(v){
			if(model.domain_count[v] < 2){
				var filtered = model.get_by_domain(v);
				filtered.list.forEach(function(v){
					root_items.list.push(v);
				});
				return;
			}
			var filtered = model.get_by_domain(v);
			var img = filtered.list.pluck("icon").mode();
			var favicon  = HTML.IMG({src:img});
			var param = {
				name :  favicon +" "+ v,
				unread_count : filtered.get_unread_count()
			};
			var folder = new TreeView(
				ST.folder.fill(param),
				SF.flat.curry(filtered),
				{ icon_type : "plus" }
			);
			folder.param = param;
			folders.push(folder);
		});
		var param = {
			name : " *"
		};
		var root = new TreeView(
			ST.folder.fill(param),
			SF.flat.curry(root_items),
			{ icon_type : "plus" }
		);
		return $DF(
			root.element,
			folders.pluck("element").toDF()
		)
	}
};

LDR_VARS.USE_PARTIAL_LOAD = true;
Subscribe.View = Class.create("view");
Subscribe.Controller = Class.create("controller").extend({
	loaded : false,
	readyState: 0,
	filter : null,
	_update: function(reload_flag){
		var self = this;
		if(this.loaded && !reload_flag){
			this.show();
			update("total_unread_count");
		} else {
			State.subs_reloading = true;
			invoke_hook('BEFORE_SUBS_LOAD');
			new API("/api/subs?unread="+(Config.show_all ? 0 : 1)).post({},
			function(list){
				self.loaded = true;
				State.subs_reloading = false;
				self.model.load(list);
				self.sort();
				self.update();
				invoke_hook('AFTER_SUBS_LOAD');
			});
		}
	},
	update: function(reload_flag){
		if(!LDR_VARS.USE_PARTIAL_LOAD){
			return this._update.apply(this, arguments);
		}
		var self = this;
		if((!reload_flag && this.loaded) || this.readyState >= 3){
			this.show();
			update("total_unread_count");
		} else {
			self.readyState = 0;
			if(State.subs_loader){
				State.subs_loader.cancel();
			}
			State.subs_reloading = true;
			State.load_progress = true;
			State.subs_loader = {
				cancel: function(){
					message("Aborted.");
					canceled = true;
				}
			};
			invoke_hook('BEFORE_SUBS_LOAD');
			self.model.load_start();
			var canceled = false;
			var from_id = 0;
			var is_first = 1;
			var allways_flush = 1;
			var writed = 0;
			var limit1 = LDR_VARS.SubsLimit1; // 100;
			var limit2 = LDR_VARS.SubsLimit2; // 200;
			var limit = limit1;
			var list = [];
			var count = 0;
			var load_request = function(){
				limit = is_first ? limit1 : limit2;
				is_first = 0;
				var api = new API([
					"/api/subs?",
					"unread=", (Config.show_all ? 0 : 1),
					"&from_id=", from_id,
					"&limit=", limit
				].join(""));
				api.post({},onload);
			};
			var onload = function(tmp){
				if(canceled) return;
				self.readyState = 3;
				list = list.concat(tmp);
				if(from_id == 0 || allways_flush){
					flush(list);
				}
				if(tmp.length < limit){
					self.model.load_partial_data(tmp);
					load_complete();
				// for compatible servers (ex:PlaggerLDR)
				} else if(tmp.length > limit){
					self.model.load_partial_data(tmp);
					load_complete();
				} else {
					self.model.load_partial_data(tmp);
					from_id = tmp[tmp.length-1].subscribe_id + 1;
					update('total_unread_count');
					count+=limit;
					load_request();
					message(tl('Loading .. ') + (count+1) + " - " + (count+limit));
				}
			};
			var flush = function(list){
				self.model.load_data(list);
				self.sort();
				self.show();
				writed = 1;
			};
			var load_complete = function(){
				self.readyState = 4;
				self.loaded = true;
				State.load_progress = false;
				State.subs_reloading = false;
				State.subs_loader = null;
				//if(!writed){
					self.model.load_data(list);
					self.sort();
					self.update();
				//} else {
				//	update("total_unread_count");
				//}
				invoke_hook('AFTER_SUBS_LOAD');
				message('Loading completed.');
				setTimeout(function(){self.readyState=0},3000);
			};
			self.readyState = 1;
			load_request();
		}
	},
	add_filter: function(q){
		var filter = function(item){
			return contain(item.title,q)
		};
		this.filter = function(model){
			return model.filter(filter)
		}
	},
	sort: function(){
		var tmp = Config.sort_mode.split(':');
		var key = tmp[0];
		var option = tmp[1];
		this.model.list.sort_by(key);
		if(option == "reverse")
			this.model.list.reverse();
		// folderをソート
		if(key == "title"){
			this.model.folder_names.sort();
		}
	},
	show: function(){
		if(this.filter){
			var mode = "flat";
			var data = this.filter(this.model);
		} else {
			var mode = Config.view_mode;
			var data = this.model;
		}
		this.view.clear();
		this.view.setClass(mode);
		this.view.print( SF[mode](data) );
		$("subs_container").scrollLeft = 0;
		if(State.now_reading){
			set_focus(State.now_reading)
		}
		this.update_order()
	},
	update_order: function(array){
		if(array){
			Ordered.list = array;
			return;
		}
		var domlist = this.view.element.getElementsByTagName("span");
		Ordered.list = [];
		foreach(domlist,function(el){
			var sid = el.getAttribute("subscribe_id");
			sid && Ordered.list.push(sid)
		});
	},
	find: function(q){
		var self = this;
		if(q == ""){
			this.filter = null;
			this.show();
		} else {
			this.add_filter(q)
			this.show();
		}
	},
	get_by_id : delegator("model","get_by_id")
});

var SF = Subscribe.Formatter;
var ST = Subscribe.Template;
var SC = Subscribe.Controler;


/* Filter */
var Filter = {};
Filter.paddingLeft = function(str){ return function(v){ return v ? str + v : "" } };
Filter.sandwich    = function(l,r){ return function(v){ return v ? l+v+r : "" } };
//
Filter.author = Filter.paddingLeft("by ");
Filter.created_on = function(v){return Filter.paddingLeft("投稿: ")(Filter.toDate(v))};
Filter.modified_on = function(v){return Filter.paddingLeft(" | 更新: ")(Filter.toDate(v))};
Filter.toDate = function(v){ return v ? new DateTime(v*1000).toString() : "" };
Filter.toRelativeDate = function(v){return NowDate.rel( new DateTime(v*1000) );};
Filter.enclosure = function(v,k,tmpl){
	if(!v) return "";
	var t = tmpl.get_param("enclosure_type") || "";
	return '<a href="'+v+'">'+"DL : "+t+'</a>'
}
Filter.category = function(v,k,tmpl){
	if(!v) return "";
	return v.split(" ").join("&nbsp;");
}



var NowDate;


/****************************************************
  フィードの整形
 ***************************************************/

Feed = {};
Feed.Formatter = {
	channel : {
		image: function(src){
			if(!src){ return "" }
			return [
				'<img class="channel_image"',
				' style="visibility:hidden"',
				' src="/img/alpha/alpha_01.png"',
				' onload="swap_channel_image(this,\''+src+'\');',
				'Util.style.visible(this)"',
				'>'
			].join("")
		}
	}
};
var FF = Feed.Formatter;

/*
 画面サイズに合わせる
*/
MakeUpdater("style");

style_updater("left_container", function(){
	setStyle(this,{
		display : State.show_left ? "block": "none",
		width   : State.leftpane_width   + "px",
		height  : State.container_height + "px"
	});
}._try());

style_updater("subs_container", function(){
	var h = State.container_height - $("subs_tools").offsetHeight;
	setStyle(this,{
		display : State.show_left ? "block": "none",
		width   : State.leftpane_width + "px",
		height  : h + "px"
	})
}._try());

style_updater("right_container", function(){
	var border_w = 2;
	setStyle(this,{
		 height : State.container_height + "px",
		 width  : document.body.offsetWidth - State.leftpane_width - border_w + "px"
	});
}._try());


function fit_screen(){
	var leftpane_width = State.leftpane_width;
	if(State.fullscreen) return fit_fullscreen();
	var body_h = document.body.offsetHeight;
	var top_padding    = $("container").offsetTop;
	var bottom_padding = $("footer").offsetHeight - 20;
	if(browser.isMac && browser.isFirefox){
		bottom_padding += 20;
	}
	var ch = body_h - top_padding - bottom_padding - 4;
	State.container_height = ch;
	style_update(/container/);
}

function fit_fullscreen(){
	var body_h = document.body.offsetHeight;
	var top_padding = $("container").offsetTop;
	State.container_height = body_h - top_padding + 16;
	style_update(/container/);
}

function has_attr(id){
	return function(target){
		return this.getAttribute(id)
	}
}
function get_attr(id){
	return function(target){
		target = target || this;
		return target.getAttribute(id)
	}
}

var has_subscribe_id = has_attr("subscribe_id");


Channel = {};

var finder;
function Finder(id){
	this.input = $(id);
	this.enable = true;
	this.callback = [];
	this.input.style.color = "#444";
	var self = this;
	var old = "";
	setInterval(function(){
		var q = self.input.value;
		if(old != q){
			old = q;
			self.callback.forEach(function(c){c(q)});
		}
	}, 600);
}
Finder.prototype = {
	add_callback: function(callback){
		this.callback.push(callback)
	},
	clear: function(){
		this.input.value = ""
	},
	focus: function(){
		this.input.focus();
	}
};

// input要素にキーバインドを効かせる。
// printableな場合は実行しない
function hotkey_filter(e){
	var el  = (e.target || e.srcElement);
	var tag = el.tagName;
	var id  = el.id;
	if(id == "finder"){
		if(HotKey.isPrintable(e)) return false;
		if(HotKey.getChar(e) == 'delete') return false;
	}
	return true;
}
function find_from(key){
	return function(v){
		return v[key].indexOf(this) != -1
	}
}


var show_tips = function(){
	show_tips.count ++;
	if(show_tips.count > 10){
		$("loadicon").src = show_tips.icon;
		message(show_tips.text);
		show_tips.count = 0;
	}
};
show_tips.icon = "/img/icon/rest3.gif";
show_tips.text = 'なんかようか？';
show_tips.count = 0;


var LoadEffect = {
	ICON_PATH : "/img/icon/",
	LOADICON_NUM : 1,
	RESTICON_NUM : 3,
	Start : function(){
		var L = LoadEffect;
		var path = L.ICON_PATH;
		if(L.LOADICON_NUM > 1){
			var n = 1 + Math.floor(Math.rand(L.LOADICON_NUM));
			path += "loading" + n + ".gif";
		} else {
			path += "loading.gif";
		}
		$("loadicon").src = path;
		setStyle("loading",{visibility:"visible"})
	},
	Stop : function(){
		var L = LoadEffect;
		var path = L.ICON_PATH;
		if(L.RESTICON_NUM > 1){
			var n = 1 + Math.floor(Math.rand(L.RESTICON_NUM));
			path += "rest" + n + ".gif";
		} else {
			path += "rest.gif";
		}
		$("loadicon").src = path;
	}
};

/*
 初期化処理
*/
function init(){
	if(initialized) return;
	initialized = true;
	setup_hook();
	invoke_hook('BEFORE_INIT');
	window.onerror = function(a,b,c){
		$("message").innerHTML = [a,b,c];
		return false;
	}

	State.leftpane_width = LDR_VARS.LeftpaneWidth;

	DOM.show("container");
	DOM.show("footer");
	fit_screen();
	DOM.show("right_container");

	API.registerCallback({
		Create  : LoadEffect.Start,
		Complete: LoadEffect.Stop
	});

	
	subs = new Subscribe.Controller({
		model : new Subscribe.Model,
		view  : new Subscribe.View("subs_body")
	})

	finder = new Finder("finder");
	finder.clear();
	finder.add_callback(function(q){
		if(!q){
			return subs.find("");
		}
		var query;
		if(typeof Roma == "function"){
			var roma = new Roma();
			try{
				query = new RegExp(roma.toRegExp(q),"i");
			} catch(e){
				query = q;
			}
		} else {
			try{
				query = new RegExp(q, "i");
			} catch(e){
				query = q;
			}
		}
		subs.find(query)
	});

	setup_event();
	setup_hotkey();

	// ajaxize
	ajaxize("discover_form",{
		before:function(){
			var output = $("discover_items");
			output.innerHTML = [
				'<div class="discover_loading">',
				'<img src="/img/icon/loading.gif">　',
				getText("print_discover_loading"),
				'</div>'
			].join("");
			return true;
		},
		after: print_discover
	});
	
	(function(){
		load_content();
		invoke_hook('BEFORE_CONFIGLOAD');
		Config.load(function(){
			invoke_hook('AFTER_CONFIGLOAD');
			subs.update();
		});
	}).later(10)();
	invoke_hook('AFTER_INIT');
}

function print_discover(list){
	var output = $("discover_items");
	var sub   = Template.get("discover_select_sub").compile()
	var unsub = Template.get("discover_select_unsub").compile()
	if(list.length == 0){
		output.innerHTML = [
			'<div class="discover_loading"><img src="/img/icon/orz.gif">　',
			getText('print_discover_notfound'),
			'</div>'
		].join("");
	} else {
		var seen = {};
		var uniq_list = [];
		list.sort_by("subscribers_count");
		list.forEach(function(item){
			if(!seen[item.feedlink]){
				uniq_list.push(item);
				seen[item.feedlink] = true;
			}
		});
		output.innerHTML = uniq_list.map(function(item){
			var users = item.subscribers_count == 1 ? "user" : "users";
			if(item.subscribe_id){
				feedlink2id[item.feedlink] = item.subscribe_id;
				return unsub(item,{users: users});
			} else {
				return sub(item,{users: users})
			}
		}).join("");
	}
}


function set_focus(id){
	var el = $("subs_item_"+id);
	if(State.last_element){
		removeClass(State.last_element, "fs-reading");
		touch(State.last_id, "onclose");
	}
	if(el){
		State.last_element = el;
		State.last_id = id;
		switchClass(el, "fs-reading");
		if(Config.view_mode != "flat"){
			var tvroot = QueryCSS.findParent(function(){
				return /^treeview/.test(this.id)
			},el);
			tv = TreeView.get_control(tvroot.id);
			tv && tv.open()
		}
		var sc = $("subs_container");
		sc.scrollTop = el.offsetTop - $("subs_container").offsetTop - 64;
		sc.scrollLeft = 0;
	}
	// window.status = "sid = " + id;
}


function get_folders(callback){
	var api = new API("/api/folders");
	api.post({},function(json){
		folder = json;
		folder.id2name = {};
		for(var key in folder.name2id){
			folder.id2name[folder.name2id[key]] = key;
		}
		callback();
	})
};

function QueryCSS(){}
QueryCSS.findParent = function(rule,element){
	elememt = $(element);
	if(!isFunction(rule)){
		rule = rule.isQueryCSS ? rule : new QueryCSS(rule).match;
	}
	var current = element;
	while(current = current.parentNode){
		if(rule.call(current)) return current;
	}
	return false;
}
/*
 先頭の記事を読み込む
*/
function get_first(id,callback){
	State.viewrange.start = 0;
	State.has_next = true;
	if(get_unread.cache.has(id)){
		var cached_data = get_unread.cache.get(id);
		// 読み込み中
		if(cached_data == "prefetch"){
			setTimeout(arguments.callee.curry(id,callback), 10);
			return
		}
		print_feed.next(callback)(cached_data);
		set_focus(id);
		return;
	} else {
		var api = new API("/api/all");
		set_focus(id)
		api.post({
			 subscribe_id : id,
			 offset : 0,
			 limit  : 1
		}, function(data){
			get_unread.cache.set(id,data);
			print_feed.next(callback)(data);
		});
	}
}
/*
 未読の記事を読み込む
*/
LDR_VARS.PrefetchTimeout = 2000;
LDR_VARS.LockTimeout = 2000;
function get_unread(id,callback){
	State.viewrange.start = 0;
	State.has_next = true;
	var api_url = '/api/unread';
	function has_cache(){
		var cached_data = get_unread.cache.get(id);
		if(cached_data == "prefetch"){
			var start = new Date - 0;
			var retry = function(){
				var now = new Date - 0;
				var cached_data = get_unread.cache.get(id);
				if(cached_data != "prefetch"){
					loaded(cached_data);
				} else if(now - start > LDR_VARS.PrefetchTimeout){
					// console.log('prefetch_timeout');
					prefetch_timeout();
				} else {
					retry();
				}
			}.later(100);
			retry();
			return;
		}
		function loaded(cached_data){
			print_feed.next(callback)(cached_data);
			set_focus(id);
		}
		loaded(cached_data);
	}
	function no_cache(){
		var api = new API(api_url);
		var success = false;
		set_focus(id)
		api.post({ subscribe_id : id }, function(data){
			success = true;
			get_unread.cache.set(id,data);
			print_feed.next(callback)(data);
		});
		// release lock
		setTimeout(function(){
			if(!success){State.requested = false}
		}, LDR_VARS.LockTimeout);
	}
	function prefetch_timeout(){
		// unlock
		State.requested = false;
		api_url = '/api/unread?timeout';
		no_cache();
	}
	get_unread.cache.has(id) ? has_cache() : no_cache();
}
get_unread.cache = new Cache({max:50});

function move_to(sid,to,callback){
	var api = new API("/api/feed/move");
	api.post({
		subscribe_id : sid,
		to : to
	},callback)
}



var Util = {
	image:{},
	style:{}
};
Util.image.maxsize = function(w,h){
	var ow = this.width;
	var oh = this.height;
	var rw = ow;
	var rh = oh;
	if(ow > w){
		rw = w;
		rh = oh * (w / ow);
	}
	if(rh > h){
		rw = rw * (h / rh);
		rh = h;
	};
	this.width = rw;
	this.height = rh;
};
Util.style.visible = function(el){
	setStyle(el,{visibility:"visible"})
}
function swap_channel_image(el,src){
	el.onload = null;
	var img = new Image();
	var swap = function(){ 
		Util.image.maxsize.call(img,200,50);
		el.width  = img.width;
		el.height = img.height;
		el.src = src;
	};
	img.src = src;
	if(img.complete){
		swap()
	} else {
		img.onload = swap;
	}
}

function get_domain(url){
	var m = (url+'/').match(get_domain.reg);
	return m ? m[1] : "";
}
get_domain.reg = /https?:\/\/([^\/]*?)\//;


var ItemFormatter = Class.create();
ItemFormatter.TMPL = Template.get("inbox_items");
ItemFormatter.extend({
	initialize: function(){
		this.tmpl = new Template(ItemFormatter.TMPL);
		var filters = {
			created_on  : Filter.created_on,
			modified_on : Filter.modified_on,
			author      : Filter.author,
			enclosure   : Filter.enclosure,
			category    : Filter.category
		};
		this.tmpl.add_filters(filters);
	},
	compile: function(){
		return this.tmpl.compile();
	},
	reset_count: function(){
		this.item_count = 0;
	}
});
var FeedFormatter = Class.create();
FeedFormatter.TMPL = Template.get("inbox_feed");
FeedFormatter.TMPL_ADS = Template.get("inbox_adfeeds");
FeedFormatter.extend({
	initialize: function(opt){
		if(opt && opt.ads){
			this.tmpl = new Template(FeedFormatter.TMPL_ADS);
		} else {
			this.tmpl = new Template(FeedFormatter.TMPL);
		}
		var feed_filter = {
			image : FF.channel.image,
			folder: function(v){
				return v ? v.ry(8,"...") : tl('Uncategolized')
			}
		};
		this.tmpl.add_filters(feed_filter);
	},
	compile: function(){
		return this.tmpl.compile()
	}
});

var LDRWidgets = Class.create();
LDRWidgets.extend({
	initialize: function(){
		this.widgets = [];
		this.sep = " | ";
	},
	add: function(name, generator, description){
		this.widgets.push({
			name: name,
			generator: generator,
			description: description || ''
		})
	},
	remove: function(name){
		this.widgets = this.widgets.reject(function(v){
			return v.name == name
		})
	},
	process: function(){
		var args = arguments;
		return this.widgets.map(function(w){
			var result;
			try{
				result = w.generator.apply(null, args);
			} catch(e){
				result = e;
			}
			return result ? '<span class="widget widget_'+ w.name +'" title="' + w.description + '">'+result+'</span>' : "";
		}).filter(function(v){return v}).join(this.sep);
	}
});

var entry_widgets = new LDRWidgets;
var channel_widgets = new LDRWidgets;

function print_feed(feed){
	invoke_hook('BEFORE_PRINTFEED', feed);
	var subscribe_id = feed.subscribe_id;

	State.last_feed = feed;
	State.last_items = {};
	State.requested = false;
	State.now_reading = subscribe_id;

	var Now = (new Date - 0)/1000;
	var output = $(print_feed.target);
	var channel = feed.channel;
	var items = feed.items;
	if(Config.reverse_mode){
		items = items.concat().reverse();
	}
	if(Config.max_view){
		if(Config.max_view < items.length)
		items = items.slice(0, Math.max(1,Config.max_view));
	}
	var item_formatter = new ItemFormatter().compile();
	var ads_expire = null;
	if(feed.ad){
		var feed_formatter = new FeedFormatter({ads:1}).compile();
		ads_expire = Math.max(1, Math.ceil((feed.ad.expires_on - Now) / (24 * 60 * 60)));
	} else {
		var feed_formatter = new FeedFormatter().compile();
	}
	var item_count = 0;
	var item_f = function(v){
		item_count++;
		State.last_items["_"+v.id] = v;
		var widgets = entry_widgets.process(feed, v);
		return item_formatter(v,{
			relative_date : (v.created_on) ? (Now-v.created_on).toRelativeDate() : tl('Unknown date'),
			item_count    : item_count,
			widgets       : widgets,
			pin_active    : pin.has(v.link) ? "pin_active" : "",
			pinned        : pin.has(v.link) ? "pinned" : "",
			loop_context  : [
				(item_count == 1) ? "first" : "",
				(item_count %  2) ? "odd" : "even",
				(item_count == size) ? "last" : "",
				(item_count != 1 && item_count != size) ? "inner" : ""
			].join(" ")
		});
		
	};

	var subscribe_info = subs_item(subscribe_id);
	var size = items.length;
	State.viewrange.end = State.viewrange.start + size;

	var first_write_num = LDR_VARS.PrintFeedFirstNum;
	var widgets = channel_widgets.process(feed, items);
	output.innerHTML = feed_formatter(
		feed, channel, subscribe_info, {
			ads_expire : ads_expire,
			widgets: widgets,
			items : function(){
				return items.slice(0, first_write_num).map(item_f).join("")
			}
		}
	);
	fix_linktarget();

	State.writer && State.writer.cancel();
	State.writer2 && State.writer2.cancel();
	function DIV(text){
		var div = document.createElement("div");
		div.innerHTML = text;
		fix_linktarget(div);
		return div;
	}

	// 遅延描画
	function push_item(){
		var num    = LDR_VARS.PrintFeedNum;
		var delay  = LDR_VARS.PrintFeedDelay;
		var delay2 = LDR_VARS.PrintFeedDelay2;
		
		var writer = function(){
			var remain_items = items.slice(writed,writed + num).map(item_f).join("");
			writed += num
			if(more.className){
				more.className = "hide";
				more.innerHTML = "";
			}
			State.writer2 = (function(){
				more.appendChild(DIV(remain_items))
				more.className = "";
			}).later(10)();
			if(writed < size){
				State.writer = writer.later(delay2)();
			}
		};
		State.writer = writer.later(delay)();
	}
	if(items.length > first_write_num){
		var more = $N("div",{"class":"more"});
		more.innerHTML = "描画中";
		output.appendChild(more);
		var writed = first_write_num;
		push_item();
	}

	Control.scroll_top();
	Control.del_scroll_padding();
	touch(State.now_reading, "onload");
	print_feed.target = "right_body";
	invoke_hook('AFTER_PRINTFEED', feed);
}

// update paging
register_hook('AFTER_PRINTFEED', function(feed){
	if(feed.ad){
		[
			"right_bottom_navi","right_top_navi","feed_next","feed_prev"
		].forEach(function(id){
			var el = $(id);
			if(el)el.innerHTML = "";
		});
		$("feed_paging").style.display = "none";
	} else {
		$("feed_paging").style.display = "block";
		update(
			"right_bottom_navi",
			"right_top_navi",
			"feed_next",
			"feed_prev"
		);
	}
});


function rewrite_feed(){
	if(State.last_feed){
		print_feed(State.last_feed);
	}
}

print_feed.target = "right_body";
var base_target = "_blank";

function fix_linktarget(el){
	el = el || $(print_feed.target);
	foreach(el.getElementsByTagName("a"),
		function(a){
			a.target != "_self" && (a.target = base_target)
		}
	);
}

var get_action = get_attr("_action");
var Actions = {
	load: function(){}
};
var Callbacks = {};

var Element = {
	show: function(el){
		if(el) el.style.display = "block"
	}.forEachArgs($),
	hide: function(el){
		if(el) el.style.display = "none"
	}.forEachArgs($),
	toggle: function(el){
		el = $(el);
		el.style.display = (el.style.display != "block") ? "block" : "none";
	},
	childOf: function(){},
	getStyle : getStyle
};


/* 中止処理 */
window.stop = window.stop || function(){
	document.execCommand("Stop")
};

// delete _XMLHttpRequest;
function check_xmlhttp(){
	if(typeof _XMLHttpRequest == "undefined"){
		update("error_window");
		window.onload = null;
	}
}
check_xmlhttp();

function init_manage(){
	if(State.guest_mode){
		message('この機能は使えません');
		return;
	}
	switchClass("right_container","mode-manage");
	ahah("/manage/index.txt","right_body",function(){
		get_folders(function(){
			update("manage_item");
			update("manage_folder");
		});
	});
}

function init_config(){
	ahah("/contents/config", "right_body", function(){
		switchClass("right_container", "mode-config");
		Control.scroll_top();
		Form.fill("config_form", Config);
		ajaxize("config_form",{
			before: function(){return true},
			after: function(res,req){
				message("Your settings have been saved");
				typecast_config(req);
				Object.extend(Config, req);
			}
		});
		TabClick.call($("tab_config_basic"));
		invoke_hook('AFTER_INIT_CONFIG');
	});
}
function init_guide(){
	ahah("/contents/guide", "right_body", function(){
		switchClass("right_container", "mode-guide");
		Control.scroll_top();
		invoke_hook('AFTER_INIT_GUIDE');
	});
}


var default_right_init = init_guide;

function load_content(){
	var q = location.href;
	var o = q.indexOf("#")+1;
	if(!o){
		default_right_init();
		return
	}
	var param = q.slice(o);
	if(window["init_" + param]){
		window["init_" + param]()
	} else {
		default_right_init()
	}
}



// ------------------------------
// END OF reader_main.js
// ------------------------------

// ------------------------------
// reader_manage.js : 2007-07-02T12:18:14
// ------------------------------


// manage

updater("manage_item", function(){
	if(!Manage.Item.loaded){
		Manage.Item.load();
		return;
	}
	var data = Manage.Item.get_items();
	var tmpl = Template.get("man_items").compile();
	var now = new Date / 1000;
	var fmt = function(item){
		var sid = item.subscribe_id;
		item = subs_item(sid);
		var classname = TRSelector.cart.has(sid) ? "selected" : "";
		return tmpl(item, {
			update : (now - item.modified_on).toRelativeDate(),
			notify_text: item.ignore_notify ? "無効" : "有効",
			classname : classname
		})
	}
	var param = {};
	param["sortmode_"+MI.sort_mode] = "selected";
	this.innerHTML = [
		Template.get("man_item_header").fill({
			has_prev : Manage.Item.has_prev() ? "" : "disable",
			has_next : Manage.Item.has_next() ? "" : "disable"
		},param),
		data.list.slice(MI.offset, MI.offset + MI.perpage).map(fmt).join(""),
		"</table></div>"
	].join("");
	addEvent($("manage_table"), "selectstart", Event.stop);
	addEvent($("manage_table"), "mousedown", Event.stop);
	update("manage_select","move_to", "manage_offset");
});

updater("manage_select",function(){
	var size = TRSelector.cart.keys.length;
	if(size){
		if(State.manage_disabled){
			Form.enable_all("manage_control");
			removeClass("manage_control", "grayout");
			State.manage_disabled = false;
		}
		Manage.message(size + tl(' items selected'));
	} else {
		Manage.message(tl('Select item(s) you want to edit'));
		addClass("manage_control", "grayout");
		Form.disable_all("manage_control");
		State.manage_disabled = true;
	}
});

var Selector = Class.create().extend({
	initialize : function(){
		var self = this;
		Object.extend(this,{
			mousedown : function(event){self.onmousedown.call(self,this,event)},
			mouseover : function(event){self.onmouseover.call(self,this,event)},
			mouseout : function(event){self.onmouseout.call(self,this,event)}
		});
		self.setup && self.setup.apply(this,arguments)
	},
	onmousedown : function(el,event){
		State.mdown = true;
		if(hasClass(el,"selected")){
			removeClass(el, "selected");
			State.turn = false;
		} else {
			addClass(el, "selected");
			State.turn = true;
		}
	},
	onmouseover : function(el,event){
		if(State.mdown){
			(State.turn) ? addClass(el, "selected") : removeClass(el, "selected")
		} else {
			addClass(el, "focus")
		}
	},
	onmouseout : function(el,event){
		removeClass(el, "focus")
	}
});
var Cart = Class.create();
Cart.extend({
	initialize : function(){
		this.hash = {};
		this.keys = [];
		this.values = [];
	},
	clear : function(){
		return this.initialize();
	},
	has : function(key){
		return this.hash.hasOwnProperty("item_" + key)
	},
	add : function(key,value){
		if(!this.has(key)){
			this.hash["item_" + key] = value;
			this.keys.push(key);
			this.values.push(key);
		}
	},
	remove : function(key){
		if(!this.has(key)) return false;
		delete this.hash["item_" + key];
		var idx = this.keys.indexOf(key);
		this.keys.delete_at(idx);
		this.values.delete_at(idx);
		return this;
	},
	get : function(key){
		return this.hash("item_" + key)
	}
});
var SelectorWithCart = Class.create().extend({
	initialize : function(){
		this.cart = new Cart;
	},
	clear: function(){
		this.cart.clear();
	},
	_updateCart : function(element){
		var change;
		var sid = element.getAttribute("subscribe_id") - 0;
		var chk = hasClass(element, "selected");
		if(!chk){
			change = this.cart.remove(sid);
		} else if(!this.cart.has(sid)){
			this.cart.add(sid);
			change = true;
		}
		change && update("manage_select")
	},
	onmousedown : function(){
		this._updateCart.apply(this,arguments);
	},
	onmouseover : function(){
		this._updateCart.apply(this,arguments);
	},
	get_selected : function(){
		return this.cart.keys
	}
});
var ItemSelector = Class.merge(Selector, SelectorWithCart);
var TRSelector = new ItemSelector;

var Manage = {};
Manage.message = function(str){
	$("manage_select").innerHTML = str;
};

Manage.Item = {
	get_items: function(){
		return this.filtered || this.data;
	},
	offset : 0,
	perpage : 20,
	filter: null,
	filtered : null,
	set_filter: function(f){ this.filter = f },
	reload_filter: function(){
		if(this.filter){
			this.filtered = this.data.filter(this.filter);
		}
		this.update();
	},
	loaded : false,
	load : function(){
		var self = this;
		this.data = new Subscribe.Model;
		new API("/api/subs?unread=0").post({},
			function(list){
				self.loaded = true;
				self.data.load(list);
				if(self.sort_mode){
					self.do_sort()
				}
				if(self.filter){
					self.reload_filter()
				} else {
					self.update()
				}
			});
	},
	search: function(){
		var q = this.value;
		if(q == ""){
			MI.filtered = null;
			MI.update();
			return;
		}
		MI.filtered = MI.data.filter(function(item){
			return contain(item.title,q)
		});
		MI.update()
	},
	do_sort: function(){
		if(!this.sort_mode) return;
		var data = this.get_items();
		data.list.sort_by(this.sort_mode);
	},
	sort_mode: null,
	sort: function(sort_mode){
		var data = this.get_items();
		if(sort_mode == this.sort_mode){
			data.list.reverse();
			this.update();
			return;
		}
		this.sort_mode = sort_mode;
		this.do_sort();
		this.update();
	},
	clear_select : function(){
		TRSelector.cart.clear();
		this.update();
	},
	select_all: function(){
		var data = this.get_items();
		var cart = TRSelector.cart;
		foreach(data.list, function(item){
			var sid = item.subscribe_id;
			cart.add(sid)
		});
		this.update();
	},
	page_select : function(){
		var data = this.get_items();
		var cart = TRSelector.cart;
		data.list.slice(MI.offset, MI.offset + MI.perpage).forEach(function(item){
			var sid = item.subscribe_id;
			if(cart.has(sid)){
				cart.remove(sid)
			} else {
				cart.add(sid)
			}
		});
		this.update();
	},
	reverse_select : function(){
		var data = this.get_items();
		var cart = TRSelector.cart;
		foreach(data.list,function(item){
			var sid = item.subscribe_id;
			if(cart.has(sid)){
				cart.remove(sid)
			} else {
				cart.add(sid)
			}
		});
		this.update();
	},
	data : null,
	has_prev : function(){
		return this.offset > 0
	},
	has_next : function(){
		var data = this.get_items();
		return this.offset + this.perpage < data.list.length ? true : false;
	},
	prev : function(){
		if(this.has_prev()){
			this.offset = Math.max(0,this.offset - this.perpage);
			update("manage_item","mi_paging");
		}
	},
	next : function(){
		if(this.has_next()){
			this.offset += this.perpage;
			update("manage_item","mi_paging");
		}
	},
	update : function(){
		update("manage_item","mi_paging");
	},
	do_move : function(){
		var sel = $("move_to");
		var to  = Form.getValue(sel);
		var ids = TRSelector.get_selected();
		move_to(ids.join(","),to);
		foreach(ids,function(sid){
			var item = subs_item(sid);
			if(item) item.folder = to;
		});
		update("manage_item")
	},
	
	toggle_notify: function(){
		var ids = TRSelector.get_selected();
		if(!ids.length) return;
		var turn = 0;
		var sids = [];
		foreach(ids,function(sid,n){
			var item =  subs_item(sid);
			if(!item) return;
			if(n==0){turn = item.ignore_notify ? 0 : 1}
			item.ignore_notify = turn;
			sids.push(sid);
		});
		var api = new API("/api/feed/set_notify");
		api.post({
			subscribe_id:sids.join(","),
			ignore : turn
		},function(){
			message("通知設定を変更しました")
		});
		update("manage_item")
	},

	unsubscribe: function(){
		var ids = TRSelector.get_selected();
		var l = ids.length;
		var tmpl_confirm = getText('manage_unsubscribe_confirm_tmpl');
		var tmpl_progress = getText('manage_unsubscribe_progress_tmpl')
		var c = confirm(tmpl_confirm.fill({count: l}));
		if(!c) return;
		TRSelector.clear();
		foreach(ids,function(sid,n){
			var api = new API("/api/feed/unsubscribe");
			api.post({subscribe_id:sid},function(){
				l--;
				message(
					tmpl_progress.fill({remain: l})
				);
				if(l == 0){
					message(tl('Feeds deleted'));
					MI.load();
				}
			});
		});
	},

	touch: function(){
		var ids = TRSelector.get_selected();
		foreach(ids,function(sid){
			var item = subs_item(sid);
			if(!item) return;
			if(item.unread_count > 0){
				item.unread_count = 0;
				var api = new API("/api/touch_all");
				api.post({subscribe_id:sid})
			}
		});
		message('Marked as read');
		update("manage_item")
	}
	
};

/*
 再描画
*/
Manage.rewrite = {
	
}

updater("manage_offset", function(){
	var tmpl = Template.get("man_offset").compile();
	var folder_id = MF.folder_id;
	if(folder_id == 0){
		var folder_name = tl('Uncategolized');
	} else if (!folder_id){
		var folder_name = tl('All');
	} else {
		var folder_name = folder.id2name[folder_id];
	}
	var size = MI.get_items().list.length;
	this.innerHTML = tmpl({
		selecter_name : folder_name,
		size  : size,
		start : MI.offset + 1,
		end   : Math.min(MI.offset + MI.perpage, size)
	});
});


updater("mi_paging", function(){
	var prev = $("mi_prev");
	var next = $("mi_next");
	MI.has_next() ? removeClass(next,"disable") : addClass(next, "disable");
	MI.has_prev() ? removeClass(prev,"disable") : addClass(prev, "disable");
});


updater("move_to", function(){
	this.options.length = 0;
	this.options[0] = new Option(tl('Uncategolized'), "");
	var op = this.options;
	folder.names.map(function(v,i){
		op[i+1] = new Option(v,v);
	})
});


// folderの管理

updater("manage_folder", function(){
	if(MF.change_flag || !folder){
		MF.change_flag = false;
		get_folders(updater("manage_folder"));
		return;
	}
	var tmpl = Template.get("man_folder");
	var fmt = function(v){
		var id = folder.name2id[v];
		return tmpl.fill({
			folder:v,
			id : id,
			selected : MF.folder_id == id ? "selected" : ""
		})
	};
	$("manage_folder").innerHTML = [
		'<li class="button ' + (MF.folder_id == 0 ? 'selected' : '')  + '" onclick="MF.select(0)">', tl('Uncategolized'), '</li>',
		folder.names.map(fmt).join(" ")
	].join("");
	update("update_folder");
	update("move_to");
});
updater("update_folder",function(){
	if(!MF.folder_id){
		this.innerHTML = "";
		return;
	}
	var tmpl = Template.get("manage_form").compile();
	this.innerHTML = tmpl({
		folder_id   : MF.folder_id,
		folder_name : folder.id2name[MF.folder_id]
	});

	ajaxize("rename_form", function(res,req){
		message(folder.id2name[req.folder_id] + "-&gt;" + req.name);
		folder = null;
		MF.change_flag = true;
		update('manage_folder');
		// フィルタを変更
		MI.set_filter(function(item){
			return item.folder == req.name;
		});
		MI.load();
	});

	ajaxize("delete_form",{
		before: function(param){
			var tmpl = getText('manage_folder_delete_confirm');
			var c = confirm(
				tmpl.fill({ folder: folder.id2name[param.folder_id]})
			);
			return c ? true : false;
		},
		after: function(res,req){
			var fn = folder.id2name[req.folder_id];
			message(fn + tl(' deleted'));
			MF.folder_id = null;
			folder = null;
			// フォルダ一覧を再読み込みして表示のみ更新
			var rewrite = function(){
			update('manage_folder');
				// folderを削除
				MI.data.list.filter(
					function(item){ return item.folder == fn }
				).forEach(
					function(item){
						var sid = item.subscribe_id;
						subs_item(sid).folder = "";
					}
				);
				MI.update();
			}
			get_folders(rewrite);
		}
	});
});

Manage.Folder = {
	folder_id : null,
	change_flag : false,

	select : function(id){
		if(this.folder_id == id){
			this.folder_id = null;
		} else {
			this.folder_id = id;
		}
		// offsetを初期化
		MI.offset = 0;
		update("manage_folder");
		update("update_folder");
		// itemも更新
		if(MI.loaded){
			if(this.folder_id == null){
				MI.filtered = null;
			} else if(this.folder_id == 0){
				MI.set_filter(function(item){
					return item.folder == "";
				});
				return MI.reload_filter();
			} else {
				var folder_name = folder.id2name[id];
				MI.set_filter(function(item){
					return item.folder == folder_name;
				});
				return MI.reload_filter();
			}
			MI.do_sort();
			MI.update()
		}
	},
	filter: function(){ return true },
	create_folder: function(callback){
		var name = prompt(tl('Folder Name'),"");
		if(!name) return;
		var api = new API("/api/folder/create");
		api.post({name:name},function(res){
			message('folder created');
			folder = null;
			callback();
		});
	},

	rename_folder : function(callback){
		var folder_id = MF.folder_id;
		if(!folder_id) return false;
		var new_name = $("rename_to").value;
		if(!new_name) return false;
		var api = new API("/api/folder/update");
		api.post({folder_id : folder_id, name : new_name},function(){
			message(folder.id2name[folder_id] + "-&gt;" + new_name);
			folder = null; callback();
		});
		MF.change_flag = true;
		return true;
	},

	delete_folder : function(callback){
		var folder_id = MF.folder_id;
		if(!folder_id) return false;
		var tmpl = getText('manage_folder_delete_confirm');
		var c = confirm(
			tmpl.fill({ folder: folder.id2name[folder_id]})
		);
		if(!c) return false;
		var api = new API("/api/folder/delete");
		api.post({folder_id : folder_id},function(){
			message(folder.id2name[folder_id] + tl(' deleted'));
			MF.folder_id = null;
			folder = null;
			callback();
		});
		MF.change_flag = true;
		return true;
	}
};

Manage.show_help = function(){
	if(this.disabled) return;
	$("manage_help").innerHTML = "-&gt; &nbsp;&nbsp;" + this.title;
}
Manage.hide_help = function(){
	$("manage_help").innerHTML = "";
}


// deleteを実行
function delete_folder(folder_id){
	var api = new API("/api/folder/delete");
	api.post({folder_id : folder_id},function(){
		message(folder.id2name[folder_id] + tl(' deleted'));
		folder = null; callback();
	});
	var models = SM.instances;
	var folder_name = folder.id2name[folder_id];
	models.invoke("delete_folder", folder_name)
}

// renameを実行
function rename_folder(folder_id, new_name){
	var api = new API("/api/folder/update");
	api.post({folder_id : folder_id, name : new_name},function(){
		message(folder.id2name[folder_id] + "-&gt;" + new_name);
		folder = null; callback();
	});
	var models = SM.instances;
	var folder_name = folder.id2name[folder_id];
	models.invoke("rename_folder", folder_name, new_name)
}


var MI = Manage.Item;
var MF = Manage.Folder;

MouseUp = new Trigger("mouseup");
MouseUp.add(True,function(){State.mdown = false});
MouseUp.apply();


// 描画領域を入れ替える。
function change_buffer(){
	var current_buffer = $("right_body");
	var background = $("buffer");

	current_buffer.id = "buffer";
	current_buffer.style.display = "none";

	background.id = "right_body";
	background.style.display = "block";
}
addEvent($("mini_window"),"dblclick",function(e){
	Event.stop(e);
	DOM.hide("mini_window");
});
function preview(sid){
	print_feed.target = "mini_window_body";
	DOM.show("mini_window");
	centering("mini_window");
	var item = subs_item(sid);
	if(true){
		var api = new API("/api/all");
		api.onload = function(json){
			print_feed(json)
		};
		api.post({
			subscribe_id : sid,
			limit : 1
		});
	}
}
function centering(element,x,y){
	element = $(element);
	x = x || 0;
	y = y || 0;
	var w = element.offsetWidth;
	var h = element.offsetHeight;
	var bw = document.body.offsetWidth;
	var bh = document.body.offsetHeight;
	var top  = (bh/2) - (h/2) -y + "px";
	var left = (bw/2) - (w/2) -x + "px";
	setStyle(element,{
		top : top,
		left : left
	});
}
updater("config_form", function(){
	var active = TabManager["config_form"];
	(active == "config_basic") ?
		Element.hide("config_submit"):
		Element.show("config_submit")
})



// ------------------------------
// END OF reader_manage.js
// ------------------------------

// ------------------------------
// reader_widgets_en.js : 2007-07-08T03:41:48
// ------------------------------

/*
 reader widgets
*/
function setup_widgets(){
	channel_widgets.sep = "&nbsp;&nbsp;|&nbsp;&nbsp;"
	entry_widgets.sep = "";

	entry_widgets.add('created_on', function(feed, item){
		return 'posted: ' + new DateTime(item.created_on * 1000).toString();
	});

	entry_widgets.add('modified_on', function(feed, item){
		if(item.created_on == item.modified_on) return;
		return 'modified: ' + new DateTime(item.modified_on * 1000).toString();
	});

	entry_widgets.add('subs_button', function(feed, item){
		var channel_domain = get_domain(feed.channel.link);
		var subs_button = function(url){
			return '<a href="' + url + '" rel="discover">add</a>';
		};
		return (channel_domain != get_domain(item.link)) ? subs_button(item.link) : "";
	});

	channel_widgets.add('offset', function(feed, items){
		var subscribe_id = feed.subscribe_id;
		var info = subs_item(subscribe_id);
		var size = items.length;
		var range,range_text;
		var et = (size > 1) ? 'items' : 'item';
		if(State.viewrange.start == 0){
			range_text = "Updated";
			range = ""
			return	[
				'<span style="background:url(\'',info.icon,'\') no-repeat 0 0;padding-left:22px">',
				,range_text,': ',range,
				,' <span class="num"><span id="scroll_offset"></span>',size,'</span> ', et, '</span>'
			].join("");
		} else {
			range_text = "Archived";
			range = (State.viewrange.start + 1) + "-" + State.viewrange.end;
			return	[
				'<span style="background:url(\'',info.icon,'\') no-repeat 0 0;padding-left:22px">',
				,range_text,': ',
				,' <span class="num"><span id="scroll_offset"></span>',size,'</span> (',range,') ', et, '</span>'
			].join("");
		}
	});

	channel_widgets.add('subscriber', function(feed){
		var count = feed.channel.subscribers_count;
		return [
			'<span class="subscriber" style="background:url(\'/img/icon/subscriber.gif\') no-repeat 0 0;padding-left:22px">',
			'<span class="num">', count, (count == 1 ? '</span> user</span>' : '</span> users</span>')
		].join("");
	});

	channel_widgets.add('about', function(feed, items){
		return (
			'<a href="/about/' 
			+ feed.channel.feedlink
			+ '" style="background-image:url(/img/icon/about.gif);background-position:0 0;background-repeat:no-repeat;padding:0 0 4px 20px;">'
			+ 'about feed' 
			+ '</a>'
		);
	});

	channel_widgets.add('touch_button', function(feed){
		if(Config.touch_when != "manual") return;
		return [
			"<span class='button' onclick='touch_all(\"",feed.subscribe_id,"\")'>mark as read</span>"
		].join("");
	});

}
setup_widgets();
/* just a example:
	entry_widgets.add('clip_counter', function(feed, item){
		var link = item.link.replace(/#/g,'%23');
		var link_encoded = encodeURIComponent(item.link);
		var tmpl = [
			'http://clip.livedoor.com/clip/add?',
			'mode=confirm&title=[[title]]&link=[[url]]&tags=[[tags]]&public=[[public]]'
		].join("");
		var add_link = tmpl.fill({
			url   : encodeURIComponent(item.link.unescapeHTML()),
			title : encodeURIComponent(item.title.unescapeHTML()),
			tags  : Config.clip_tags,
			"public" : Config.use_clip_public
		});
		return [
			'<a href="', add_link, '">','<img src="http://parts.blog.livedoor.jp/img/cmn/clip_16_12_w.gif" border=0></a>',
			'<a href="http://clip.livedoor.com/page/', link, '">',
			'<img style="border:none;margin-left:3px" ',
			'src="http://image.clip.livedoor.com/counter/', link, '">','</a>'
		].join('');
	});

	entry_widgets.add('hb_counter', function(feed, item){
		var link = item.link.replace(/#/g,'%23');
		return [
			'<a href="http://b.hatena.ne.jp/entry/', link, '">',
			'<img src="http://d.hatena.ne.jp/images/b_entry.gif" border=0><img style="border:none;margin-left:3px;" ',
			'src="http://b.hatena.ne.jp/entry/image/',link, '"></a>'
		].join('');
	}, 'はてなブックマークにブックマークされている件数です');

	channel_widgets.add('feedlink', function(feed, items){
		return '<a href="'+feed.channel.feedlink+'"><img src="/img/icon/feed.gif" border=0 style="vertival-align:middle"></a>';
	});

	channel_widgets.add('hb_counter', function(feed){
		return [
			'<a href="http://b.hatena.ne.jp/entrylist?url=', feed.channel.link, '">',
			'<img style="vertical-align:middle;border:none;" src="http://b.hatena.ne.jp/bc/', feed.channel.link, '">',
			'</a>'
		].join("");
	});
*/



// ------------------------------
// END OF reader_widgets_en.js
// ------------------------------

// ------------------------------
// reader_addon.js : 2007-07-13T14:12:21
// ------------------------------

// print_ads
register_hook('BEFORE_PRINTFEED', function(feed){
	print_ads(feed.ads);
});

function print_ads(ads){
	if(!ads) return;
	var tmpl = Template.get("ads_body").compile();
	var fmt  = Template.get("ads_item").compile();
	$("ads_bottom").innerHTML = tmpl({
		items: ads.map(function(v){
			return fmt(v,{domain:get_domain(v.url)})
		}).join("")
	})
}

// loading
// register_hook("before_subs_load", function(){update("reload_button")})
// register_hook("after_subs_load", function(){update("reload_button")})

// debug
/*register_hook("after_subs_load", function(){
	Keybind.sendKey("s");
})*/


var Rate = Class.create().extend({
	initialize: function(callback){
		Object.extend(this, Rate);
		this.click = callback;
	}
});

Rate.image_path = "/img/rate/";
Rate.image_path_p = "/img/rate/pad/";
Rate._calc_rate = function(e){
	var el = this;
	var img_w = el.offsetWidth;
	var cell = img_w / 6;
	var offsetX = !isNaN(e.offsetX) ? e.offsetX : e.layerX - el.offsetLeft;
	if(offsetX == 0) offsetX++;
	if(offsetX>img_w) offsetX = img_w;
	var rate = Math.ceil(offsetX/cell) - 1;
	// window.status = [img_w,cell,el.offsetLeft,e.layerX,offsetX];
	return rate;
};
Rate.click = function(e){
	var el = this;
	var rate = Rate._calc_rate.call(this,e);
	var sid = el.getAttribute("sid");
	set_rate(sid,rate);
	el.src = Rate.image_path_p + rate + ".gif";
	el.setAttribute("orig_src", el.src);
};
Rate.out = function(e){
	var src;
	var el = this;
	if(src = el.getAttribute("orig_src")){
		el.src = src
	}
};
Rate.hover = function(e){
	var el = this;
	if(!el.getAttribute("orig_src")){
		el.setAttribute("orig_src", el.src);
	}
	var rate = Rate._calc_rate.call(this,e);
	el.src   = Rate.image_path_p + rate + ".gif";
};

var ClipRate = new Rate(function(e){
	var id   = this.getAttribute("item_id");
	var form = $("clip_form_"+id);
	var rate = Rate._calc_rate.call(this, e);
	form.rate.value = rate;
	this.src = Rate.image_path_p + rate + ".gif";
	this.setAttribute("orig_src", this.src);
});


new function(){
	if(typeof Language != 'undefined' && Language == 'English'){ return }
	// extension for livedoor clip
	KeyConfig.toggle_clip  = "b";
	KeyConfig.instant_clip = "i";
}

State.clipped_item = new Cache();

function clip_click(id){
	var item = get_item_info(id);
	// use custom clip
	if(Config.use_custom_clip != "off"){
		var link_template = Config.custom_clip_url;
		var link = link_template.fill({
			url   : encodeURIComponent(item.link.unescapeHTML()),
			title : encodeURIComponent(item.title.unescapeHTML()),
			body  : encodeURIComponent(item.body),
			select : encodeURIComponent(get_selection())
		});
		window.open(link) || message('cannot_popup');
	} else if(Config.use_inline_clip){
		toggle_clip(item.id)
	} else {
		window.open(make_clip_url(item)) || message('cannot_popup');
	}
}
Control.toggle_clip = function(){
	var item = get_active_item(true);
	if(!item) return;
	clip_click(item.id);
};
function make_clip_url(item){
	var tmpl = [
		'http://clip.livedoor.com/clip/add?',
		'mode=confirm&title=[[title]]&link=[[url]]&tags=[[tags]]&public=[[public]]'
	].join("");
	return tmpl.fill({
		url   : encodeURIComponent(item.link.unescapeHTML()),
		title : encodeURIComponent(item.title.unescapeHTML()),
		tags  : Config.clip_tags,
		"public" : Config.use_clip_public
	});
}
function get_item_body(item_id){
	return
}

Control.instant_clip = function(){
	var item = get_active_item(true);
	if(!item) return;
	// copy rate
	var rate = subs_item(get_active_feed().subscribe_id).rate;
	if(Config.use_instant_clip == -1){
		var c = confirm([
			"ショートカットキー「i」で、今見ている記事をすぐにlivedoor クリップへ登録できます。",
			"",
			"一発クリップ機能を有効にしますか？",
			"（※ 「設定変更→クリップの設定」から詳細な設定を行えます）"
		].join("\n"));
		if(!c) return;
		Config.set("use_instant_clip", 1);
	}
	if(!Config.use_instant_clip){
		message("一発クリップ機能を使用するには、「設定変更」でクリップの設定を変更してください");
		return;
	}
	var id = item.id;
	var body = $("item_body_"+id);
	var api = new API("/clip/add");
	var onload = function(json){
		if(json.StatusCode == 401){
			body.innerHTML = Template.get("clip_register").fill();
			$("clip_icon_"+item.id).src = "/img/icon/clip.gif";
			State.clipped_item.clear();
			fix_linktarget(body);
		} else {
			message("クリップしました")
		}
	};
	State.clipped_item.set(item.id, item);
	$("clip_icon_"+item.id).src = "/img/icon/clipped.gif";
	var param = {
		link  : item.link.unescapeHTML(),
		title : item.title.unescapeHTML(),
		"public" : Config.use_instant_clip_public,
		from  : "reader"
	};
	if(Config.use_instant_clip_ratecopy) param.rate = rate;
	if(Config.instantclip_tags) param.tags = Config.instantclip_tags;
	api.post(param, onload);
};

function extract_keyword(str){
	var seen = {};
	function keyword_count(){
		var a = arguments;
		seen[a[0]] = true;
	}
	var reg = new RegExp(
		[
			"[a-zA-Z][a-zA-Z0-9.-]{1,20}",
			"[ア-ンー]{3,10}",
			"[一-龍]{2,10}"
		].join("|"),
		"g"
	);
	str.replace(reg, keyword_count);
	return keys(seen);
}

function not_clip_user(){
	message(
		'<a href="http://clip.livedoor.com/" target="_blank">livedoor クリップ</a> の利用登録が必要です'
	);
}
function toggle_clip(id){
	var body = $("item_body_"+id);
	var param = get_item_info(id);
	var rate = subs_item(get_active_feed().subscribe_id).rate;
	function fetch_clip(url,callback){
		var api = new API("/clip/in_my_clip");
		api.post({
			link : url.unescapeHTML()
		}, callback);
	}
	function set_ratepad(n){
		$("clip_rate_"+id).src = Rate.image_path_p + n + ".gif";
	}
	if(hasClass(body, "clip_mode")){
		var form = $("clip_form_"+id);
		// focus
		(function(){
			var tmp = $N("span");
			tmp.innerHTML = '<input type="password" id="tmp_focus" style="visibility:hidden">';
			document.body.appendChild(tmp);
			var el = $("tmp_focus");
			if(el){
				el.focus();
				document.body.removeChild(tmp);
				// message("フォーカス移動");
			}
		})._try()();
		body.innerHTML = '<div class="body">'+param.body+'</div>';
		fix_linktarget(body);
		removeClass($("clip_"+id), "clip_active");
		removeClass(body, "clip_mode");
	} else {
		var item_html = body.innerHTML;
		var tmpl = Template.get("clip_form").compile();
		body.innerHTML = tmpl(param);
		addClass(body, "clip_mode");
		addClass($("clip_"+id), "clip_active");
		var form = $("clip_form_"+id);
		// form fill
		Form.fill(form, {
			tags     : Config.clip_tags,
			"public" : Config.use_clip_public
		});
		if(Config.use_clip_ratecopy){
			Form.fill(form, {rate : rate});
			set_ratepad(rate);
			param.rate = rate;
		};

		// var str = (param.title + " " + param.body).strip_tags();
		// keyword
		// form.tags.value = extract_keyword(str).join(" ");
		(function(){form.tags.focus()})._try().later(100)();
		fetch_clip(param.link, function(json){
			if(json.StatusCode == 200){
				// public
				if(json["public"] == "0"){
					json["public"] = "off";
				} else {
					// config
					json["public"] = Config.use_clip_public;
				}
				Form.fill(form, json);
				if(json["rate"] > 0) set_ratepad(json["rate"]);
				var clip_info = $("clip_info_"+id);
				if(clip_info) clip_info.innerHTML = Template.get("clip_info").fill(json);
			} else if(json.StatusCode == 401) {
				body.innerHTML = Template.get("clip_register").fill();
				fix_linktarget(body);
			}
		});
		ajaxize(form,{
			before: function(){
				toggle_clip(id);
				State.clipped_item.set(id, param);
				$("clip_icon_"+id).src = "/img/icon/clipped.gif";
				return true;
			},
			after: function(res,req){
				message("クリップしました");
			}
		});
	}
}
function get_selection(){
	return ( window.getSelection 
			? window.getSelection().toString() 
			: document.selection.createRange().text
	).slice(0,150);
}

function clip_page_link(url){
	return 'http://clip.livedoor.com/page/' + url.replace(/#/,"%23")
}
function custom_clip_change(e){
	if(this.value.indexOf("http://") != -1){
		$("config_form").custom_clip_url.value = this.value;
	}
	if(this.value == "off"){
		Element.show("config_for_ldclip");
		Element.hide("config_for_customclip");
	} else {
		Element.hide("config_for_ldclip");
		Element.show("config_for_customclip");
	}
}
register_hook("after_init_config", function(){
	if(typeof Language != 'undefined' && Language == 'English'){ return }
	update("custom_clip");
	if(Config.use_custom_clip == "off"){
		Element.show("config_for_ldclip");
		Element.hide("config_for_customclip");
	} else {
		Element.hide("config_for_ldclip");
		Element.show("config_for_customclip");
		$("custom_clip").value = "on";
	}
});


// blog or bookmark other service
var Linkage = [];
Linkage.push({
	name : 'はてなブックマーク',
	url  : 'http://b.hatena.ne.jp/add?mode=confirm&title=[[title]]&url=[[url]]'
});
Linkage.push({
	name : 'del.icio.us',
	url  : 'http://del.icio.us/post?url=[[url]];title=[[title]]'
});
Linkage.push({
	name : 'Buzzurl',
	url  : 'http://buzzurl.jp/config/add/confirm?url=[[url]]&title=[[title]]&comment=[[select]]'
});
Linkage.push({
	name : 'Yahoo!ブックマーク',
	url  : 'http://bookmarks.yahoo.co.jp/bookmarklet/showpopup?t=[[title]]&u=[[url]]&ei=UTF-8'
});
Linkage.push({
	name : 'Google Bookmarks',
	url  : 'http://www.google.com/bookmarks/mark?op=edit&bkmk=[[url]]&title=[[title]]'
});
Linkage.push({
	name : 'livedoor Blog',
	url  : 'http://cms.blog.livedoor.com/cms/article/add?bm=1&b=[[select]]&t=[[title]]&l=[[url]]&f=%3Ca%20href%3D%22%24url%24%22%3E%24title%24%3C%2Fa%3E%3Cblockquote%3E%24body%24%3C%2Fblockquote%3E&tb=1'
});






updater("custom_clip", function(){
	var sel = this;
	Linkage.forEach(function(o,i,self){
		var tree = (i==self.length-1) ? "└" : "├";
		var op = new Option(tree + "　" + o.name, o.url);
		sel.options[i+2] = op;
		// el.appendChild(op);
	});
});

// vi commands
var vi = {};
function vi_exec(e){
	if(e.keyCode != 13) return;
	var value = this.value.slice(1);
	var args = value.split(/\s+/);
	var cmd  = args.shift();
	isFunction(vi[cmd]) && vi[cmd].apply(this, args);
}
function register_command(name,func){
	// 短縮形
	if(name.indexOf("|") != -1){
		name.split("|").forEach(function(nm){
			vi[nm] = func;
		});
	} else {
		vi[name] = func;
	}
}
register_hook("after_init", function(){
	Keybind.add(":",function(){
		Element.show("message_box");
		message("<input type='text' id='vi' onkeyup='vi_exec.call(this,event)'>");
		setTimeout(function(){
			var i = $("vi");
			i.focus();
			i.value = ":";
			try{
				i.selectionStart = 1;
			}catch(e){}
		},50)
	})
});
register_command("q|quit",function(){
	message("");
	Element.hide("message_box");
});

// set rate
"0,1,2,3,4,5".split(",").forEach(function(v){
	register_command(v, function(){
		if(!State.now_reading) return;
		var sid = State.now_reading;
		var rate = v - 0;
		set_rate(sid, rate);
		$("rate_img").src = Rate.image_path_p + rate + ".gif";
	})
});
// change mode
register_command("v|view",function(mode){
	var modes = LDR_VARS.ViewModes;
	var mode = modes.like(mode);
	if(mode){
		Control.change_view(mode);
		var mode_text = getText(mode);
		message(mode_text + "表示に変更しました");
	} else {
		message(":v [" + modes.join("|") + "]");
	}
});
// rev
register_command("rev", function(){	Control.reverse() });


/* Clip Browser */
function get_hotlevel(num){
	return (num < 3) ? 0 : (num >= 3 && num < 10) ? 1 : 2;
}
State.now = Math.floor(new Date / 1000);
var ListView = Class.create();
ListView.extend({
	element_id: "listview_items",
	element_class: "listview",
	get_item_by_id: function(id){
		if(this.item_index[id]){
			return this.item_index[id]
		} else {
			return null
		}
	},
	get_item: function(){
		var current_page = this.get_page();
		return current_page[this.selected_index];
	},
	get_page: function(){
		return this.items.slice(
			this.offset,
			this.offset + this.limit
		);
	},
	get_selected_items: function(){
		return this.items.filter(this._is_selected);
	},
	// 複数選択モード
	multiple: function(a){
		if(arguments.length){
			this._multiple = a;
		}
		return this._multiple;
	},
	_is_selected: function(item){
		return item._selected;
	},
	prefetch: function(){
		this.load_items();
	},
	next_item: function(){
		this.unfocus();
		// roll
		var self = this;
		// 次のページをロード
		if(this.selected_index >= (this.limit * (2/3) - 1)){
			if(this.items.length < this.offset + this.limit + 1){
				// ロードしてrewrite
				this.offset++;
				this.load_items(function(){
					self.rewrite();
				});
				this.rewrite();
			} else {
				this.rotate(1);
				this.update_focus();
			}
		// フォーカス
		} else {
			this.selected_index++;
			if(this.selected_index > this.limit - 1 && this.has_next()){
				this.next_page();
			} else {
				this.update_focus();
			}
		}
	},
	select_and_next_item: function(){
		this.toggle_select();
		this.next_item();
	},
	prev_item: function(){
		this.unfocus();
		if(this.offset > 0 && this.selected_index <= (this.limit *  (1/3) - 1)){
			this.rotate(-1);
		} else if(this.selected_index > 0) {
			this.selected_index--;
		}
		this.update_focus();
	},
	select_and_prev_item: function(){
		if(this.selected_index > 0){
			this.prev_item();
			this.toggle_select();
		}
	},
	last_item: function(){
		
	},
	next_page: function(){
		if(this.loading) return;
		if(!this.has_next()){
			this.last_item();
		} else {
			this.offset += this.limit;
			this.rewrite();
		}
	},
	prev_page: function(){
		if(this.loading) return;
		this.offset -= this.limit;
		this.offset = Math.max(0, this.offset);
		this.rewrite();
	},
	has_next: function(){
		if(this.total_count && this.total_count < this.offset + this.limit){
			return false;
		} else {
			return true;
		}
	},
	scroll: function(){
		var item = this.selected_item;
		var clip_window = this.window;
		var row = item.offsetHeight;
		var remain_top = item.offsetTop - clip_window.scrollTop;
		var remain_bottom = clip_window.offsetHeight - item.offsetTop + clip_window.scrollTop;
		if(Math.min(remain_top,remain_bottom) < (row * 1.5)){
			clip_window.scrollTop = item.offsetTop - (row * 2);
		}
	},
	update_focus: function(){
		var list = this.window.getElementsByTagName("li");
		if(!list.length) return;
		var sel = list[this.selected_index];
		if(sel){
			addClass(sel, "focus");
			this.selected_item = sel;
			this.scroll();
		} else if(this.selected_index > list.length-1){
			this.selected_index = list.length - 1;
			sel = list[this.selected_index];
			addClass(sel, "focus");
			this.selected_item = sel;
		}
		if(browser.isOpera) this.redraw();
	},
	focus: function(){
		
	},
	unfocus: function(){
		if(this.selected_item){
			removeClass(this.selected_item, "focus");
		}
	},
	toggle_select: function(){
		if(!this.selected_item) return;
		var id = this.selected_item.id;
		var item = this.get_item_by_id(id);
		(item._selected) ? this.unselect() : this.select();
	},
	select: function(id){
		if(id){
			var item = this.get_item_by_id(id);
			var item_element = $(id);
		} else if(this.selected_item){
			var id = this.selected_item.id;
			var item = this.get_item_by_id(id);
			var item_element = this.selected_item
		}
		if(!item) return;
		item._selected = true;
		this.last_target = item;
		if(item_element) addClass(item_element, "selected");
	},
	unselect: function(id){
		if(id){
			var item = this.get_item_by_id(id);
			var item_element = $(id);
		} else if(this.selected_item){
			var id = this.selected_item.id;
			var item = this.get_item_by_id(id);
			var item_element = this.selected_item
		}
		if(!item) return;
		item._selected = false;
		this.last_target = item;
		if(item_element) removeClass(item_element, "selected");
	},
	unselect_all: function(){
		this.get_selected_items().forEach(function(item){
			item._selected = false;
		});
	},
	range_select: function(){
		if(!this.last_target){
			this.toggle_select();
			return
		}
		var last_target = this.last_target;
		var a = this.last_target.id.replace(/\D/g,"");
		var b = this.selected_item.id.replace(/\D/g,"");
		var start_id = Math.min(a,b);
		var end_id = Math.max(a,b);
		var prefix = this.element_id + "_";
		var turn = hasClass(this.selected_item, "selected");
		for(var i=start_id;i<=end_id;i++){
			if(!turn){
				this.select(prefix + i);
			} else {
				this.unselect(prefix + i);
			}
		}
		this.last_target = last_target;
	},
	format_list: function(items){
		var formatter = this.make_item_from;
		return [
			"<ul id='", this.element_id, "' onselectstart='return false'>",
				items.map(formatter).join(""),
			"</ul>"
		].join("");
	},
	rotate: function(num){
		window.status = "rotate";
		var ul = new DOMArray(this.element_id, "li");
		var self = this;
		if(num > 0){
			num.times(function(n){
				var item = self.items[self.offset + self.limit];
				if(item){
					self.offset++;
					ul.shift();
					ul.push(self.make_item_from(item), true)
				}
			});
		} else {
			(-num).times(function(n){
				var item = self.items[self.offset - 1];
				if(item){
					self.offset--;
					ul.pop()
					ul.unshift(self.make_item_from(item), true);
				}
			});
		}
		if(browser.isOpera) this.redraw();
	},
	redraw: function(element){
		element = element || $(this.element_id);
		var old = element.style.backgroundColor;
		element.style.backgroundColor = 'transparent';
		element.style.backgroundColor = old;
	}
});
ListView._instance = {};
ListView.get_instance = function(id){
	return ListView._instance[id]
};
ListView.mouseout = function(e){};
ListView.mouseover = function(e){
	if(!State.mdown) return;
	var el = this;
	var ul = el.parentNode;
	var id = ul.id;
	var listview = ListView.get_instance(id);
	var item_id = el.id;
	if(State.turn){
		listview.select(item_id);
	} else {
		listview.unselect(item_id);
	}
};
ListView.mousedown = function(e){
	State.mdown = true;
	var el = this;
	var ul = el.parentNode;
	var id = ul.id;
	var listview = ListView.get_instance(id);
	var item_id = el.id;
	if(hasClass(el,"selected")){
		listview.unselect(item_id);
		State.turn = false;
	} else {
		listview.select(item_id);
		State.turn = true;
	}
	Event.stop(e);
};


var DOMArray = Class.create();
DOMArray.extend({
	initialize: function(element, child_tag){
		this.element = $(element);
		this.child_tag = child_tag;
	},
	_create: function(v, outer){
		if(outer){
			var div = document.createElement("div");
			div.innerHTML = v;
			var el = div.firstChild;
		} else {
			var el = document.createElement(this.child_tag);
			el.innerHTML = v;
		}
		return el;
	},
	push: function(v, outer){
		var el = this._create(v,outer);
		this.element.appendChild(el);
	},
	shift: function(){
		var el = this.element.firstChild
		this.element.removeChild(el);
		return el
	},
	pop: function(){
		var el = this.element.lastChild;
		this.element.removeChild(el);
		return el;
	},
	unshift: function(v, outer){
		var el = this._create(v,outer);
		this.element.insertBefore(el, this.element.firstChild)
	}
});


var clip_overlay;
(function(){
	if(typeof Language != 'undefined' && Language == 'English'){ return }
	State.clip_overlay = false;
	var Keybind_clip = new HotKey(null, "clip_overlay");
	Keybind_clip.activate(false);
	var template = [
		'<span class="date">[[#{ (State.now-created_on).toRelativeDate() }]]</span>',
		'<a href="[[link]]" target="_blank" class="[[ classname ]]">[[title]]</a>',
		'<span class="clip-count">',
		'<a href="[[#{ clip_page_link(link) }]]" class="hotlevel_[[#{get_hotlevel(public_clip_count)}]]" target="_blank">',
			'[[public_clip_count]] user</a></span>'
	].join("");
	var template_comments = [];
	var formatter = new Template(template).compile();
	var LDClip = Class.base(ListView);
	LDClip.extend({
		initialize: function(){
			this.items = [];
			this.item_index = {};
			this.element_id = "ldcbrowser_items";
			ListView._instance[this.element_id] = this;
			this.clip_api = '/clip/clips';
			this.last_response = null;
			this._has_next = true;
			this.window;
			this.limit = 20;
			this.offset = 0;
			this.requested = 0;
			this.selected_item;
			this.selected_index = 0;
			this.loader = new API(this.clip_api);
		},
		show_error : function(){
			this.window.innerHTML = [
				Template.get("clip_register").fill(),
				'<div class="clip_paging">',
				'<span id="clip_progress"><span class="button" onclick="clip_overlay.hide()">閉じる</span></span>',
				'</div><br clear="all">'
			].join("");
		},
		load_items: function(callback){
			var offset = this.items.length;
			if(this.requested >= offset + this.limit) return;
			this.requested = offset + this.limit;
			var self = this;
			this.loading = true;
			this.loader.post({
				escape : 1,
				offset : offset,
				limit: this.limit
			}, function(res){
				if(!res.isSuccess){
					self.show_error();
					return;
				}
				self.loading = false;
				self.last_response = res;
				self.postkey = res.postkey;
				var count = self.items.length;
				res.clips.forEach(function(item){
					item.id = self.element_id + "_" + count++;
					self.item_index[item.id] = item;
					self.items.push(item);
				});
				if(res.clips.length < self.limit){
					self._has_next = false;
					self.total_count = self.items.length;
				}
				callback && callback();
			});
		},
		format: function(info, items){
			return [
				'<div class="clip_paging">',
				'<span id="clip_progress">',
				'<span class="button" onclick="clip_overlay.hide()">閉じる</span></span>',
				'</div>',
				'<h3><a href="http://clip.livedoor.com/clips/',
				info.livedoor_id , '" target="_blank">' , info.title , '</a></h3>',
				this.format_list(items),
				'<div class="clip_paging">',
				'<span id="clip_prev" class="button" onclick="clip_overlay.prev_page()">前の20件 | </span>',
				'<span id="clip_next" class="button" onclick="clip_overlay.next_page()">次の20件</span>',
				'</div>',
			].join("");
		},
		rewrite: function(){
			var self = this;
			State.now = Math.floor(new Date / 1000);
			var rewrite = function(){
				var items = self.get_page();
				self.window.innerHTML = self.format(self.last_response, items);
				self.update_focus();
				// window.status = "rewrite";
				self.update_paging();
				if(browser.isOpera) self.redraw();
			};
			if(this.items.length > this.offset){
				rewrite();
			} else {
				this.load_items(rewrite)
			}
		},
		update_paging: function(){
			update("clip_next");
			update("clip_prev");
		},
		open_item: function(){
			if(!this.selected_item) return;
			window.open(this.get_item().link.unescapeHTML());
		},
		open_items: function(){
			var count = 0;
			this.get_selected_items().forEach(function(item){
				count++;
				if(count > Config.max_pin){
					return
				}
				window.open(item.link.unescapeHTML());
				item._selected = false;
			});
			this.rewrite();
		},
		make_window: function(){
			var div = $N('DIV');
			div.id = "clip_overlay";
			with(div.style){
				position   = "absolute";
				width      = "90%";
				height     = "90%";
				background = "#fff";
				lineHeight = "160%";
				zIndex     = "10000";
				border     = "4px solid #4889FD";
				padding    = "0px";
				overflow   = "auto";
			}
			div.innerHTML = "<div class='wait'>読み込み中</div>";
			return div
		},
		show: function(){
			show_overlay();
			var clip_window = this.make_window();
			document.body.appendChild(clip_window);
			centering(clip_window);
			this.window = clip_window;
			this.rewrite();
			State.clip_overlay = true;
			HotKey.use_only("clip_overlay");
		},
		hide: function(){
			// clear cache
			this.reset();
			HotKey.use_only("reader");
			DOM.remove("clip_overlay");
			hide_overlay();
			State.clip_overlay = false;
		},
		toggle: function(){
			State.clip_overlay ? this.hide() : this.show();
		},
		reset: function(){
			this.items = [];
			this.offset = 0;
			this.requested = 0;
			this.selected_index = 0;
		},
		as_singleton: function(){
			var self = this;
			keys(this).forEach(function(method){
				if(isFunction(self[method])){
					self[method] = self[method].bind(self)
				}
			});
			return this;
		},
		add_tag_form: function(){
			var tag = prompt("追加するタグを入力してください", this.recent_tag || "");
			if(!tag) return;
			this.recent_tag = tag;
			this.add_tag(tag);
		}.later(0), // delay for mozless
		remove_tag_form: function(){
			var tag = prompt("削除するタグを入力してください", this.recent_tag || "");
			if(!tag) return;
			this.recent_tag = tag;
			this.remove_tag(tag);
		}.later(0),
		add_tag: function(tag){
			var items = this.get_selected_items();
			if(items.length == 0){
				items = [this.get_item()]
			}
			var tags_to_append = TagParser.split_tags(tag);
			items.forEach(function(item){
				var orig_tags = Set(item.tags);
				var len = orig_tags.length;
				var union = orig_tags.union(tags_to_append);
				if(len != union.length){
					clip_progress.add_task(1);
					item.tags = union;
					sync_clip(item, function(){
						clip_progress.complete(1)
					});
				}
			});
		},
		remove_tag: function(tag){
			var items = this.get_selected_items();
			if(items.length == 0){
				items = [this.get_item()]
			}
			var lc = function(v){ return v.toLowerCase() };
			var tags_to_remove = TagParser.split_tags(tag).map(lc);
			items.forEach(function(item){
				var orig_tags = Set(item.tags.map(lc));
				var intersection = orig_tags.intersection(tags_to_remove);
				if(intersection.length){
					clip_progress.add_task(1);
					// 大文字小文字を維持するために手動で削除
					tags_to_remove.forEach(function(remove_tag){
						item.tags = item.tags.reject(function(orig){
							return lc(orig) == remove_tag
						})
					});
					sync_clip(item, function(){
						clip_progress.complete(1)
					});
				}
			});
		},
		toggle_private: function(){
			var items = this.get_selected_items();
			if(items.length == 0){
				items = [this.get_item()]
			}
			var turn;
			items.forEach(function(item, i){
				if(i==0){
					turn = !item["public"];
				}
				if(!!item["public"] != turn){
					clip_progress.add_task(1);
					item["public"] = turn;
					sync_clip(item, function(){
						clip_progress.complete(1);
					});
				}
			});
			this.rewrite();
		},
		delete_clip: function(){
			var postkey = this.postkey;
			var items = this.get_selected_items();
			if(items.length == 0){
				items = [this.get_item()]
			}
			var c = confirm(items.length + "件のクリップを削除してよろしいですか？");
			if(!c) return;
			items.forEach(function(item){
				if(!item._deleted){
					clip_progress.add_task(1);
					delete_clip(item, function(){
						clip_progress.complete(1);
					})
				}
			});
			this.unselect_all();
			this.rewrite();
			function delete_clip(item,callback){
				var api = new API("/clip/delete");
				api.post({
					link : item.link.unescapeHTML(),
					postkey : postkey
				}, function(){
					message("削除しました。");
					if(callback) callback();
				});
				item._deleted = true;
			}

		},
		make_item_from: function(item){
			var id = item.id;
			var classname = [];
			if(item._selected){
				classname.push("selected");
			}
			if(item._deleted){
				classname.push("deleted");
			}
			return [
				'<li id="', id, '"',
					' onmouseout="ListView.mouseout.call(this,event)"',
					' onmouseover="ListView.mouseover.call(this,event)"',
					' onmousedown="ListView.mousedown.call(this,event)"',
					' class="', classname.join(" "), '"',
				'>', this.item_formatter(item),
				'</li>'
			].join("");
		}
	});
	clip_overlay = new LDClip().as_singleton();
	clip_overlay.item_formatter = function(item){
		var classname = [];
		if(item["public"] == 0){
			classname.push("private");
		}
		return formatter(
			item,
			{classname:classname.join(" ")}
		);
	};
	var Progress = Class.create();
	Progress.extend({
		initialize: function(id){
			this.element_id = id;
			this.interval = 60;
			this.after_finish = [];
			this.reset();
		},
		reset : function(){
			this.old_value = 0;
			this.task_count = 0;
			this.complete_count = 0;
		},
		add_task: function(num){
			this.task_count += num;
			this.update();
		},
		complete: function(num){
			this.complete_count += num;
			this.update();
		},
		print: function(value){
			var el = $(this.element_id);
			if(el){
				el.innerHTML = value;
			}
		},
		oncomplete: function(){
			this.reset();
			var el = $(this.element_id);
			el.innerHTML = "<span class='progress_complete'>" + this.complete_text + "</span>";
			setTimeout(function(){
				el.innerHTML = '<span class="button" onclick="clip_overlay.hide()">閉じる</span>';
			}, 1000);
		},
		complete_text: "保存しました",
		update: function(){
			var self = this;
			clearInterval(this.timer);
			var new_value = Math.floor(100*this.complete_count/this.task_count);
			var step = Math.floor((new_value - this.old_value) / 5);
			this.timer = setInterval(function(){
				self.old_value += step;
				if(self.old_value >= new_value){
					clearInterval(self.timer);
					self.print(new_value + "%");
					if(self.task_count == self.complete_count){
						self.oncomplete();
					}
				} else {
					self.print(self.old_value + "%");
				}
			}, this.interval);
		}
	});
	var clip_progress = new Progress("clip_progress");
	updater("clip_next", function(){
		if(!clip_overlay.total_count){
			this.style.display = "inline";
			return
		}
		if(clip_overlay.total_count < (clip_overlay.offset + clip_overlay.limit)){
			this.style.display = "none";
		}
	});
	updater("clip_prev", function(){
		if(clip_overlay.offset >= clip_overlay.limit){
			this.style.display = "inline";
		} else {
			this.style.display = "none";
		}
	});
	function sync_clip(item, callback){
		var api = new API("/clip/add");
		var onload = function(json){
			message("保存しました");
			if(callback) callback();
		};
		var param = Object.extend({}, item);
		param["public"] = param["public"] ? "on" : "off";
		param.link  = item.link.unescapeHTML();
		param.title = item.title.unescapeHTML();
		param.tags  = item.tags.join(" ");
		// param.from  = "reader";
		api.post(param, onload);
	}
	var kb = {
		"C": clip_overlay.hide,
		">": clip_overlay.next_page,
		"<": clip_overlay.prev_page,
		"j|down": clip_overlay.next_item,
		"k|up": clip_overlay.prev_item,
		"v": clip_overlay.open_item,
		"o": clip_overlay.open_items,
		"t": clip_overlay.add_tag_form,
		"T": clip_overlay.remove_tag_form,
		"S": clip_overlay.toggle_private,
		"p|space": clip_overlay.toggle_select,
		"shift+space": clip_overlay.range_select,
		"shift+down|J": clip_overlay.select_and_next_item,
		"shift+up|K"  : clip_overlay.select_and_prev_item,
		"delete": clip_overlay.delete_clip
	}
	each(kb, function(f, key){
		Keybind_clip.add(key, f);
	});
	var toggle_clip_overlay = function(){clip_overlay.toggle()}
	register_hook('AFTER_INIT', function(){
		Keybind.add("C", toggle_clip_overlay);
	});
})();




// set data type for javascript
function Set(a){
	if(a.isSet) return a;
	var self;
	var index = {};
	self = [];
	self.isSet = true;
	self.add = function(v){
		if(self._has(v)) return;
		self.push(v);
		index[(typeof v) + "_" + v] = true;
		return self;
	};
	self._has = function(v){
		return index.hasOwnProperty((typeof v)+"_"+v)
	};
	var can_set = function(v){
		var t = typeof v;
		return (t == "string" || t == "boolean" || t == "number");
	};
	var invert = function(f){
		return function(){
			return !f.apply(this,arguments)
		}
	}
	a.filter(can_set).forEach(self.add);
	
	// s <= t
	self.issubset = function(t){return self.every(t._has)};
	// s >= t
	self.issuperset = function(t){return t.every(self._has)};
	// s | t
	self.union = function(t){return new Set(self.concat(t))};
	// s & t
	self.intersection = function(t){return new Set(self.filter(t._has))};
	// s - t
	self.difference = function(t){return new Set(self.filter(invert(t._has)))};
	// s ^ t
	self.symmetric_difference = function(t){
		//return new Set(self.union(t).difference(self.intersection(t)));
		return new Set(self.concat(t).filter(function(v){return (!self._has(v) || !t._has(v))}));
	};
	// convert array to set object
	var conv = function(f){
		return function(t){
			t = new Set(t);
			return f(t)
		}
	};
	var methods = "issubset,issuperset,union,intersection,difference,symmetric_difference".split(",");
	methods.forEach(function(v){
		self[v] = conv(self[v])
	});

	self.copy = function(){
		return new Set(self.concat())
	};
	self.update = function(t){
		t.forEach(self.add);
		return self;
	};
	self.intersection_update = function(t){
		self.clear();
		self.update(self.intersection(t))
		return self;
	};
	self.difference_update = function(t){
		self.clear();
		self.update(self.difference());
		return self;
	}
	self.symmetric_difference_update = function(){
		self.clear();
		self.update(self.symmetric_difference());
		return self;
	}
	self.discard = function(v){
		var pos = self.indexOf(v);
		if(pos != -1){
			return self.splice(pos,1)
		}
	}
	self.remove = self.discard;
	self.clear = function(){
		self.length = 0;
		index = {};
		return self;
	};
	return self;
}

var TagParser = {};
TagParser.split_tags = function(){
	var str = arguments[0];
	if(str instanceof Array){
		str = str.join(" ");
	}
	str = str.replace(/[\r\n]/g,"");
	str = str.replace(/　/g," ");
	var tags = str.match(/(\[(?:[^\[\]])*?\])|(\S+)/g);
	if(!tags) return null;
	for(var i=0;i<tags.length;i++){
		var t = tags[i];
		if(/^\[(.*)\]$/.test(t)){
			tags[i] = t.slice(1,-1);
		};
	}
	return tags;
};

/*
 for guest mode
*/
(function(){
	if(location.pathname.indexOf("/public") != 0) return;
	State.guest_mode = true;

	// default settings for guest mode
	Config.view_mode = "flat";
	Config.sort_mode = "modified_on";
	Config.use_limit_subs = 1;
	Config.limit_subs = 200;
	var log = function(){};
	/*
	if(typeof console != "undefined"){
		if(typeof console.log == "function")
			log = function(a){
				console.log(a);
			}
	}
	*/

	function is_supported_api(ap){
		var base = ap.replace(/\?.*/, "");
		// clip api
		if(/\/clip\//.test(base)){
			return true;
		}
		return guest_api_path.hasOwnProperty(base);
	}
	function replace_api(ap){
		var base = ap.replace(/\?.*/, "");
		if(guest_api_path.hasOwnProperty(base)){
			var guest = guest_api_path[base];
			return ap.replace(base, guest);
		}
		return ap;
	}
	var guest_api_path = {
		'/api/subs' : "/share_api/subs",
		'/api/all'  : "/share_api/all",
		'/api/unread' : "/share_api/all"
	};
	var null_callback = function(){
		message('しかしなにもおこらなかった');
	};
	var replace_callback = {
		'/api/feed/unsubscribe' : null_callback,
		'/api/config/save' : function(){message('設定は保存されません')}
	};
	var m = location.pathname.match(/public\/(.*)/);
	if(m){
		var livedoor_id = m[1];
		log(livedoor_id);
		API.StickyQuery.users = livedoor_id;
	}
	API.prototype.initialize = function(ap){
		if(is_supported_api(ap)){
			this.ap = replace_api(ap);
		} else {
			this.post = function(param,onload){
				log(ap);
				if(replace_callback.hasOwnProperty(ap)){
					replace_callback[ap](param);
				} else if(onload){
					onload();
				}
			}
		}
	};

	$("subs_toolbar").style.display = "none"
	$("subs_buttons").style.display = "none";
	$("subs_search").style.paddingTop = "6px";
	addClass("right_body", "guest_mode");

	register_hook('AFTER_INIT', function(){
		ClickEvent.remove('[rel=subscribe]');
		ClickEvent.remove('[rel=unsubscribe]');
		ClickEvent.remove('[rel=discover]');
		ClickEvent.remove('a[href~/subscribe/]');
		entry_widgets.remove('subs_button');
	});

})();

(function(){
	var now = new Date - 0;
	if(now > 1167058800000) return;
	LoadEffect.Stop = function(){
		var L = LoadEffect;
		$("loadicon").src = "/img/icon/xmas2006/xmas1.gif";
	};
})();

new function(){
	var AutoPlay = false;
	var LastClicked;
	var target = 'footer';
	var now = {valueOf: function(){return new Date - 0}};

	var click = function(e){
		// IE
		if(e.button == 2){
			return Event.stop(e);
		}
		Event.stop(e); Control.go_next();
		if(AutoPlay){
			AutoPlay.cancel();
		}
		if(LastClicked){
			// message(now - LastClicked);
			var interval = now - LastClicked;
			AutoPlay = function(){
				Control.go_next();
				AutoPlay = arguments.callee.later(interval)();
			}.later(interval)();
		}
		LastClicked = new Date - 0;
	};
	var MouseDownEvent = new Trigger("mousedown");
	MouseDownEvent.add('div', click);
	MouseDownEvent.apply(target);

	var RightClickEvent = new Trigger("contextmenu");
	RightClickEvent.add('div', function(e){ Event.stop(e); Control.go_prev(); });
	RightClickEvent.apply(target);

	var MouseUpEvent = new Trigger("mouseup");
	MouseUpEvent.add('div', function(e){
		AutoPlay && AutoPlay.cancel();
	});
	MouseUpEvent.apply(target);

	var last_wheel = 0;
	var ignore_msec = 400;
	var WheelDown = new Trigger("wheeldown");
	WheelDown.add('div', function(e){
		if(now - last_wheel > ignore_msec){
			Control.read_next_subs();
			last_wheel = now - 0;
		}
	});
	WheelDown.apply(target);

	var WheelUp = new Trigger("wheelup");
	WheelUp.add('div', function(e){
		if(now - last_wheel > ignore_msec){
			Control.read_prev_subs();
			last_wheel = now - 0;
		}
	});
	WheelUp.apply(target);

	Event.observe($(target), 'selectstart', click);
};



// translate
function tl(str){
	str = "" + str;
	var t = getText(str) || getText(str.toLowerCase());
	return (t) ? t : str;
}

// for English mode
if(typeof Language != 'undefined' && Language == 'English'){
	function fit_screen(){
		var leftpane_width = State.leftpane_width;
		if(State.fullscreen) return fit_fullscreen();
		DOM.hide("footer");
		var body_h = document.body.offsetHeight;
		var top_padding    = $("container").offsetTop;
		// var bottom_padding = $("footer").offsetHeight - 20;
		var bottom_padding = 0 - 20;
		var ch = body_h - top_padding - bottom_padding - 4;
		State.container_height = ch;
		style_update(/container/);
	}
	style_updater("left_container", function(){
		setStyle(this,{
			display : State.show_left ? "block": "none",
			width   : State.leftpane_width   + "px",
			height  : State.container_height + 33 + "px"
		});
	}._try());

	style_updater("subs_container", function(){
		var h = State.container_height - $("subs_tools").offsetHeight;
		setStyle(this,{
			display : State.show_left ? "block": "none",
			width   : State.leftpane_width + "px",
			height  : h + 33 +"px"
		})
	}._try());

	style_updater("right_container", function(){
		var border_w = 2;
		var border_h = 0;
		if(navigator.userAgent.indexOf("MSIE 7") != -1){
			border_w = 6;
			border_h = 2;
		}
		setStyle(this,{
			 height : State.container_height - border_h + "px",
			 width  : document.body.offsetWidth - State.leftpane_width - border_w + "px"
		});
	}._try());

	Number.prototype.toRelativeDate = function(){
		var k = this > 0 ? this : -this;
		var u = "second";
		var vec = this >= 0 ? "ago" : "after";
		var st = 0;
		(k>=60) ? (k/=60,u="minute",st=1) : 0;
		(st && k>=60) ? (k/=60,u="hour",st=1) : st=0;
		(st && k>=24) ? (k/=24,u="day" ,st=1) : st=0;
		(st && k>=30) ? (k/=30,u="month" ,st=1) : st=0;
		k = Math.floor(k);
		v = u;
		return (isNaN(k)) ? "nan" : k +" "+ v + ((k>1)?"s":"") + " " + vec;
	};
	Control.open_keyhelp = function(){
		var old_state = State.keyhelp_more;
		State.keyhelp_more = true;
		var w = window.open("","keyhelp","width=580,height=400");
		w.document.write([
			"<style>",
			"*{font-size:12px;font-weight:normal;line-height:150%}",
			"tr,td{vertical-align:top}",
			"kbd{border:1px solid #888;padding:2px}",
			"div{display:none}",
			"</style>",
			format_keybind()
		].join(""));
		w.document.close();
		State.keyhelp_more = old_state;
	};
	show_tips.text = "What's up?";
	function ld_check(){
		var c = document.cookie;
		return c.indexOf("reader_sid") != -1;
	}
}






// ------------------------------
// END OF reader_addon.js
// ------------------------------

