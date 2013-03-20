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
            this.style_initializer = new LDR.StyleInitializer;
            this.state  = new LDR.StateClass;
            this.config = new LDR.Config;
        };

        var fn = Application.prototype;

        //application initializer
        fn.load = function(options, done){
            var that = this;
            var flow;
            var with_pass = function(f){
                return function(){flow.pass();};
            };

            // call parallel
            var parallel_initializers = [
                //aseet preload
                function(){
                    that._preloadAssets(function(){
                        flow.pass();
                    });
                },

                with_pass(that.config.startListener.bind(that)),
                with_pass(that.style_initializer.applyRule.bind(that)),

                //dom cache
                function(){
                    _$.enable_cache = function(id){
                        _$.cacheable[id] = true;
                    }.forEachArgs();

                    _$.enable_cache(
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
