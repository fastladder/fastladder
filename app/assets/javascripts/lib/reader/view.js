//delegater
//TODO refactor later

var FlatMenu = LDR.FlatMenu;

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
    ClickEvent.add('[rel^="Control:"]', function(){
        var rel = this.getAttribute("rel");
        var action = rel.replace("Control:","");
        eval("Control."+action);
    });
    ClickEvent.add('[rel="subscribe"]', function(e){
        Event.stop(e);
        var el = this;
        var feedlink = this.href;
        feed_subscribe(feedlink,function(res){
            el.setAttribute("rel","unsubscribe");
            el.className = "unsub_button";
            if(el.innerHTML == I18n.t('Add')){
                el.innerHTML = I18n.t('Unsubscribe');
            }
            feedlink2id[feedlink] = res.subscribe_id;
        });
    });
    ClickEvent.add('[rel="unsubscribe"]', function(e){
        Event.stop(e);
        var el = this;
        var feedlink = this.href;
        var sid = feedlink2id[feedlink];
        feed_unsubscribe(sid,function(res){
            el.setAttribute("rel","subscribe");
            el.className = "sub_button";
            if(el.innerHTML == I18n.t('Unsubscribe')){
                el.innerHTML = I18n.t('Add');
            }
        });
    });
    ClickEvent.add('[rel="discover"]', function(e){
        Event.stop(e);
        var el = this;
        var url = this.href;
        var fm = _$("discover_form");
        fm.url.value = url;
        fm.submit();
        Control.show_subscribe_form();
    });

    ClickEvent.add('a[href~="/subscribe/"]', function(e){
        if(browser.isKHTML) return;
        var subscribe_base = "http://" + location.host + "/subscribe/";
        var url = this.href;
        if(url != subscribe_base && url.indexOf(subscribe_base) == 0){
            Event.stop(e);
            var el = this;
            url = url.replace(subscribe_base,"");
            var fm = _$("discover_form");
            fm.url.value = url;
            fm.submit();
            Control.show_subscribe_form();
            return false;
        }
    });

    ClickEvent.add('[rel^="tab:"]', TabClick);
    ClickEvent.add(True, FlatMenu.hide);
    ClickEvent.add(True, function(){ app.state.LastUserAction = new Date });
    ClickEvent.add('[rel^="sort:"]', function(e){
        var el = this;
        var rel = el.getAttribute("rel");
        var sort_mode  = rel.slice(5);
        MI.sort(sort_mode);
    });
    ClickEvent.apply();
}

