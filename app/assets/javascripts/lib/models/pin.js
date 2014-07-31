/*
 Pins
*/
var Pin = Class.create();
Pin.extend({
    initialize: function(){
        this.pins = [];
        this.hash = {};
    },
    has: function(url){
        return this.hash[url] ? true : false;
    },
    add: function(url,title,info){
        if(this.has(url)) return;
        this.hash[url] = true;
        var data = {
            title : title,
            url   : url
        };
        if(info){
            data.icon = info.icon
        }
        this.pins.unshift(data);
        if(this.pins.length > app.config.save_pin_limit){
            var p = this.pins.pop();
            this.has[p.url] = false;
        }
        this.update_view();
    },
    remove: function(url){
        if(!this.has(url)) return;
        this.hash[url] = false;
        this.pins = this.pins.select(function(v){
            return v.url != url
        })
        this.update_view();
    },
    shift: function(){
        var p = this.pins.shift();
        if(p){
            this.hash[p.url] = false;
            return p;
        }
    },
    update_view: function(){
        _$("pin_button").style.width = "29px";
        _$("pin_count").innerHTML = this.pins.length;
    },
    //TODO move to view
    write_list: function(){
        if(!this.pins.length) return;
        var buf = this.pins.map(function(p){
            return '<li><a href="[[url]]">[[title]]</a></li>'.fill(p)
        }).join("");
        var w = window.open();
        w.document.write([
            "<style>",
            "*{font-size:12px;line-height:150%}",
            "</style><ul>",
            buf,"</ul>"
        ].join(""));
        w.document.close();
    },
    open: function(url){
        var can_popup = (window.open(url.unescapeHTML())) ? true : false;
        if(can_popup){
            this.remove(url)
        } else {
            message('cannot_popup')
        }
    },
    open_group: function(){
        if(!this.pins.length) return;
        var queue = new LDR.Queue();
        var can_popup = false;
        var self = this;
        var count = 0;
        var max_pin = app.config.max_pin;
        if(!isNumber(max_pin)) max_pin = LDR.DefaultConfig.max_pin;
        foreach(this.pins, function(p){
            if(max_pin > count){
                queue.push(function(){
                    can_popup = (window.open(p.url.unescapeHTML())) ? true : false;
                });
            }
            count++;
        });
        queue.interval = 100;
        queue.push(function(){
            if(can_popup){
                (max_pin).times(function(){
                    var p = self.shift();
                    p && new LDR.API("/api/pin/remove").post({
                        link:p.url.unescapeHTML()
                    });
                })
                self.update_view();
            } else {
                message('cannot_popup')
            }
        })
        queue.exec();
    },
    clear: function(){
        this.pins = [];
        this.hash = {};
        this.update_view();
    }
});

var Pinsaver = Class.create();
Pinsaver.extend({
    add: function(url,title){
        if(!app.config.use_pinsaver) return;
        var api = new LDR.API("/api/pin/add");
        api.post({
            link : url.unescapeHTML(),
            title: title.unescapeHTML()
        })
    },
    remove: function(url){
        if(!app.config.use_pinsaver) return;
        var api = new LDR.API("/api/pin/remove");
        api.post({
            link:url.unescapeHTML()
        });
    },
    clear: function(){
        var api = new LDR.API("/api/pin/clear");
        api.post({});
    }
})
Pin = Class.merge(Pin, Pinsaver);
