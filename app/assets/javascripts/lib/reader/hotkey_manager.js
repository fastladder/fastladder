(function(){
    function show_error(){
        app.state.show_error = true;
        update("error_window")
    }

    function hide_error(){
        app.state.show_error = false;
        Element.hide("error_window");
    }

    LDR.setup_hotkey = function(){
        Keybind = new HotKey(null, "reader");
        Keybind.globalCallback = function(){
            app.state.LastUserAction = new Date;
            if(app.state.show_error) hide_error();
        };
        var keyconfig = [];
        each(LDR.KeyConfig, function(value,key){
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
}).call(LDR);
