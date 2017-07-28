/* LDR /subscribe/ */

LDR.API.StickyQuery = { ApiKey: ApiKey };
var LDReader = {};

LDReader.Folder = Class.create();
LDReader.Folder.create = function(name, callback){
	var api = new LDR.API("/api/folder/create");
	api.post({name:name},function(res){
		// if(res.isSuccess){callback()}
		callback();
	});
};



var ReaderSubscribe = Class.create();
ReaderSubscribe.extend({
	initialize: function(){

	},
	get_feedlinks: function(){
		return Array.filter(document.getElementsByTagName("input"),function(el){
			return el.name == "feedlink"
		}).map(function(el){return el.value});
	},
	get_baseurl : function(){
		return "http://" + location.host + "/subscribe/";
	},
	get_target_url: function(){
		return _$("target_url").value;
	},
	unsubscribe: function(subscribe_id, callback){
		var self = this;
		var url = this.get_target_url();
		var base = this.get_baseurl();
		var onload = function(){
			// location.href = base + url;
			location.href = location.href;
		}
		var api = new LDR.API("/api/feed/unsubscribe");
		api.post({subscribe_id:subscribe_id}, function(res){
			onload();
		});
	},
	subscribe: function(option, callback){
		var api = new LDR.API("/api/feed/subscribe");
		var param = {
			feedlink	: option.feedlink,
			rate			: option.rate,
			"public"	: option["public"]
		};
		if(option.folder_id != "0" && option.folder_id != 0){ param.folder_id = option.folder_id; }
		api.post(param, callback);
	},
	get_backurl: function(){
		var base = ReaderSubscribe.get_baseurl();
		// 無視するリファラ
		var ignore_list = ['http://member.livedoor.com/', base];
		var param = ReaderSubscribe.get_target_url();
		var feedlinks = ReaderSubscribe.get_feedlinks();
		var ref = document.referrer;
		if(ref && ignore_list.every(function(v){return ref.indexOf(v) == -1})){
			return ref;
		}
		if(feedlinks.indexOf(param) == -1){
			return param
		}
		return null
	}
});

ReaderSubscribe = new ReaderSubscribe;

function message(){

}

function subs_delete(e){
	var sid = this.id.replace(/.*?_/,"");
	Event.stop(e);
	this.setAttribute("disabled","disabled");
	this.className += " loading_button";
	ReaderSubscribe.unsubscribe(sid);
}


function subs_edit(e){
	var el = this;
	if(e){
		Event.stop(e);
	}
	if(_$("subs_edit_window")){
		subs_edit.hide();
		if(subs_edit.current_button == el){
			return
		}
	}

	subs_edit.current_button = el;
	addClass(el, "toggle-on");
	el.blur();
	var sid = this.getAttribute("rel").split(":")[1];
	if(!subs_edit.template){
		var retry = function(){subs_edit.call(el)};
		ajax([subs_edit.template_url, (new Date()).getTime()].join("?"), function(res){
			subs_edit.template = res;
			retry();
		});
		return;
	}
	var api = new LDR.API("/api/feed/subscribed");
	var tmpl = new Template(subs_edit.template).compile();
	var pos = Position.cumulativeOffset(el);
	var w = document.createElement("div");
	w.id = "subs_edit_window";
	with(w.style){
		position    = "absolute";
		border      = "1px solid #000";
		background  = "#fff";
		padding     = "10px";
		left = pos[0] + "px";
		top  = pos[1] + el.offsetHeight + 4 + "px";
		textAlign = "left";
		fontSize  = "80%";
		width     = "300px";
	}
	document.body.appendChild(w);
	api.post({subscribe_id:sid}, function(res){
		if(!res.subscribe_id){
			w.innerHTML = "登録されていません";
		} else {
			w.innerHTML = tmpl(res);
			(function() {
				var form = document.getElementById("subs_edit_form") || {};
				var rate_el = form.rate;
				if (!rate_el) {
					return;
				}
				rate_el.value = res.rate;
				rate_el.style.display = "none";
				rate_el.parentNode.insertBefore(Rate.create(function(v) {
					rate_el.value = v;
				}, res.rate), rate_el);
			})();
			Form.fill("subs_edit_form", res);
			ajaxize("subs_edit_form", function(){
				subs_edit.hide();
			});
			_$("subs_edit_folder").focus();
			update_folders(_$("subs_edit_folder"), {selected_id: res.folder_id});
		}
	});
}
subs_edit.template_url = "/contents/edit";
subs_edit.hide = function(){
	document.body.removeChild(_$("subs_edit_window"));
	removeClass(subs_edit.current_button, "toggle-on");
	return;
}


