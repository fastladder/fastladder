/*
 State
*/
(function(){
    //rename after
    LDR.StateClass = (function(){
        function StateClass(){
            this.requested = false;
            this.last_scroll = 0;
            this.LastUserAction = new Date;
            this.offset_cache = [];
            // どの範囲を表示しているのかを管理する
            this.viewrange = {
                start : 0,
                end   : 0
            };
            this.has_next = true;
            this.autoscroll_wait = 2000;
            this.show_left = true;
        }
        var fn = StateClass.prototype;

        fn.start_mousetracking = function(){
            this.mousemove = function(e){
                var pos = [e.clientX,e.clientY];
                message(pos);
                isFunction(callback) && callback(pos)
            };
            State.stop_mousemove = Event.observe(document.body, "mousemove", State.mousemove);
        };

        fn.stop_mousetracking = function(){
            State.stop_mousemove();
        };

        function autoscroll(e){
            if(e.shiftKey){
                if(State.autoscroll_timer){
                    clearInterval(State.autoscroll_timer);
                    State.autoscroll_wait = State.autoscroll_wait * 0.8;
                }
                State.autoscroll_timer = setInterval(function(){
                    writing_complete() && Control.go_next();
                    if(is_last()) stop_autoscroll();
                }, State.autoscroll_wait);
            } else {
                stop_autoscroll();
                Control.go_next();
            }
        }

        function stop_autoscroll(){
            State.autoscroll_wait = 2000;
            clearInterval(State.autoscroll_timer);
            State.autoscroll_timer = null;
        }

        return StateClass;
    })();
}).call(LDR);

