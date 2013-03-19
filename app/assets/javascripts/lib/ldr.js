// Application is singleton class for manage global state.
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
        };
        var fn = Application.prototype;

        //application initializer
        fn.load = function(options, done){
            var that = this;
            var flow;
            // call parallel
            var parallel_initializers = [
                function(){
                    that._preloadAssets(function(){
                        flow.pass();
                    });
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