function folder_change(e){
	var el = this;
	if(this.selectedIndex == 1){
		var c = prompt(I18n.t('New Folder Name'), "");
		if(!c){
			this.selectedIndex == 0;
			return;
		}
		LDReader.Folder.create(c, function(){
			// alert(folder_id)
			update_folders(el, {selected:c});
		})
	}
}

function update_folders(el, option){
	var selected_name = option.selected;
	var selected_id = option.selected_id;
	el.options.length = 0;
	el.options[0] = new Option(I18n.t('leave it uncategorized'), "0");
	el.options[1] = new Option(I18n.t('create new folder'), "-");
	var op = el.options;
	var api = new LDR.API("/api/folders");
	api.post({},function(folder){
		var name2id = folder.name2id;
		folder.names.forEach(function(name,i){
			op[i+2] = new Option(name, name2id[name]);
			if(name == selected_name || name2id[name] == selected_id){
				op[i+2].selected = "selected";
			}
		})
	})
}

function subscribe_submit(e){
	if(!this.history_back.checked) return;

	var form = this;
	var folder_id = this.folder_id.value;
	var rate = this.rate.value;
	var pub;
	if(this["public"]){
		Array.forEach(this["public"], function(el){
			if(el.checked){
				pub = el.value;
			}
		});
	}
	var links = [];
	var feedlink = form["feedlink"];
	var feedlink_checkbox = form["check_for_subscribe[]"];
	// multiple
	if(feedlink.length && feedlink_checkbox.length){
		Array.forEach(feedlink, function(el){
			Array.some(feedlink_checkbox, function(checkbox) {
				if (el.value === checkbox.value) {
					return false;
				}
				return (feedlink_checkbox = checkbox)
			});
			(el.checked || (feedlink_checkbox && feedlink_checkbox.checked) ) && links.push(el.value);
		});
	} else {
		(feedlink.checked || (feedlink_checkbox && feedlink_checkbox.checked)) && links.push(feedlink.value);
	}
	if(!links.length) return;

	Event.stop(e);
	Array.forEach(this.elements, function(el){
		if(el.tagName == "INPUT" && el.type == "submit"){
			el.setAttribute("disabled","disabled");
			el.className += " loading_button";
		}
	});
	var task = links.length;
	var oncomplete = function(){
		task--;
		if(task == 0) history_back();
	}
	links.forEach(function(feedlink){
		var param = {
			feedlink   : feedlink,
			folder_id  : folder_id,
			rate       : rate,
			"public"   : pub
		};
		ReaderSubscribe.subscribe(param, oncomplete);
	});
	function history_back(){
		var url = ReaderSubscribe.get_backurl();
		if(url){
			location.href = url;
		}
	}
}
function try_back(errback, timeout){
	var back_success = false;
	Event.observe(window,"unload",function(){back_success=true});
	Event.observe(window,"beforeunload",function(){back_success=true});
	history.back();
	var callback;
	var jumped = 0;
	switch(typeof errback){
		case "function": callback = function(){errback()}; break;
		case "string"  : callback = function(){location.href=errback}; break;
		default : callback = function(){};
	}
	var force_timeout = function(fn,timeout){
		if(!back_success && !jumped){
			fn();
			jumped = 1;
		}
		if(timeout){
			setTimeout(function(){
				// alert("force_timeout");
				jumped || fn();
			}, timeout)
		}
	};
	setTimeout(function(){force_timeout(callback,timeout)}, 100);
	return back_success;
}

function update_checkbox(){
	var ul = _$("feed_candidates");
	if(!ul) return;
	Array.forEach(ul.getElementsByTagName("li"), function(el){
		var check = el.getElementsByTagName("input");
		Array.filter(check, function(el){
			return el.type == "checkbox"
		}).forEach(function(check){
			(check.checked) ? addClass(el, "selected") : removeClass(el, "selected");
		})
	})
}

function reverse_checkbox(el){
	var check = el.getElementsByTagName("input");
	Array.filter(check, function(el){
		return el.type == "checkbox"
	}).forEach(function(check){
		check.checked = !check.checked;
		if(check.checked){
			addClass(el, "selected");
		} else {
			removeClass(el, "selected");
		}
	})
}

