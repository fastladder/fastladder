//updaters
(function(){
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

    function print_error(t){
        var options = {scope: "error_message/" + t};
        _$("error_title").innerHTML = I18n.t('title', options);
        _$("error_body").innerHTML =  I18n.t('body', options);
    }
    var ld_check = function(){
        var c = document.cookie;
        return (c.indexOf(".LUID") != -1) || (c.indexOf(".LL") != -1);
    };

    updater("help_window", function(){
        if(app.state.help_show){
            Element.show("help_window");
            this.innerHTML = app.state.help_message;
            var el   = app.state.help_snap;
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
            print_error("busy");
        }
    });

    updater("mode_text_view",function(){
        this.innerHTML = I18n.t(app.config.view_mode);
    });
    updater("mode_text_sort",function(){
        this.innerHTML = I18n.t(app.config.sort_mode);
    });
    /* navi */
    updater("right_bottom_navi", print_navi);
    updater("right_top_navi", print_navi);
    updater("scroll_offset",function(){
        this.innerHTML = app.state.scroll_offset + "/"
    });

    updater("folder_label",function(){
        var item = subs_item(app.state.now_reading);
        this.innerHTML = [
            (item.folder ? item.folder.ry(8,"...") : I18n.t('Uncategolized')),
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
        if(app.state.load_progress){
            addClass(this, "progress")
        } else {
            removeClass(this, "progress")
        }
        var tmpl = I18n.t('unread_count_tmpl');
        var tmpl_title = I18n.t('unread_count_title_tmpl');
        this.innerHTML = tmpl.fill(param);
        if(!app.state.guest_mode){
            document.title = tmpl_title.fill(param);
        }
    });

    updater("keybind_table", function(){
        this.innerHTML = format_keybind();
        var h = app.state.keyhelp_more ? this.offsetHeight + 65 + "px" : "150px";
        _$("keyhelp").style.height = h;
    });
    updater("feed_next", function(){
        this.className = (!app.state.has_next) ? "disable" : "";
        update("feed_paging_next");
    });
    updater("feed_prev", function(){
        this.className = (app.state.viewrange.start == 0) ? "disable" : "";
        update("feed_paging_prev");
    });

    updater("feed_paging_next", function(){
        this.className = (!app.state.has_next) ? "disable" : "";
    });
    updater("feed_paging_prev", function(){
        this.className = (app.state.viewrange.start == 0) ? "disable" : "";
    });

    updater("myfeed_tab", function(){
        this.style.borderColor = app.state.show_left
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
        setStyle(this, style[app.config.show_all ? "inactive" : "active"] );
    });
    updater("reload_button", function(){
        var img_path = app.state.subs_reloading ? '/img/icon/reload_anime.gif' : '/img/icon/reload.gif';
        var cursor   = app.state.subs_reloading ? 'wait' : 'pointer';
        setStyle(this, {
            backgroundImage: 'url('+img_path+')',
            cursor: cursor
        });
    });

}).call(LDR);

