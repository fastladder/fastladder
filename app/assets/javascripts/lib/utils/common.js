//= require i18n
//= require i18n/translations
I18n.locale = (function() {
	var root = document.lastChild;
	var lang = root.getAttribute('xml:lang') || root.getAttribute('lang') || I18n.defaultLocale;
	return lang.split('-')[0];
})();
I18n.defaultSeparator = '/';
I18n.missingTranslation = function(scope) {
	return scope;
};

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


/*
 良く使う関数
*/

var GLOBAL = this;

// bench
function _$(el){
	//return typeof el == 'string' ? document.getElementById(el) : el;
	if(typeof el == 'string'){
		return (_$.cacheable[el])
			? _$.cache[el] || (_$.cache[el] = document.getElementById(el))
			: document.getElementById(el)
	} else {
		return el
	}
}

_$.cache = {};
_$.cacheable = {};

function getlocale(){
	return I18n.locale;
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
	element = _$(element);
	var cl = element.className;
	var cls = cl.split(/\s+/);
	return cls.indexOf(classname) != -1;
}
function addClass(element,classname){
	element = _$(element);
	var cl = element.className;
	if(!contain(cl,classname)){
		element.className += " " + classname;
	}
}
function removeClass(element,classname){
	element = _$(element);
	var cl = element.className;
	var cls = cl.split(/\s+/);
	element.className = cls.remove(classname).join(" ");
}
function switchClass(element, classname){
	element = _$(element);
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
	element = _$(element);
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
	form = _$(form);
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
		_$(el).disabled = "disabled";
	},
	enable: function(el){
		_$(el).disabled = "";
	},
	disable_all: function(el){
		el = _$(el);
		Form.disable(el);
		var child = el.getElementsByTagName("*");
		foreach(child, Form.disable);
	},
	enable_all: function(el){
		el = _$(el);
		Form.enable(el);
		var child = el.getElementsByTagName("*");
		foreach(child, Form.enable);
	}
});


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
    source = _$(source);
    target = _$(target);
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
    source = _$(source);
    var p = Position.page(source);

    // find coordinate system to use
    target = _$(target);
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
    element = _$(element);
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
    element = _$(element);
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
	element = _$(element);
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

 api["config/load"] = new LDR.API("/api/config/load").requester("post");
 new Task(loadconfig);
 LDR.API.prototype.toTask = function(){

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
	var api = new LDR.API("/api/config/load");
	return api.post({},function(res){
		extend(app.config,res);
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
	element = _$(element), ancestor = _$(ancestor);
    while (element = element.parentNode)
      if (element == ancestor) return true;
    return false;
}
function _$ref(element){
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
				get_func(label).call(_$(label));
			})
		} else {
			return get_func(label).call(_$(label));
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

var Element = {
	show: function(el){
		if(el) el.style.display = "block"
	}.forEachArgs(_$),
	hide: function(el){
		if(el) el.style.display = "none"
	}.forEachArgs(_$),
	toggle: function(el){
		el = _$(el);
		el.style.display = (el.style.display != "block") ? "block" : "none";
	},
	childOf: function(){},
	getStyle : getStyle
};