//あとでui/rate.jsと一般化
var Rate = {};
Rate.create = function(callback, defaultRate){
	var el = $N("IMG",{
		src: Rate.pad_img(defaultRate || 0)
	});
	Event.observe(el, "mousemove", Rate.hover.bind(el));
	Event.observe(el, "mouseout", Rate.out.bind(el));
	Event.observe(el, "click", function(e){
		var value = Rate.click.call(el, e);
		callback(value);
	});
	return $N(
		"DIV",{
			style: {
				paddingTop: "2px",
				position  : "relative"
			}
		}, [ el ]
	);
};
Rate.debug = false;
Rate.image_path = "/img/rate/";
Rate.image_path_p = "/img/rate/pad/";
Rate.img = function(n){ return Rate.image_path + n + '.gif' };
Rate.pad_img = function(n){ return Rate.image_path_p + n + '.gif' };
Rate._calc_rate = function(e){
	var el = this;
	var img_w = el.offsetWidth;
	var cell = img_w / 6;
	var offsetX = !isNaN(e.offsetX) ? e.offsetX : e.layerX - el.offsetLeft;
	if(offsetX == 0) offsetX++;
	if(offsetX>img_w) offsetX = img_w;
	var rate = Math.ceil(offsetX/cell) - 1;
	if(Rate.debug){
		window.status = [img_w,cell,el.offsetLeft,e.layerX,offsetX];
	}
	return rate;
};
Rate.click = function(e){
	var el = this;
	var rate = Rate._calc_rate.call(this,e);
	el.src = Rate.image_path_p + rate + ".gif";
	el.setAttribute("orig_src",el.src);
	return rate;
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

updater("history_back", function(){
	var el = this;
	var hide = function(){
		el.checked = false;
		el.style.display = "none";
		_$("label_"+el.id).style.display = "none";
	};
	var show = function(){
		el.checked = true;
		el.style.display = "inline";
		_$("label_"+el.id).style.display = "inline";
	}
	ReaderSubscribe.get_backurl() ? show() : hide();
});

function init(){
	var ClickEvent = new Trigger("click");
	ClickEvent.add("li", function(){
		reverse_checkbox(this);
	});
	ClickEvent.add("input[type=checkbox]", function(){
		update_checkbox();
	});
	ClickEvent.apply();
	var form = document.forms[1] || document.forms["subscribe"];
	var rate_el = form.rate;
	if(rate_el){
		rate_el.style.display = "none";
		var set_rate = function(v){
			rate_el.value = v;
		};
		rate_el.parentNode.insertBefore(Rate.create(set_rate), rate_el);
	}
	update_checkbox();
	_$("history_back") && update("history_back");
	if(_$("subscribe_container")){
		round_corner("subscribe_container");
	}
}
function round_corner(el){
	el = _$(el);
	var browser = new BrowserDetect;
	if(browser.isFirefox){
		setStyle(el, {"-moz-border-radius" : "5px"});
		return;
	}
	var bar_style = {position:"relative",textAlign:"left"};
	function dot_style(o){
		var base = {
			position:"absolute",display:"block",color:"#fff",
			width:"5px",height:"5px",fontSize:"1px",
			backgroundRepeat:"no-repeat"
		};
		return Object.extend(base, o);
	}
	function create_corner(style){
		return $N("SPAN", {style:dot_style(style)});
	}
	var top_left = create_corner({
		top:"0px",left:"0px",backgroundImage:"url(/img/corner/top-left.gif)"
	})
	var top_right = create_corner({
		top:"0px",right:"-1px",backgroundImage:"url(/img/corner/top-right.gif)"
	});
	var bottom_left = create_corner({
		top:"-5px",left:"0px",backgroundImage:"url(/img/corner/bottom-left.gif)"
	});
	var bottom_right = create_corner({
		top:"-5px",right:"-1px",backgroundImage:"url(/img/corner/bottom-right.gif)"
	});
	var top = $N("DIV",{style:bar_style},[top_left,top_right]);
	var bottom = $N("DIV",{style:bar_style},[bottom_left,bottom_right]);
	el.insertBefore(top,el.firstChild);
	el.appendChild(bottom);
}


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
var browser = new BrowserDetect;
if(browser.isKHTML){
	ajax.filter.add(function(t){
		var esc = escape(t);
		return(esc.indexOf("%u") < 0 && esc.indexOf("%") > -1) ? decodeURIComponent(esc) : t
	})
}

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

function ajaxize(element, callback){
	element = _$(element);
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
			var api = new LDR.API(action);
			api.onload = function(response){
				after(response,request);
			}
			api.post(request);
		}
	};
	addEvent(element, "submit", onsubmit);
	element.submit = onsubmit;
}

