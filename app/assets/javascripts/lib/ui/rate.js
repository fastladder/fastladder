/*
 rate
*/
(function(){
    var Rate = LDR.Rate = Class.create().extend({
        initialize: function(callback){
            Object.extend(this, Rate);
            this.click = callback;
        }
    });

    Rate.image_path = "/img/rate/";
    Rate.image_path_p = "/img/rate/pad/";
    Rate._calc_rate = function(e){
        var el = this;
        var img_w = el.offsetWidth;
        var cell = img_w / 6;
        var offsetX = !isNaN(e.offsetX) ? e.offsetX : e.layerX - el.offsetLeft;
        if(offsetX == 0) offsetX++;
        if(offsetX>img_w) offsetX = img_w;
        var rate = Math.ceil(offsetX/cell) - 1;
        // window.status = [img_w,cell,el.offsetLeft,e.layerX,offsetX];
        return rate;
    };
    Rate.click = function(e){
        var el = this;
        var rate = Rate._calc_rate.call(this,e);
        var sid = el.getAttribute("sid");
        set_rate(sid,rate);
        el.src = Rate.image_path_p + rate + ".gif";
        el.setAttribute("orig_src", el.src);
    };
    Rate.out = function(e){
        var src;
        var el = this;
        if(src = el.getAttribute("orig_src")){
            el.src = src
        }
    };
    Rate.hover = function(e){
        var el = this;
        if(!el.getAttribute("orig_src")){
            el.setAttribute("orig_src", el.src);
        }
        var rate = Rate._calc_rate.call(this,e);
        el.src   = Rate.image_path_p + rate + ".gif";
    };

    //あとで初期化を外出し
    window.ClipRate = new Rate(function(e){
        var id   = this.getAttribute("item_id");
        var form = $("clip_form_"+id);
        var rate = Rate._calc_rate.call(this, e);
        form.rate.value = rate;
        this.src = Rate.image_path_p + rate + ".gif";
        this.setAttribute("orig_src", this.src);
    });
}).call(LDR);
