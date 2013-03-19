// Hook
(function(){
    /*
     Hook
    */
    var Hook = Class.create();
    Hook.extend({
        initialize: function(){
            this.callbacks = [];
        },
        isHook: true,
        add: function(f){
            this.callbacks.push(f)
        },
        exec: function(){
            var args = arguments;
            this.callbacks.forEach(function(f){
                isFunction(f) && f.apply(null,args)
            })
        },
        clear: function(){
            this.callbacks = []
        }
    });

    LDR.EventTrigger = Class.create();
    LDR.EventTrigger.extend({
        initialize: function(){
            var points = Array.from(arguments);
            var triggers = {};
            points.forEach(function(name){
                var hook_name = name.toLowerCase();
                triggers[hook_name] = new Hook;
            });
            this.triggers = triggers;
        },
        add_trigger: function(point, callback){
            var point = point.toLowerCase();
            if(this.triggers.hasOwnProperty(point)){
                this.triggers[point].add(callback)
            }
        },
        call_trigger: function(point, args){
            point = point.toLowerCase();
            if(this.triggers.hasOwnProperty(point)){
                this.triggers[point].exec(args);
            }
        }
    });
}).call(LDR);

