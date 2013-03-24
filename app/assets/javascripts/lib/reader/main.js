window.onload   = init;
window.onresize = function(){LDR.invoke_hook('WINDOW_RESIZE')};

var app = LDR.Application.getInstance();

// API Key
(function(){
	LDR.API.StickyQuery = { ApiKey: ApiKey };
	function getApiKey(){
	    var ck = new Cookie().parse();
	    for(var key in ck){
	        if(/_sid/.test(key)){
	            return ck[key]
	        }
	    }
	};
	if(/^\[/.test(ApiKey)){
	    LDR.API.StickyQuery = { ApiKey: getApiKey() };
	}
}).call(LDR);


/*
 browser
*/
// TODO replace $.browser
var browser = new BrowserDetect;

/*
 Global

*/
// 記事を読み込む順番

function typecast_config(obj){
	each(obj, function(value,key){
		if(!LDR.TypeofConfig[key]) return;
		// "0" を falseに。
		switch(LDR.TypeofConfig[key]){
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
	foreach(_$(base).getElementsByTagName("*"), function(el){
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

var Keybind;
function IME_off(msg){
    if(!browser.isFirefox || !browser.isWin) return;
    var s = $N("span");
    s.innerHTML = '<input type="password" id="ime_off" style="visibility:hidden">';
    document.body.appendChild(s);
    setTimeout(function(){
        var el = _$("ime_off");
        if(el){
            el.focus();
            document.body.removeChild(s);
            Keybind.lastInvoke = null;
            if(msg)
                message("IMEをオフにしました");
        }
    }._try(),10);
}

function getStyle(element, style){
	element = _$(element);
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
	_$("message").innerHTML = I18n.t(str) || str;
}

app.state.last_items = {};

function format_keybind(){
	var help = [];
	var kbd = function(str){
		var list = str.split("|");
		if(!app.state.keyhelp_more){list = [list[0]]};
		return list.map(function(v){
			if(/\w/.test(v) && v == v.toUpperCase()){
				v = "shift+" + v.toLowerCase();
			}
			v = v.replace("+down","+↓");
			v = v.replace("+up","+↑");
			return v.aroundTag("kbd");
		}).join("<br>");
	};
	LDR.KeyHelpOrder.forEach(function(row, num){
		if(!app.state.keyhelp_more && num > 1) return;
		help.push("<tr>");
		row.forEach(function(f){
			var l  = LDR.KeyHelp[f];
			var kb = LDR.KeyConfig[f];
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
			I18n.t('notice_ime_off'),
		'</div>',
		'<div class="keyhelp_more">',
			'<span class="button"r onclick="Control.open_keyhelp.call(this,event)">' + I18n.t('Show in window') + '</span>',
			'<span class="button" onclick="Control.toggle_more_keyhelp.call(this,event)">'+
			 (app.state.keyhelp_more ? I18n.t('Compact') : I18n.t('More') + '...') + '</span>',
		'</div>',
		'</div>',
		'<div class="keyhelp_hide">',
			'<span class="button" onclick="Control.hide_keyhelp.call(this,event)">' + I18n.t('Close') + '</span>',
		'</div>'
	];
	return table + button.join("");
}


function check_wait(){
	if(app.config.use_wait != 1) return false;
	var st = check_wait.state;
	var key = Keybind.lastInput;
	// 初回
	if(!st[key]){
		st[key] = new Date;
		return false;
	} else {
		var now = new Date;
		if(now - st[key] > app.config.wait){
			st[key] = new Date;
			return false;
		} else {
			return true
		}
	}
}

check_wait.state = {};
app.pin = new Pin;


//prefetch
function prefetch(sid,count){
	var max_prefetch = LDR.VARS.MaxPrefetch;
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
	if(subs_item(sid).unread_count == 0 && app.config.show_all == true){
		var api = new LDR.API("/api/all");
		api.post({
			subscribe_id : sid,
			offset : 0,
			limit  : 1
		}, store_cache);
	} else {
		var api = new LDR.API("/api/unread?prefetch");
		api.post({ subscribe_id : sid }, store_cache);
	}
}

function get_prefetch_num(){
	var prefetch_num;
	if(app.config.use_prefetch_hack){
		prefetch_num = app.config.prefetch_num;
		if(0 <= prefetch_num && prefetch_num <= LDR.VARS.MaxPrefetch){
			return prefetch_num;
		} else {
			return LDR.VARS.DefaultPrefetch;
		}
	} else {
		return LDR.VARS.DefaultPrefetch;
	}
}
function get_next_group(){
	var prefetch_num = get_prefetch_num();
	if(prefetch_num == 0) return null;
	var sid = app.state.now_reading;
	if(!sid && Ordered.list){
		return Ordered.list[0].slice(0, prefetch_num - 1);
	}
	var list = Ordered.list;
	if(!list) return;
	var offset = list.indexOfStr(sid);
	var next_group = list.slice(offset + 1, offset + prefetch_num + 1);
	return next_group;
}


//scroll_hilight event register
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
		target = _$("item_count_" + item.offset);
		addClass(target, "hilight");
	}
}
Event.observe(_$('right_container'), 'scroll', function(){
	if(app.config.use_scroll_hilight){
		clearTimeout(timer);
		timer = setTimeout(update_hilight,100);
	}
});


function writing_complete(){
	if(app.state.writer && app.state.writer.complete == false){
		return false;
	}
	if(app.state.writer2 && app.state.writer2.complete == false){
		return false;
	}
	return true;
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


// 未読の記事のキャッシュ
var UnreadCache = new Cache({max : 30});

// 先頭の未読
function get_head(){
	var list = Ordered.list;
	if(!list) return;
	var i = list.indexOfA(function(sid){
		var item = subs_item(sid);
		return (item.unread_count && app.state.now_reading != item.subscribe_id);
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
		return (item.unread_count && app.state.now_reading != item.subscribe_id);
	});
	if(i == -1){return list[0]}
	return list[i] || list[0];
}
// 次のアイテム
function get_next(){
	var sid = app.state.now_reading;
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
	var sid = app.state.now_reading;
	if(!sid && Ordered.list){
		return Ordered.list[0];
	}
	var list = Ordered.list;
	if(!list) return;
	var offset = list.indexOfStr(sid);
	var prev = list[offset-1];
	return prev;
}

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



/*

*/
Class.Traits["view"] = {
	initialize: function(element){
		this.element = _$(element);
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

//**
LDR.VARS.USE_PARTIAL_LOAD = true;
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
			app.state.subs_reloading = true;
			LDR.invoke_hook('BEFORE_SUBS_LOAD');
			new LDR.API("/api/subs?unread="+(app.config.show_all ? 0 : 1)).post({},
			function(list){
				self.loaded = true;
				app.state.subs_reloading = false;
				console.log(self,self.model);
				self.model.load(list);
				self.sort();
				self.update();
				LDR.invoke_hook('AFTER_SUBS_LOAD');
			});
		}
	},
	update: function(reload_flag){
		if(!LDR.VARS.USE_PARTIAL_LOAD){
			return this._update.apply(this, arguments);
		}
		var self = this;
		if((!reload_flag && this.loaded) || this.readyState >= 3){
			this.show();
			update("total_unread_count");
		} else {
			self.readyState = 0;
			if(app.state.subs_loader){
				app.state.subs_loader.cancel();
			}
			app.state.subs_reloading = true;
			app.state.load_progress = true;
			app.state.subs_loader = {
				cancel: function(){
					message("Aborted.");
					canceled = true;
				}
			};
			LDR.invoke_hook('BEFORE_SUBS_LOAD');
			self.model.load_start();
			var canceled = false;
			var from_id = 0;
			var is_first = 1;
			var allways_flush = 1;
			var writed = 0;
			var limit1 = LDR.VARS.SubsLimit1; // 100;
			var limit2 = LDR.VARS.SubsLimit2; // 200;
			var limit = limit1;
			var list = [];
			var count = 0;
			var load_request = function(){
				limit = is_first ? limit1 : limit2;
				is_first = 0;
				var api = new LDR.API([
					"/api/subs?",
					"unread=", (app.config.show_all ? 0 : 1),
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
					message(I18n.t('Loading .. ') + (count+1) + " - " + (count+limit));
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
				app.state.load_progress = false;
				app.state.subs_reloading = false;
				app.state.subs_loader = null;
				//if(!writed){
					self.model.load_data(list);
					self.sort();
					self.update();
				//} else {
				//	update("total_unread_count");
				//}
				LDR.invoke_hook('AFTER_SUBS_LOAD');
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
		var tmp = app.config.sort_mode.split(':');
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
			var mode = app.config.view_mode;
			var data = this.model;
		}
		this.view.clear();
		this.view.setClass(mode);
		this.view.print( SF[mode](data) );
		_$("subs_container").scrollLeft = 0;
		if(app.state.now_reading){
			set_focus(app.state.now_reading)
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
		display : app.state.show_left ? "block": "none",
		width   : app.state.leftpane_width   + "px",
		height  : app.state.container_height + "px"
	});
}._try());

style_updater("subs_container", function(){
	var h = app.state.container_height - _$("subs_tools").offsetHeight;
	setStyle(this,{
		display : app.state.show_left ? "block": "none",
		width   : app.state.leftpane_width + "px",
		height  : h + "px"
	})
}._try());

style_updater("right_container", function(){
	var border_w = 2;
	setStyle(this,{
		 height : app.state.container_height + "px",
		 width  : document.body.offsetWidth - app.state.leftpane_width - border_w + "px"
	});
}._try());


var has_subscribe_id = has_attr("subscribe_id");


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
		_$("loadicon").src = show_tips.icon;
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
		_$("loadicon").src = path;
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
		_$("loadicon").src = path;
	}
};

/*
 初期化処理
*/

function init_manage(){
	if(app.state.guest_mode){
		message('この機能は使えません');
		return;
	}
	switchClass("right_container","mode-manage");
	ahah("/contents/manage","right_body",function(){
		get_folders(function(){
			update("manage_item");
			update("manage_folder");
		});
	});
}

function init_config(){
// var State = new LDR.StateClass;
	ahah("/contents/config", "right_body", function(){
		switchClass("right_container", "mode-config");
		Control.scroll_top();
		Form.fill("config_form", app.config);
		ajaxize("config_form",{
			before: function(){return true},
			after: function(res,req){
				message("Your settings have been saved");
				typecast_config(req);
				Object.extend(app.config, req);
			}
		});
		TabClick.call(_$("tab_config_basic"));
		LDR.invoke_hook('AFTER_INIT_CONFIG');
	});
}

function init_guide(){
	ahah("/contents/guide", "right_body", function(){
		switchClass("right_container", "mode-guide");
		Control.scroll_top();
		LDR.invoke_hook('AFTER_INIT_GUIDE');
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

function init(){
	app.load({}, function(){
		LDR.setup_hook();
		LDR.invoke_hook('BEFORE_INIT');
		window.onerror = function(a,b,c){
			_$("message").innerHTML = [a,b,c];
			return false;
		}

		app.state.leftpane_width = LDR.VARS.LeftpaneWidth;

		DOM.show("container");
		DOM.show("footer");
		fit_screen();
		DOM.show("right_container");

		LDR.API.registerCallback({
			Create  : LoadEffect.Start,
			Complete: LoadEffect.Stop
		});


		subs = new Subscribe.Controller({
			model : new Subscribe.Model,
			view  : new Subscribe.View("subs_body")
		})

		app.finder = new Finder("finder");
		app.finder.clear();
		app.finder.add_callback(function(q){
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
		LDR.setup_hotkey();

		// ajaxize
		ajaxize("discover_form",{
			before:function(){
				var output = _$("discover_items");
				output.innerHTML = [
					'<div class="discover_loading">',
					'<img src="/img/icon/loading.gif">　',
					I18n.t("print_discover_loading"),
					'</div>'
				].join("");
				return true;
			},
			after: print_discover
		});

		(function(){
			load_content();
			LDR.invoke_hook('BEFORE_CONFIGLOAD');
			app.config.load(function(){
				LDR.invoke_hook('AFTER_CONFIGLOAD');
				subs.update();
			});
		}).later(10)();
		LDR.invoke_hook('AFTER_INIT');

	});
}

function print_discover(list){
	var output = _$("discover_items");
	var sub   = Template.get("discover_select_sub").compile()
	var unsub = Template.get("discover_select_unsub").compile()
	if(list.length == 0){
		output.innerHTML = [
			'<div class="discover_loading"><img src="/img/icon/orz.gif">　',
			I18n.t('print_discover_notfound'),
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
	var el = _$("subs_item_"+id);
	if(app.state.last_element){
		removeClass(app.state.last_element, "fs-reading");
		touch(app.state.last_id, "onclose");
	}
	if(el){
		app.state.last_element = el;
		app.state.last_id = id;
		switchClass(el, "fs-reading");
		if(app.config.view_mode != "flat"){
			var tvroot = QueryCSS.findParent(function(){
				return /^treeview/.test(this.id)
			},el);
			tv = TreeView.get_control(tvroot.id);
			tv && tv.open()
		}
		var sc = _$("subs_container");
		sc.scrollTop = el.offsetTop - _$("subs_container").offsetTop - 64;
		sc.scrollLeft = 0;
	}
	// window.status = "sid = " + id;
}


function QueryCSS(){}
QueryCSS.findParent = function(rule,element){
	elememt = _$(element);
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
	app.state.viewrange.start = 0;
	app.state.has_next = true;
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
		var api = new LDR.API("/api/all");
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
LDR.VARS.PrefetchTimeout = 2000;
LDR.VARS.LockTimeout = 2000;
function get_unread(id,callback){
	app.state.viewrange.start = 0;
	app.state.has_next = true;
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
				} else if(now - start > LDR.VARS.PrefetchTimeout){
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
		var api = new LDR.API(api_url);
		var success = false;
		set_focus(id)
		api.post({ subscribe_id : id }, function(data){
			success = true;
			get_unread.cache.set(id,data);
			print_feed.next(callback)(data);
		});
		// release lock
		setTimeout(function(){
			if(!success){app.state.requested = false}
		}, LDR.VARS.LockTimeout);
	}
	function prefetch_timeout(){
		// unlock
		app.state.requested = false;
		api_url = '/api/unread?timeout';
		no_cache();
	}
	get_unread.cache.has(id) ? has_cache() : no_cache();
}

get_unread.cache = new Cache({max:50});

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

function fix_linktarget(el){
	el = el || _$(print_feed.target);
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

