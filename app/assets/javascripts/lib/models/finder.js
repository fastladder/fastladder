function Finder(id){
    this.input = _$(id);
    this.enable = true;
    this.callback = [];
    this.input.style.color = "#444";
    var self = this;
    var old = "";
    setInterval(function(){
        var q = self.input.value;
        if(old != q){
            old = q;
            self.callback.forEach(function(c){c(q)});
        }
    }, 600);
}
Finder.prototype = {
    add_callback: function(callback){
        this.callback.push(callback)
    },
    clear: function(){
        this.input.value = ""
    },
    focus: function(){
        this.input.focus();
    }
};

