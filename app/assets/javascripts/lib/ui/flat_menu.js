(function(){
    var FlatMenu = LDR.FlatMenu = Class.create();
    FlatMenu._setstyle = function(element,extra){
        setStyle(element,{
            display  : "none",
            width    : "160px",
            position : "absolute",
            backgoundColor : "transparent",
            backgroundImage : "url('/img/alpha/alpha_03.png')",
            padding  : "0px 2px 2px 0px",
            fontSize : "12px",
            border   : "1px solid gray",
            borderColor : "#ccc #ccc #ccc #ccc",
            borderStyle : "solid none none solid"
        });
    };
    FlatMenu.extend({
        initialize: function(parent, base_element){
            this.parent = parent;
            this.base_element = base_element;
            this.menu = [];
            this.element = DOM.create("div");
            this.element.className = "FlatMenu";
            addEvent(this.element,"selectstart", Event.stop);
            addEvent(this.element,"mousedown",   Event.stop);
            FlatMenu._setstyle(this.element);
            if(this.base_element){
                this.base_element.appendChild(this.element);
            } else {
                document.body.appendChild(this.element);
            }
            return this;
        },
        add: function(text){
            this.menu.push(text)
        },
        clear: function(){
            this.menu = [];
        },
        update:function(){
            this.element.innerHTML = this.menu.join("").aroundTag("div");
        },
        snap: function(el){
            el = el || this.parent;
            if(this.base_element){
                var pos = Position.cumulativeOffsetFrom(this.parent, this.base_element);
            } else {
                var pos = Position.cumulativeOffset(this.parent);
            }
            var left = pos[0];
            var top  = pos[1] + this.parent.offsetHeight;
            DOM.move(this.element,left,top);
        },
        visible: false,
        setStyle: function(style){
            setStyle(this.element, style);
        },
        setEvent: function(obj){
            var el = this.element;
            each(obj,function(fn,type){
                Event.observe(el, type, fn)
            })
        },
        show: function(){
            this.update();
            this.snap();
            FlatMenu.hideAll();
            FlatMenu._instance.push(this);
            if(!this.visible){
                DOM.show(this.element);
                this.visible = true;
            }
        },
        hide: function(){
            if(this.visible){
                DOM.remove(this.element);
                this.visible = false;
            }
            if(isFunction(this.onhide)){
                var onhide = this.onhide;
                this.onhide = null;
                onhide();
            }
        }
    });
    FlatMenu.create_on = function(parent, base_element){
        return new FlatMenu(parent, _$(base_element));
    }
    FlatMenu._instance = [];
    FlatMenu.hideAll = function(){
        FlatMenu._instance.invoke("hide");
        FlatMenu._instance = [];
    };
    FlatMenu.hide = FlatMenu.hideAll;

    var Slider = Class.create();
    Slider.extend({
        default_config: {
            size  : 150,
            handle_width : 10,
            value : 0,
            from : 0,
            to   : 100,
            step : 0.1
        },
        initialize: function(id,config){
            var self = this;
            var op = extend({},this.default_config);
            this.config = extend(op,config);
            this.observers = [];
            this.base   = _$(id);
            this.bar    = $N("DIV",{"class":"slider-bar"});
            this.handle = $N("DIV",{"class":"slider-handle"});
            this.setup_style();
            var o = this.config;
            this.value = o.value;
            // value range
            this.min = Math.min(o.from, o.to);
            this.max = Math.max(o.from, o.to);
            // positon range
            this.min_pos = 0;
            this.max_pos = o.size;

            this.updatePosition();
            // style
            this.handle_width = this.handle.offsetWidth;
            this.base_width = this.base.offsetWidth;
            // click pos
            this.click_pos = o.handle_width / 2;

            _$(id).appendChild(this.bar);
            _$(id).appendChild(this.handle);
            this.mdown = false;
            Event.observe(this.handle, "mousedown", this._handle_mousedown.bind(this));
            Event.observe(this.base, "mousedown", this._base_mousedown.bind(this));
            Event.observeWheel(this.base, this._base_mousewheel.bind(this));
            return this;
        },
        setup_style: function(){
            var config = this.config;
            this.base.style.width   = config.size + config.handle_width + "px";
            this.bar.style.width    = config.size + "px";
            this.bar.style.left     = config.handle_width / 2 + "px";
            this.handle.style.width = config.handle_width - 2 + "px";
        },
        _handle_mousedown: function(e){
            this.mdown = true;
            this.old_value = this.value;
            Event.stop(e);
            this.click_pos = Event.pointerX(e) - this.base.offsetLeft - this.px_value;
            addClass(this.handle, "active");
            this.onsliderstart();
            this.start_drag();
        },
        _base_mousedown: function(e){
            this.click_pos = this.config.handle_width / 2;
            this.move_handle(e);
            this.updateValue();
            this.onslidermove(this.value);
            this.onsliderstop();
        },
        _base_mousewheel: function(count){
            this.movePosition(count * 10);
            this.updateValue();
            this.onslidermove(this.value);
            this.onsliderstop();
        },
        cancel_select : function(){
            this.observers.push(
                Event.observe(this.handle, "dragstart", Event.stop),
                Event.observe(this.handle, "selectstart", Event.stop),
                Event.observe(document, "dragstart", Event.stop),
                Event.observe(document, "selectstart", Event.stop)
            );
        },
        getValue: function(){
            return this.value;
        },
        setValue: function(val){
            if(this.min > val){
                this.value = this.min
            } else if(this.max < val){
                this.value = this.max
            } else {
                this.value = val;
            }
        },
        move_handle: function(e){
            var x = Event.pointerX(e);
            var config = this.config;
            var pos = x - this.base.offsetLeft - this.click_pos;
            this.setPosition(pos);
        },
        updateValue: function(){
            var o = this.config;
            var pos = this.getPosition();
            var value = o.from + (o.to - o.from) * pos / o.size ;
            this.value = value;
        },
        updatePosition: function(){
            var o = this.config;
            var value = this.getValue();
            var left  = (o.from - o.to) * value / o.size ;
            this.setPosition(left);
        },
        movePosition: function(num){
            this.setPosition(this.getPosition() + num);
        },
        getPosition: function(e){
            return this.px_value;
        },
        setPosition: function(pos){
            pos = Math.max(pos, 0);
            pos = Math.min(pos, this.max_pos);
            this.px_value = pos;
            this.handle.style.left = Math.floor(pos) + "px";
        },
        _mousemove: function(e){
            this.move_handle(e);
            this.updateValue();
            this.onslidermove(this.value);
        },
        _mousestop: function(e){
            this.mdown = false;
            removeClass(this.handle,"active");
            this.stop_observe();
            this.onsliderstop();
        },
        start_drag: function(){
            this.observers.push(
                Event.observe(document,"mousemove", this._mousemove.bind(this)),
                Event.observe(document,"mouseup", this._mousestop.bind(this))
            );
            this.cancel_select();
        },
        stop_observe: function(){
            this.observers.forEach(function(f){f()});
        }
    });
}).call(LDR);
