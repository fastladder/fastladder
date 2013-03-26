function touch(id, state){
    if(app.config.touch_when == state){
        touch_all(id)
    }
}

/* 既読化 */
function touch_all(id){
    if(!id) return;
    var api = new LDR.API("/api/touch_all");
    var el = _$("subs_item_"+id);
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

/* 購読停止 */
function unsubscribe(sid,callback){
    var api = new LDR.API("/api/feed/unsubscribe");
    callback = callback || Function.empty;
    var info = subs_item(sid);
    var tmpl = I18n.t('unsubscribe_confirm');  // 'Are you sure to remove [[title]] from your subscription?'
    var tmpl2 = I18n.t('ubsubscribe_confirm2'); // 'Are you sure to unsubscribe this feed?'
    confirm( info ? tmpl.fill(info) : tmpl2) && api.post(
        {subscribe_id:sid},function(res){
            message(I18n.t('feed deleted'));
            callback(res);
        }
    );
}

/* レートの設定インターフェース */
function set_rate(id,rate){
    var ap = "/api/feed/set_rate";
    var rate_api = new LDR.API(ap);
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

function toggle_pin(item_id){
    var pin_button = _$("pin_" + item_id);
    var item = _$("item_" + item_id);
    var a = item.getElementsByTagName("a");
    if(!a.length) return;
    var title = a[0].innerHTML;
    var url   = a[0].href.escapeHTML();
    if(app.pin.has(url)){
        app.pin.remove(url);
        pin_button && removeClass(pin_button, "pin_active");
        removeClass(item, "pinned");
    } else {
        // feed info
        var info = subs_item(app.state.now_reading);
        app.pin.add(url,title,info);
        app.pin_button && addClass(pin_button, "pin_active");
        addClass(item, "pinned");
    }
}

function get_folders(callback){
    var api = new LDR.API("/api/folders");
    api.post({},function(json){
        folder = json;
        folder.id2name = {};
        for(var key in folder.name2id){
            folder.id2name[folder.name2id[key]] = key;
        }
        callback();
    })
};

function fit_screen(){
    var leftpane_width = app.state.leftpane_width;
    if(app.state.fullscreen) return fit_fullscreen();
    var body_h = document.body.offsetHeight;
    var top_padding    = _$("container").offsetTop;
    var bottom_padding = _$("footer").offsetHeight - 20;
    if(browser.isMac && browser.isFirefox){
        bottom_padding += 20;
    }
    var ch = body_h - top_padding - bottom_padding - 4;
    app.state.container_height = ch;
    style_update(/container/);
}

function fit_fullscreen(){
    var body_h = document.body.offsetHeight;
    var top_padding = _$("container").offsetTop;
    app.state.container_height = body_h - top_padding + 16;
    style_update(/container/);
}


function close_item(item_id){
    DOM.remove(_$("item_" + item_id));
}

// スクロール位置から現在フォーカスが当たっているアイテムを取得
function get_active_item(detail){
    // return 1;
    var sc = _$("right_container").scrollTop;
    var divs = _$("right_body").getElementsByTagName("h2");
    // for Opera9 beta
    var top_offset = _$("right_body").offsetTop;

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

    var screen = [sc, sc + _$("right_container").offsetHeight];
    var pairs = offsets.map(function(v,i,self){
        if(self[i+1]){
            return [v, self[i+1]];
        } else {
            return [v, _$("right_body").offsetHeight]
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
    if(app.state.last_feed){
        return app.state.last_feed;
    } else {
        return false;
    }
}

function move_to(sid,to,callback){
    var api = new LDR.API("/api/feed/move");
    api.post({
        subscribe_id : sid,
        to : to
    },callback)
}


// id指定で記事の情報を取得
function get_item_info(id){
    return app.state.last_items["_"+id];
}

function show_overlay(){
    var ol = $N("div",{id:"overlay"});
    document.body.appendChild(ol);
}
function hide_overlay(){
    DOM.remove("overlay");
}

function print_feed(feed){
    LDR.invoke_hook('BEFORE_PRINTFEED', feed);
    var subscribe_id = feed.subscribe_id;

    app.state.last_feed = feed;
    app.state.last_items = {};
    app.state.requested = false;
    app.state.now_reading = subscribe_id;

    var Now = (new Date - 0)/1000;
    var output = _$(print_feed.target);
    var channel = feed.channel;
    var items = feed.items;
    if(app.config.reverse_mode){
        items = items.concat().reverse();
    }
    if(app.config.max_view){
        if(app.config.max_view < items.length)
        items = items.slice(0, Math.max(1,app.config.max_view));
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
        app.state.last_items["_"+v.id] = v;
        var widgets = entry_widgets.process(feed, v);
        return item_formatter(v,{
            relative_date : (v.created_on) ? (Now-v.created_on).toRelativeDate() : I18n.t('Unknown date'),
            item_count    : item_count,
            widgets       : widgets,
            pin_active    : app.pin.has(v.link) ? "pin_active" : "",
            pinned        : app.pin.has(v.link) ? "pinned" : "",
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
    app.state.viewrange.end = app.state.viewrange.start + size;

    var first_write_num = LDR.VARS.PrintFeedFirstNum;
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

    app.state.writer && app.state.writer.cancel();
    app.state.writer2 && app.state.writer2.cancel();
    function DIV(text){
        var div = document.createElement("div");
        div.innerHTML = text;
        fix_linktarget(div);
        return div;
    }

    // 遅延描画
    function push_item(){
        var num    = LDR.VARS.PrintFeedNum;
        var delay  = LDR.VARS.PrintFeedDelay;
        var delay2 = LDR.VARS.PrintFeedDelay2;

        var writer = function(){
            var remain_items = items.slice(writed,writed + num).map(item_f).join("");
            writed += num
            if(more.className){
                more.className = "hide";
                more.innerHTML = "";
            }
            app.state.writer2 = (function(){
                more.appendChild(DIV(remain_items))
                more.className = "";
            }).later(10)();
            if(writed < size){
                app.state.writer = writer.later(delay2)();
            }
        };
        app.state.writer = writer.later(delay)();
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
    touch(app.state.now_reading, "onload");
    print_feed.target = "right_body";
    LDR.invoke_hook('AFTER_PRINTFEED', feed);
}

function rewrite_feed(){
    if(app.state.last_feed){
        print_feed(app.state.last_feed);
    }
}

print_feed.target = "right_body";
var base_target = "_blank";


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
        app.pin.open_group()
    },
    clear_pin: function(){
        app.pin.clear();
    },
    read_pin: function(url){
        app.pin.open(url.escapeHTML());
    },
    toggle_menu: function(event){
        if(app.state.show_menu){
            Control.hide_menu.call(this,event);
        } else {
            Control.show_menu.call(this,event);
        }
    },
    hide_menu: function(){
        app.state.show_menu = false;
    },
    show_menu: function(){
        app.state.show_menu = true;
        Event.cancelNext("click");
        var menu = FlatMenu.create_on(this);
        // menu.setStyle({ width : "300px" });
        menu.onhide = function(){ app.state.show_menu = false };
        menu.show();
        var sep = '<div style="height:0px;border-top:1px dotted #ccc;font-size:0px;"></div>';
        var menus = LDR.VARS.MenuItems;
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
            app.pin.write_list();
            return
        }
        app.pin.open_group();
        return
    },
    pin_mouseout: function(){
        app.state.pin_timer = function(){
            FlatMenu.hide();
        }.later(1000)();
    },
    pin_list: function(){
        app.pin.write_list();
    },
    pin_hover: function(e){
        function stophide(){
            if(app.state.pin_timer){ app.state.pin_timer.cancel() }
        }
        stophide();
        if(!app.pin.pins.length){
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
            var open_num = app.config.max_pin;
            // containerの高さにあわせて調整
            var ch = _$("right_container").offsetHeight;
            var view_num = Math.floor((ch-92) / 24);
            menu.add([
                '<span class="button flat_menu pin_list"',
                ' rel="Control:pin_list();FlatMenu.hide()">',
                I18n.t('List view'), ' (', app.pin.pins.length, I18n.t(' items'), ')</span>'
            ].join(""));
            foreach(app.pin.pins,function(v,i){
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
                I18n.t('Clear'), '</span>'
            ].join(""));
            menu.update();
        };
        write_menu();
        return menu;
    },
    reverse: function(){
        app.config.set("reverse_mode", !app.config.reverse_mode);
        message(
            (app.config.reverse_mode)
             ? 'Show older items first'
             : 'Show newer items first'
        );
        rewrite_feed();
    },
    compact: function(){
        var o = get_active_item();
        toggleClass("right_body", "compact");
        if(contain(_$("right_body").className, "compact")){
            message("expanded items / press c to collapse")
        } else {
            message("collapsed items / press c to expand")
        }
        Control.scroll_to_offset(o);
    },
    close_and_next_item: function(id,e){
        if(e) Event.stop(e);
        addClass("item_"+id, "item_read");
        var h = _$("item_"+id).offsetHeight;
        Control.add_scroll_padding();
        _$("right_container").scrollTop += h + 2;
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
        subs_item(app.state.now_reading).folder = folder;
        update("folder_label");
        move_to(app.state.now_reading,folder,[
            message.bindArgs(
                (folder ? 'Moved to ' + folder : 'Moved to Uncategolized')
            ),
            FlatMenu.hide
        ].asCallback());
    },
    toggle_keyhelp: function(){
        (!app.state.keyhelp_visible) ?
             Control.show_keyhelp.call(_$("keyhelp_button")) :
             Control.hide_keyhelp()

    },
    show_keyhelp: function(){
        Element.show("keyhelp");
        update("keybind_table");
        app.state.keyhelp_visible = true;
    },
    hide_keyhelp: function(){
        Element.hide("keyhelp");
        app.state.keyhelp_visible = false;
    },
    toggle_more_keyhelp: function(){
        var el = this;
        if(!app.state.keyhelp_more){
            Control.show_more_keyhelp();
        } else {
            Control.hide_more_keyhelp();
        }
    },
    show_more_keyhelp: function(){
        app.state.keyhelp_more = true;
        Control.show_keyhelp();
    },
    hide_more_keyhelp: function(){
        app.state.keyhelp_more = false;
        Control.show_keyhelp();
    },
    open_keyhelp: function(){
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
            format_keybind(),
            '<p class="notice">',
            '※ショートカットキーが使えない場合は日本語入力を無効にしてみてください。<br>',
            '※ブラウザや環境によってはいくつかのショートカットキーが使えない場合があります。',
            '</p>'
        ].join(""));
        w.document.close();
        app.state.keyhelp_more = old_state;
    },
    focus_findbox : function(){
        _$("finder").focus();
    },
    blur_findbox : function(){
        var f = _$("finder");
        f.value = "";
        f.blur();
    },
    show_subscribe_form: function(){
        Element.show("subscribe_window");
        centering("subscribe_window",0,40);
        show_overlay();
        setTimeout(function(){
            try{
                TabClick.call(_$("tab_add_feed"));
                _$("discover_url").focus();
                _$("discover_url").select();
            } catch(e){
            }
        },10);
    },
    hide_subscribe_form: function(){
        Element.hide("subscribe_window");
        DOM.remove("overlay");
    },
    unsubscribe: function(){
        if(app.state.now_reading){
            unsubscribe(app.state.now_reading);
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
                I18n.t('Create New Folder'), '</span>'
            ].join(""));
            menu.add(tmpl({
                folder_name : I18n.t('Uncategolized'),
                move_to : ""
            }));
            foreach(folder.names,function(v){
                var checked = subs_item(app.state.now_reading).folder == v ? "checked" : "";
                var item = tmpl({folder_name : (""+v).ry(8,"..."),  move_to : v, checked : checked});
                menu.add(item);
            });
            menu.add([
                '<span class="button dust_box"',
                ' rel="Control:unsubscribe();FlatMenu.hide()">',
                I18n.t('Unsubscribe'), '</span>'
            ].join(""));
            menu.update();
        };
        if(folder){
            write_menu();
        } else {
            menu.add(I18n.t('Loading'));
            get_folders(write_menu);
        }
        return menu;
    },
    show_viewmode: function(){
        Event.cancelNext("click");
        var menu = FlatMenu.create_on(this);
        var tmpl = Template.get("viewmode_item").compile();
        var modes  = LDR.VARS.ViewModes;
        foreach(modes,function(v,i){
            var item = tmpl({
                label : I18n.t(v),
                mode  : v,
                checked : app.config.view_mode == v ? "checked" : ""
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
                label : I18n.t(v),
                mode  : v,
                checked : app.config.sort_mode == v ? "checked" : ""
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
        var sid = app.state.now_reading;
        if(!sid) return;
        var limit;
        var c = app.config.items_per_page;
        if(!c){
            limit = 20;
        } else if(c > 200) {
            limit = 200;
        } else {
            limit = c;
        }
        if(num == 1){
            if(!app.state.has_next) return;
            app.state.viewrange.start = app.state.viewrange.end;
        } else if(num == -1){
            if(app.state.viewrange.start == 0) return;
            app.state.viewrange.end = app.state.viewrange.start;
            app.state.viewrange.start = Math.max(0,app.state.viewrange.start - limit);
            limit = app.state.viewrange.end - app.state.viewrange.start;
        }
        var api = new LDR.API("/api/all");
        api.onload = function(json){
            print_feed(json);
            // リクエストよりも件数が少ない場合
            if(json.items.length < limit){
                app.state.has_next = false;
            } else {
                app.state.has_next = true;
            }
            update("feed_next","feed_prev");
        };
        api.post({
            subscribe_id : sid,
            offset: app.state.viewrange.start,
            limit : limit
        });
    },
    get_past: function(){
    },
    scroll_top: function(){
        var target = _$("right_container");
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
        var container = _$("right_container");
        setStyle("scroll_padding",{height:container.offsetHeight+"px"});
    },
    del_scroll_padding:function(){
        setStyle("scroll_padding",{height:"0px"})
    },
    scroll_to_px: function(top){
        var container = _$("right_container");
        // for opera9 beta
        var top_offset = _$("right_body").offsetTop;
        container.scrollTop = top - top_offset;
    },
    scroll_to_zero: function(){
        var container = _$("right_container");
        container.scrollTop = 0;
    },
    scroll_to_offset: function(o){
        var divs = _$("right_body").getElementsByTagName("h2");
        var item = divs[o] || null;
        if (!item){
            return
        } else {
            var scroll_to = item.offsetTop;
        }
        Control.scroll_to_px(scroll_to);
    },
    next_item_offset: function(){
        var container = _$("right_container");
        var sc = container.scrollTop;
        var top_offset = _$("right_body").offsetTop;
        var divs = _$("right_body").getElementsByTagName("h2");
        var active = (sc == 0) ? -1 : get_active_item();
        if(active != null && active != -1 && divs[active].offsetTop - top_offset > sc){
            return active;
        }
        var can_scroll = divs[active + 1] || null;
        return (can_scroll) ? active + 1 : null;
    },
    prev_item_offset: function(){
        var container = _$("right_container");
        var sc = container.scrollTop;
        var top_offset = _$("right_body").offsetTop;
        var divs = _$("right_body").getElementsByTagName("h2");
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
        var container = _$("right_container");
        var old = container.scrollTop;
        Control.scroll_next_item();
        if(old == container.scrollTop){
            if(app.state.go_next_flag){
                Control.read_next_subs();
                app.state.go_next_flag = false;
            } else {
                app.state.go_next_flag = true;
            }
        }
    },
    go_prev: function(){
        var container = _$("right_container");
        var old = container.scrollTop;
        Control.scroll_prev_item();
        if(old == container.scrollTop) Control.read_prev_subs();
    },
    read: function(sid, todo){
        // 全件表示で未読0件のフィードを表示
        if(app.config.show_all == true){
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
        if(app.state.requested) return;
        var head = get_head();
        if(head){
            app.state.requested = true;
            touch(app.state.now_reading, "onclose");
            Control.read(head);
            // get_unread(head)
        }
    },
    read_end_subs: function(){
        if(app.state.requested) return;
        var end = get_end();
        if(end){
            app.state.requested = true;
            touch(app.state.now_reading, "onclose");
            Control.read(end);
            // get_unread(end)
        }
    },
    read_next_subs: function(){
        if(app.state.requested) return;
        var next = get_next();
        if(next){
            app.state.requested = true;
            touch(app.state.now_reading, "onclose");
            Control.read(next, Control.prefetch);
            // get_unread(next, Control.prefetch)
        } else {
            if(app.state.return_to_head){
                app.state.return_to_head = false;
                Control.read_head_subs();
            } else {
                message(I18n.t('End of feeds.  Press s to return to the top.'));
                app.state.return_to_head = true;
            }
        }
    },
    read_prev_subs: function(){
        if(app.state.requested) return;
        var prev = get_prev();
        if(prev){
            app.state.requested = true;
            touch(app.state.now_reading, "onclose");
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
        var now_id = app.state.now_reading;
        next_id ;
    },
    change_view: function(view){
        app.config.set("view_mode", view);
        subs.update();
    },
    change_sort: function(sort){
        app.config.set("sort_mode", sort);
        subs.sort();
        subs.update();
    },
    toggle_leftpane: function(){
        (!app.state.show_left) ? Control.show_leftpane() : Control.hide_leftpane();
    },
    show_leftpane: function(){
        app.state.leftpane_width = LDR.VARS.LeftpaneWidth;
        app.state.show_left = true;
        fit_screen();
        DOM.hide("right_top_navi");
        update("myfeed_tab");
    },
    hide_leftpane: function(){
        app.state.leftpane_width = 0;
        app.state.show_left = false;
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
        if(!app.state.fullscreen){
            app.state.fullscreen = 1;
        } else if(app.state.fullscreen == fs.length-1){
            app.state.fullscreen = 0;
        } else {
            app.state.fullscreen++
        }
        Element.hide(elements);
        Element.show(fs[app.state.fullscreen]);
        fit_screen()
    },
    font: function(num){
        var to;
        var old = app.config.current_font;
        if(num == 0){to = 14} else { to = old + num }
        app.config.set("current_font", to);
    },
    load_config: function(){},
    save_config: function(){},
    toggle_show_all: function(){
        app.config.set("show_all", !app.config.show_all);
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
        var h = _$("right_container").offsetHeight - 40;
        var c =
            (app.config.scroll_type == "page") ? h:
            (app.config.scroll_type == "half") ? h / 2 :
            (app.config.scroll_px || 100);
        _$("right_container").scrollTop += c * num;
    },
    scroll_page_or_subs: function(num){
        var before = _$("right_container").scrollTop;
        _$("right_container").scrollTop += num;
        var after  = _$("right_container").scrollTop;
        if(before == after && writing_complete()){
            num > 0 ? Control.read_next_subs() : Control.read_prev_subs();
        }
    },
    mark_all_read: function(){
        var list = Ordered.list;
        if(!list) return;
        var no_feeds = I18n.t('There is no item to mark as read');
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
        var tmpl = I18n.t('mark_all_read_tmpl');
        var c = confirm(tmpl.fill({
            count: post_list.length
        }));
        if (!c) return;
        post_list.forEach(function(id){
            var info = subs_item(id);
            var el = _$("subs_item_"+id);
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
        var api = new LDR.API("/api/touch_all");
        api.post({subscribe_id : postdata}, function(){
            message("Marked as read");
            update("total_unread_count");
        });
    }
};

/* フィードの追加 */
function feed_discover(url){
    var api = new LDR.API("/api/feed/discover");
    api.post({url:url}, print_discover);
}
function feed_subscribe(feedlink,callback){
    var api = new LDR.API("/api/feed/subscribe");
    callback = callback || Function.empty;
    api.post({feedlink:feedlink},function(res){
        message("Subscription completed");
        callback(res);
        subs.update(true);
        var api = new LDR.API("/api/feed/fetch_favicon");
        api.post({feedlink: feedlink});
    })
}
function feed_unsubscribe(sid, callback){
    var api = new LDR.API("/api/feed/unsubscribe");
    callback = callback || Function.empty;
    api.post({subscribe_id:sid},function(res){
        message("購読停止しました");
        callback(res);
        subs.update(true);
    });
}

function show_all_mouseover(){
    app.state.help_show = true;
    app.state.help_snap = this;
    var tmpl = I18n.t('show_all_help_message_tmpl');
    app.state.help_message = tmpl.fill({state: app.config.show_all ? 'disabled' : 'enabled' });
    update("help_window");
}
function show_all_mouseout(){
    app.state.help_show = false;
    update("help_window");
}

