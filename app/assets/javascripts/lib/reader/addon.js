// print_ads
LDR.register_hook('BEFORE_PRINTFEED', function(feed){
	print_ads(feed.ads);
});

function print_ads(ads){
	if(!ads) return;
	var tmpl = Template.get("ads_body").compile();
	var fmt  = Template.get("ads_item").compile();
	_$("ads_bottom").innerHTML = tmpl({
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



new function(){
	if(I18n.locale === 'en'){ return }
	// extension for livedoor clip
	KeyConfig.toggle_clip  = "b";
	KeyConfig.instant_clip = "i";
}

app.state.clipped_item = new Cache();

function clip_click(id){
	var item = get_item_info(id);
	// use custom clip
	if(app.config.use_custom_clip != "off"){
		var link_template = app.config.custom_clip_url;
		var link = link_template.fill({
			url   : encodeURIComponent(item.link.unescapeHTML()),
			title : encodeURIComponent(item.title.unescapeHTML()),
			body  : encodeURIComponent(item.body),
			select : encodeURIComponent(get_selection())
		});
		window.open(link) || message('cannot_popup');
	} else if(app.config.use_inline_clip){
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
		tags  : app.config.clip_tags,
		"public" : app.config.use_clip_public
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
	if(app.config.use_instant_clip == -1){
		var c = confirm([
			"ショートカットキー「i」で、今見ている記事をすぐにlivedoor クリップへ登録できます。",
			"",
			"一発クリップ機能を有効にしますか？",
			"（※ 「設定変更→クリップの設定」から詳細な設定を行えます）"
		].join("\n"));
		if(!c) return;
		app.config.set("use_instant_clip", 1);
	}
	if(!app.config.use_instant_clip){
		message("一発クリップ機能を使用するには、「設定変更」でクリップの設定を変更してください");
		return;
	}
	var id = item.id;
	var body = _$("item_body_"+id);
	var api = new LDR.API("/clip/add");
	var onload = function(json){
		if(json.StatusCode == 401){
			body.innerHTML = Template.get("clip_register").fill();
			_$("clip_icon_"+item.id).src = "/img/icon/clip.gif";
			app.state.clipped_item.clear();
			fix_linktarget(body);
		} else {
			message("クリップしました")
		}
	};
	app.state.clipped_item.set(item.id, item);
	_$("clip_icon_"+item.id).src = "/img/icon/clipped.gif";
	var param = {
		link  : item.link.unescapeHTML(),
		title : item.title.unescapeHTML(),
		"public" : app.config.use_instant_clip_public,
		from  : "reader"
	};
	if(app.config.use_instant_clip_ratecopy) param.rate = rate;
	if(app.config.instantclip_tags) param.tags = app.config.instantclip_tags;
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
	var body = _$("item_body_"+id);
	var param = get_item_info(id);
	var rate = subs_item(get_active_feed().subscribe_id).rate;
	function fetch_clip(url,callback){
		var api = new LDR.API("/clip/in_my_clip");
		api.post({
			link : url.unescapeHTML()
		}, callback);
	}
	function set_ratepad(n){
		_$("clip_rate_"+id).src = LDR.Rate.image_path_p + n + ".gif";
	}
	if(hasClass(body, "clip_mode")){
		var form = _$("clip_form_"+id);
		// focus
		(function(){
			var tmp = $N("span");
			tmp.innerHTML = '<input type="password" id="tmp_focus" style="visibility:hidden">';
			document.body.appendChild(tmp);
			var el = _$("tmp_focus");
			if(el){
				el.focus();
				document.body.removeChild(tmp);
				// message("フォーカス移動");
			}
		})._try()();
		body.innerHTML = '<div class="body">'+param.body+'</div>';
		fix_linktarget(body);
		removeClass(_$("clip_"+id), "clip_active");
		removeClass(body, "clip_mode");
	} else {
		var item_html = body.innerHTML;
		var tmpl = Template.get("clip_form").compile();
		body.innerHTML = tmpl(param);
		addClass(body, "clip_mode");
		addClass(_$("clip_"+id), "clip_active");
		var form = _$("clip_form_"+id);
		// form fill
		Form.fill(form, {
			tags     : app.config.clip_tags,
			"public" : app.config.use_clip_public
		});
		if(app.config.use_clip_ratecopy){
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
					json["public"] = app.config.use_clip_public;
				}
				Form.fill(form, json);
				if(json["rate"] > 0) set_ratepad(json["rate"]);
				var clip_info = _$("clip_info_"+id);
				if(clip_info) clip_info.innerHTML = Template.get("clip_info").fill(json);
			} else if(json.StatusCode == 401) {
				body.innerHTML = Template.get("clip_register").fill();
				fix_linktarget(body);
			}
		});
		ajaxize(form,{
			before: function(){
				toggle_clip(id);
				app.state.clipped_item.set(id, param);
				_$("clip_icon_"+id).src = "/img/icon/clipped.gif";
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
		_$("config_form").custom_clip_url.value = this.value;
	}
	if(this.value == "off"){
		Element.show("config_for_ldclip");
		Element.hide("config_for_customclip");
	} else {
		Element.hide("config_for_ldclip");
		Element.show("config_for_customclip");
	}
}
LDR.register_hook("after_init_config", function(){
	if(I18n.locale === 'en'){ return }
	update("custom_clip");
	if(app.config.use_custom_clip == "off"){
		Element.show("config_for_ldclip");
		Element.hide("config_for_customclip");
	} else {
		Element.hide("config_for_ldclip");
		Element.show("config_for_customclip");
		_$("custom_clip").value = "on";
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

LDR.register_hook("after_init", function(){
	Keybind.add(":",function(){
		Element.show("message_box");
		message("<input type='text' id='vi' onkeyup='vi_exec.call(this,event)'>");
		setTimeout(function(){
			var i = _$("vi");
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
		if(!app.state.now_reading) return;
		var sid = app.state.now_reading;
		var rate = v - 0;
		set_rate(sid, rate);
		_$("rate_img").src = LDR.Rate.image_path_p + rate + ".gif";
	})
});
// change mode
register_command("v|view",function(mode){
	var modes = LDR.VARS.ViewModes;
	var mode = modes.like(mode);
	if(mode){
		Control.change_view(mode);
		var mode_text = I18n.t(mode);
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
app.state.now = Math.floor(new Date / 1000);
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
			var item_element = _$(id);
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
			var item_element = _$(id);
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
		element = element || _$(this.element_id);
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
	if(!app.state.mdown) return;
	var el = this;
	var ul = el.parentNode;
	var id = ul.id;
	var listview = ListView.get_instance(id);
	var item_id = el.id;
	if(app.state.turn){
		listview.select(item_id);
	} else {
		listview.unselect(item_id);
	}
};
ListView.mousedown = function(e){
	app.state.mdown = true;
	var el = this;
	var ul = el.parentNode;
	var id = ul.id;
	var listview = ListView.get_instance(id);
	var item_id = el.id;
	if(hasClass(el,"selected")){
		listview.unselect(item_id);
		app.state.turn = false;
	} else {
		listview.select(item_id);
		app.state.turn = true;
	}
	Event.stop(e);
};


var DOMArray = Class.create();
DOMArray.extend({
	initialize: function(element, child_tag){
		this.element = _$(element);
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
	if(I18n.locale === 'en'){ return }
	app.state.clip_overlay = false;
	var Keybind_clip = new HotKey(null, "clip_overlay");
	Keybind_clip.activate(false);
	var template = [
		'<span class="date">[[#{ (app.state.now-created_on).toRelativeDate() }]]</span>',
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
			this.loader = new LDR.API(this.clip_api);
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
			app.state.now = Math.floor(new Date / 1000);
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
				if(count > app.config.max_pin){
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
			app.state.clip_overlay = true;
			HotKey.use_only("clip_overlay");
		},
		hide: function(){
			// clear cache
			this.reset();
			HotKey.use_only("reader");
			DOM.remove("clip_overlay");
			hide_overlay();
			app.state.clip_overlay = false;
		},
		toggle: function(){
			app.state.clip_overlay ? this.hide() : this.show();
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
				var api = new LDR.API("/clip/delete");
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
			var el = _$(this.element_id);
			if(el){
				el.innerHTML = value;
			}
		},
		oncomplete: function(){
			this.reset();
			var el = _$(this.element_id);
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
		var api = new LDR.API("/clip/add");
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
	LDR.register_hook('AFTER_INIT', function(){
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
	app.state.guest_mode = true;

	// default settings for guest mode
	app.config.view_mode = "flat";
	app.config.sort_mode = "modified_on";
	app.config.use_limit_subs = 1;
	app.config.limit_subs = 200;
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
		LDR.API.StickyQuery.users = livedoor_id;
	}
	LDR.API.prototype.initialize = function(ap){
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

	_$("subs_toolbar").style.display = "none"
	_$("subs_buttons").style.display = "none";
	_$("subs_search").style.paddingTop = "6px";
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
		_$("loadicon").src = "/img/icon/xmas2006/xmas1.gif";
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

	Event.observe(_$(target), 'selectstart', click);
};

// for English mode
if(I18n.locale === 'en'){
	function fit_screen(){
		var leftpane_width = app.state.leftpane_width;
		if(app.state.fullscreen) return fit_fullscreen();
		DOM.hide("footer");
		var body_h = document.body.offsetHeight;
		var top_padding    = _$("container").offsetTop;
		// var bottom_padding = _$("footer").offsetHeight - 20;
		var bottom_padding = 0 - 20;
		var ch = body_h - top_padding - bottom_padding - 4;
		app.state.container_height = ch;
		style_update(/container/);
	}
	style_updater("left_container", function(){
		setStyle(this,{
			display : app.state.show_left ? "block": "none",
			width   : app.state.leftpane_width   + "px",
			height  : app.state.container_height + 33 + "px"
		});
	}._try());

	style_updater("subs_container", function(){
		var h = app.state.container_height - _$("subs_tools").offsetHeight;
		setStyle(this,{
			display : app.state.show_left ? "block": "none",
			width   : app.state.leftpane_width + "px",
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
			 height : app.state.container_height - border_h + "px",
			 width  : document.body.offsetWidth - app.state.leftpane_width - border_w + "px"
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
		var old_state = app.state.keyhelp_more;
		app.state.keyhelp_more = true;
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
		app.state.keyhelp_more = old_state;
	};
	show_tips.text = "What's up?";
	function ld_check(){
		var c = document.cookie;
		return c.indexOf("reader_sid") != -1;
	}
}




