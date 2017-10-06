/*
 rate
*/
(function () {
    var Rate = LDR.Rate = Class.create().extend({
        initialize(callback) {
            Object.extend(this, Rate);
            this.click = callback;
        },
    });

    Rate.image_path = '/img/rate/';
    Rate.image_path_p = '/img/rate/pad/';
    Rate._calc_rate = function (e) {
        const el = this;
        const img_w = el.offsetWidth;
        const cell = img_w / 6;
        let offsetX = !isNaN(e.offsetX) ? e.offsetX : e.layerX - el.offsetLeft;
        if (offsetX == 0) offsetX++;
        if (offsetX > img_w) offsetX = img_w;
        const rate = Math.ceil(offsetX / cell) - 1;
        // window.status = [img_w,cell,el.offsetLeft,e.layerX,offsetX];
        return rate;
    };
    Rate.click = function (e) {
        const el = this;
        const rate = Rate._calc_rate.call(this, e);
        const sid = el.getAttribute('sid');
        set_rate(sid, rate);
        el.src = `${Rate.image_path_p + rate}.gif`;
        el.setAttribute('orig_src', el.src);
    };
    Rate.out = function (e) {
        let src;
        const el = this;
        if (src = el.getAttribute('orig_src')) {
            el.src = src;
        }
    };
    Rate.hover = function (e) {
        const el = this;
        if (!el.getAttribute('orig_src')) {
            el.setAttribute('orig_src', el.src);
        }
        const rate = Rate._calc_rate.call(this, e);
        el.src = `${Rate.image_path_p + rate}.gif`;
    };

    // あとで初期化を外出し
    window.ClipRate = new Rate(function (e) {
        const id = this.getAttribute('item_id');
        const form = $(`clip_form_${id}`);
        const rate = Rate._calc_rate.call(this, e);
        form.rate.value = rate;
        this.src = `${Rate.image_path_p + rate}.gif`;
        this.setAttribute('orig_src', this.src);
    });
}).call(LDR);
