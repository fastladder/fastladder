//preload
(function(){
    var _preload = function(url, done){
        var image = new Image();
        image.src = url;
        image.onload = done;
    };

    var preload = this.preload = function(assets_list, done){
        var asset_count = assets_list.length;
        var done_count = 0;

        assets_list.map(function(url){
            _preload(url, function(){
                if(++done_count >= asset_count){
                    if(typeof done === 'function'){
                        done();
                    }
                }
            });
        });
    };
}).call(LDR);

