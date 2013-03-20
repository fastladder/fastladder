// Application is singleton class for manage global state.
(function(){
    // What happen? plz someone add test
    LDR.CSSInitializer = (function(){
        function CSSInitializer(){
            var that = this;
            // self override
            that.addRule = function(){
                if(document.styleSheets){
                    // Mozilla, (safari?)
                    if(document.styleSheets[0].insertRule){
                        that.addRule = (function(selector, property){
                            document.styleSheets[0].insertRule(
                                selector + "{" + property + "}",
                                document.styleSheets[0].cssRules.length);
                        })._try();
                    // IE
                    } else if(document.styleSheets[0].addRule){
                        that.addRule = function(selector, property){
                            document.styleSheets[0].addRule(selector, "{" + property + "}");
                        }._try();
                    }
                } else if(window.opera){
                    that.addRule = function(selector, property){
                        var sheet = selector + "{" + property + "}";
                        var link = document.createElement('link');
                        link.setAttribute('rel',  'stylesheet');
                        link.setAttribute('type', 'text/css');
                        link.setAttribute('href', 'data:text/css,' + encodeURIComponent(sheet));
                        document.getElementsByTagName('head')[0].appendChild(link);
                    }._try();
                }
            }._try();
        }

        var fn = CSSInitializer.prototype;

        fn.applyRule = function(){
            var that = this;
            (function(tag, props){
                var arg = arguments;
                if(isString(tag) && isArray(props)){
                    props.forEach(function(v){
                        that.addRule(tag,v);
                    });
                } else {
                    that.addRule.apply(this,arguments)
                }
            })("pre",[
                "font-family:monospace;",
                "border:1px solid #808080;",
                "background:#f4f2ef;",
                "padding:1em;"
            ]);
        }

        return CSSInitializer;
    })();

}).call(LDR);

(function(){
    LDR.ASSET_IMAGES = [
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
    ];

    this.Application = (function(done){
        function Application() {
            this.initialized = false;
            this.css_initializer = new LDR.CSSInitializer;
        };

        var fn = Application.prototype;

        //application initializer
        fn.load = function(options, done){
            var that = this;
            var flow;
            // call parallel
            var parallel_initializers = [
                //aseet preload
                function(){
                    that._preloadAssets(function(){
                        flow.pass();
                    });
                },

                //css custormize
                function(){
                    that.css_initializer.applyRule();
                    flow.pass();
                },
                //dom cache
                function(){
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
                    flow.pass();
                }
            ];
            flow = new Flow(parallel_initializers.length, function(){
                that.initialized = true;
                done();
            });
            parallel_initializers.forEach(function(f){f();})
        };

        //preload all assets
        fn._preloadAssets = function(done){
            LDR.preload(LDR.ASSET_IMAGES, done);
        };

        return Application;
    })();

    //hidden instance by others
    var instance = null;
    LDR.Application.getInstance = function(){
        if (!instance) instance = new LDR.Application;
        return instance;
    };
}).call(LDR);
