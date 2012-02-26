// API
API.StickyQuery = { ApiKey: ApiKey };
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
	State.help_message = [
		'新着のみの表示にすると動作が軽くなります<br>現在 :',
		(Config.show_all ? '無効':'有効')
	].join("");
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
setup_hook();

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
/*
 Error message
*/
var error_message = {};
error_message.login = {
	title : "ログインしてください",
	body : "<p>ブラウザをリロードして再度ログインしてください。</p>"
};
error_message.xmlhttp = {
	title : "お使いのブラウザは動作対象外です",
	body : "<p>ブラウザのバージョンが古いためご利用いただけません。</p>"
};
error_message.busy = {
	title : "データの受信に失敗しました",
	body : "<p>サーバーが混雑している可能性があります。<br>しばらく時間をおいてから再度アクセスしてください。</p>"
};

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
		(item.folder ? item.folder.ry(8,"...") : "未分類"),
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
	this.innerHTML = "未読 [[feed_count]]フィード&nbsp;&nbsp;|&nbsp;&nbsp;[[count]]エントリ".fill(param);
	if(!State.guest_mode){
		document.title = "livedoor Reader ([[count]])".fill(param);
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
});

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
			if(el.innerHTML == "追加"){
				el.innerHTML = "解除"
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
			if(el.innerHTML == "解除"){
				el.innerHTML = "追加"
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
	confirm(
		info ? "「[[title]]」の登録を解除しますか？".fill(info) : "登録を解除しますか"
	) && api.post(
		{subscribe_id:sid},function(res){
			message("購読停止しました");
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
			message("既読にしました");
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
		name = prompt("フォルダ名","");
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
			'※ショートカットキーが使えない場合は日本語入力を無効にしてみてください。',
		'</div>',
		'<div class="keyhelp_more">',
			'<span class="button"r onclick="Control.open_keyhelp.call(this,event)">' + tl('Open in window') + '</span>',
			'<span class="button" onclick="Control.toggle_more_keyhelp.call(this,event)">'+ 
			 (State.keyhelp_more ? tl('Hide') : tl('Show More') + '...') + '</span>',
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
		var menus = [
			{title:"livedoor Reader Guide", action:"init_guide()"},
			{title:"設定変更", action:"init_config()"},
			{title:"フィードの整理", action:"init_manage()"},
			sep,
			{title:"本文の表示 / 非表示の切替", action:"Control.compact()"},
			{title:"新着順 / 旧着順表示の切替", action:"Control.reverse()"},
			sep,
			{title:"全て読んだことにする", action:"Control.mark_all_read()"}
		];
		var tmpl = Template.get("menu_item").compile();
		var write_menu = function(){
			menu.clear();
			foreach(menus,function(v,i){
				v == sep 
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
				'リスト出力 (',pin.pins.length,'件)</span>'
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
				'クリア</span>'
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
			 ? '古い記事が上に表示されます。'
			 : '新しい記事が上に表示されます。'
		);
		rewrite_feed();
	},
	compact: function(){
		var o = get_active_item();
		toggleClass("right_body", "compact");
		if(contain($("right_body").className, "compact")){
			message("本文を非表示にしました。cで元に戻ります")
		} else {
			message("本文を表示しました。cで隠せます")
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
				(folder ? folder + "に移動しました" : "未分類にしました")
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
				'新規フォルダ</span>'
			].join(""));
			menu.add(tmpl({
				folder_name : "未分類",
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
				'購読停止</span>'
			].join(""));
			menu.update();
		};
		if(folder){
			write_menu();
		} else {
			menu.add("読み込み中");
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
			writing_complete() && message("最後だよ");
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
				message("最後のフィードです。sキーで先頭に戻ります");
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
		if(list.length == 0){
			alert("既読にすべきフィードがありません");
			return;
		}
		var post_list = list.filter(function(id){
			var info = subs_item(id);
			if(!info) return false;
			return (info.unread_count > 0) ? true : false;
		});
		if(post_list.length == 0){
			alert("既読にすべきフィードがありません");
			return;
		}
		var c = confirm("[[count]]件のフィードを既読にします。よろしいですか？".fill({
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
			message("既読にしました");
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
		message("追加しました");
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
				name : min +"人 - "+ max + "人",
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
					message("読み込みを中断しました");
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
					message('ロード中 ' + (count+1) + " - " + (count+limit));
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
				message('ロード完了');
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
	setStyle(this,{
		 height : State.container_height + "px",
		 width  : document.body.offsetWidth - State.leftpane_width - 2 + "px"
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
		var roma = new Roma();
		var query;
		try{
			query = new RegExp(roma.toRegExp(q),"i");
			//window.status = query;
		} catch(e){
			query = q;
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
			var users = item.subscribers_count > 1 ? "users" : "user";
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
				return v ? v.ry(8,"...") : "未分類"
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
			relative_date : (v.created_on) ? (Now-v.created_on).toRelativeDate() : "日時不明",
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
	ahah("/contents/config.html", "right_body", function(){
		switchClass("right_container", "mode-config");
		Control.scroll_top();
		Form.fill("config_form", Config);
		ajaxize("config_form",{
			before: function(){return true},
			after: function(res,req){
				message("設定を保存しました");
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

