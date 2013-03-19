//preload
(function(){
    var _preload = function(url, done){
        var image = new Image();
        image.src = url;
        image.onload = done;
        image.onerror = done; //allow failure
    };

    this.preload = function(assets_list, done){
        var flow = new Flow(assets_list.length, done);
        assets_list.map(function(url){
            _preload(url, function(){
                flow.pass();
            });
        });
    };
}).call(LDR);

