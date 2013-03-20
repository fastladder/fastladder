//event trigger
//あとでLDR.Applicationには持たせる
(function(){
    // まだ作ってないのもあり。
    LDR.trigger = new LDR.EventTrigger(
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
    var register_hook = LDR.register_hook = function(point, callback){
        LDR.trigger.add_trigger(point, callback);
    }
    var invoke_hook = LDR.invoke_hook = function(point, args){
        LDR.trigger.call_trigger(point, args);
    }

    LDR.setup_hook = function(){
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
            var api = new LDR.API("/api/pin/all");
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
    }
}).call(LDR);

