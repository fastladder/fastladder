
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
		Manage.message(size + " 件選択されています");
	} else {
		Manage.message("編集したいアイテムを選択してください");
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
		var c = confirm( l+"件のフィードの登録を解除します。よろしいですか？" );
		if(!c) return;
		TRSelector.clear();
		foreach(ids,function(sid,n){
			var api = new API("/api/feed/unsubscribe");
			api.post({subscribe_id:sid},function(){
				l--;
				message("フィードを削除しています:残り"+l+"件");
				if(l == 0){
					message("フィードを削除しました");
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
		message("既読にしました");
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
		var folder_name = "未分類"
	} else if (!folder_id){
		var folder_name = "すべて"
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
	this.options[0] = new Option("未分類","");
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
		'<li class="button ' + (MF.folder_id == 0 ? 'selected' : '')  + '" onclick="MF.select(0)">未分類</li>',
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
		message(folder.id2name[req.folder_id] + "→" + req.name);
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
			var c = confirm(folder.id2name[param.folder_id] + "を削除してよろしいですか？(中のアイテムは削除されません)");
			return c ? true : false;
		},
		after: function(res,req){
			var fn = folder.id2name[req.folder_id];
			message(fn + "を削除しました");
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
		var name = prompt("フォルダ名","");
		if(!name) return;
		var api = new API("/api/folder/create");
		api.post({name:name},function(res){
			message("フォルダを作成しました");
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
			message(folder.id2name[folder_id] + "→" + new_name);
			folder = null; callback();
		});
		MF.change_flag = true;
		return true;
	},

	delete_folder : function(callback){
		var folder_id = MF.folder_id;
		if(!folder_id) return false;
		var c = confirm(folder.id2name[folder_id] + "を削除してよろしいですか？(中のアイテムは削除されません)");
		if(!c) return false;
		var api = new API("/api/folder/delete");
		api.post({folder_id : folder_id},function(){
			message(folder.id2name[folder_id] + "を削除しました");
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
	$("manage_help").innerHTML = "→&nbsp;&nbsp;" + this.title;
}
Manage.hide_help = function(){
	$("manage_help").innerHTML = "";
}


// deleteを実行
function delete_folder(folder_id){
	var api = new API("/api/folder/delete");
	api.post({folder_id : folder_id},function(){
		message(folder.id2name[folder_id] + "を削除しました");
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
		message(folder.id2name[folder_id] + "→" + new_name);
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

