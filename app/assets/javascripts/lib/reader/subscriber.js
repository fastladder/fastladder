/*************************************************
   購読リストの整形。Subsの絞込みや、整形
 *************************************************/
Subscribe = {};
// Template
Subscribe.Template = {
    item   : Template.get("subscribe_item"),
    folder : Template.get("subscribe_folder")
};

// 複数のデータをロードしてもアイテムのデータを共通化する
Subscribe.Items = function(id, data){
    if(!data){
        return Subscribe.Items["_"+id]
    } else {
        return Subscribe.Items["_"+id] = data;
    }
}
var subs_item = Subscribe.Items;

Subscribe.Model = Class.create().extend({
    initialize: function(){
        this.loaded = false;
        return this;
    },
    id2subs : null,
    limited : null,
    folder_count  : null,
    folder_unread : null,
    folder_names  : null,
    load : function(list){
        this.load_start();
        this.load_partial_data(list);
        this.load_data(list);
    },
    load_data: function(list){
        this.loaded = true;
        this.list = list;
        this.generate_cache();
    },
    load_start: function(){
        this.id2subs = {};
        this.folder_count = {};
        this.folder_names = [];
        this.rate2subs = {};
        this.rate_names = [5,4,3,2,1,0];
        this.max_subs = 0;
        this.min_subs = Number.POSITIVE_INFINITY;
        this.unread_count_cache = 0;
        this.unread_feeds_count_cache = 0;
    },
    load_partial_data: function(list){
        this._generate_cache(list);
    },
    get_list: function(){
        if(app.config.use_limit_subs && app.config.limit_subs){
            return this.list.slice(0, app.config.limit_subs)
        } else {
            return this.list
        }
    },
    generate_cache: function(){
        this.folder_names = keys(this.folder_count);
        this.make_subscribers_names();
        return;
    },
    // partial
    _generate_cache: function(list){
        function push(obj,key,value){
            if(obj[key]){
                obj[key].push(value)
            } else {
                obj[key] = [value]
            }
        }
        var self = this;
        foreach(list, function(v){
            subs_item(v.subscribe_id, v);
            self.id2subs[v.subscribe_id] = v;
            push(self.rate2subs, v.rate, v);
            var t = self.folder_count[v.folder];
            self.folder_count[v.folder] = t ? t + 1 : 1;
            self.max_subs = Math.max(self.max_subs, v.subscribers_count);
            self.min_subs = Math.min(self.min_subs, v.subscribers_count);
            if(v.unread_count){
                self.unread_feeds_count_cache += 1;
            }
        });
        this.unread_count_cache += list.sum_of("unread_count");
        //alert_once(this.unread_feeds_count_cache);
    },
    make_domain_names: function(){
        function get_domain(url){
            var start = url.indexOf('//') + 2;
            var end   = url.indexOf('/', start);
            if(end == -1) end = url.length;
            return url.slice(start,end);
        }
        var domains = {};
        var domain_count = {};
        var domain_names = {};
        var domain2subs = {};
        foreach(this.list, function(v){
            var d = v.raw_domain;
            var c = d.split(".");
            var l = c.length - 1;
            for(var i=0;i<l;i++){
                var tmp = c.slice(i).join(".");
                if(domain_count[tmp] > 1 || i == l-1){
                    v.domain = tmp;
                    domain_names[tmp] = domain_names[tmp] ? domain_names[tmp]+1 : 1;
                    push(domain2subs,tmp,v);
                    return;
                }
            }
        });
        foreach(this.list, function(v){
            if(v.feedlink){
                var d = get_domain(v.feedlink);
                v.raw_domain = d;
                var c = d.split(".");
                c.length.times(function(i){
                    if(i == 1) return;
                    var v = c.slice(-i).join(".");
                    domain_count[v] = domain_count[v] ? domain_count[v]+1 : 1;
                })
            }
        });
        this.domain_names = keys(domain_names);
        this.domain_count = domain_names;
        this.domain2subs  = domain2subs;
    },
    make_subscribers_names: function(){
        var len = this.list.length;
        var split = 6;
        var limit = this.list.length / split;
        var subs_counts = this.list.pluck("subscribers_count");
        subs_counts.sort(function(a,b){
            return(
                a == b ?  0 :
                a >  b ?  1 : -1
            )
        });
        //alert(subs_counts);
        var res = [];
        var pos = 0;
        var begin = this.min_subs;
        subs_counts.forEach(function(v){
            if(pos > limit){
                var end = Math.max(begin+1,v);
                res.push(begin + "-" + end);
                begin = end + 1;
                pos = 0;
            }
            pos++;
        });
        res.push(begin + "-" + Math.max(begin+1, this.max_subs) );
        this.subscribers_names = res.reverse();
        return res;
    },
    // 任意フィルタ
    filter: function(callback){
        var filtered = this.list.filter(callback);
        return new Subscribe.Collection(filtered)
    },
    get_folder_names: function(){
        if(this.folder_names) return this.folder_names;
    },
    get_rate_names: function(){
        if(this.rate_names) return this.rate_names;
    },
    get_subscribers_names: function(){
        if(this.subscribers_names){
            // 多い順で保存されている。
            if(app.config.sort_mode == "subscribers_count:reverse"){
                return this.subscribers_names.concat().reverse();
            } else {
                return this.subscribers_names;
            }
        }
    },
    get_domain_names: function(){
        if(this.domain_names) return this.domain_names;
    },
    get_by_id: function(id){
        return this.id2subs[id]
    },
    get_by_folder: function(name){
        var filtered = this.get_list().filter_by("folder",name)
        return new Subscribe.Collection(filtered)
    },
    get_by_rate: function(num){
        var filtered = this.get_list().filter_by("rate",num);
        // filtered = this.rate2subs[num] || [];
        return new Subscribe.Collection(filtered)
    },
    get_by_subscribers_count: function(min,max){
        var filtered = this.get_list().filter(function(item){
            var c = item.subscribers_count;
            return (c >= min && c <= max);
        });
        return new Subscribe.Collection(filtered)
    },
    get_by_domain: function(domain){
        var filtered = this.domain2subs[domain] || [];
        return new Subscribe.Collection(filtered)
    },
    get_unread_feeds: function(){
        return this.filter(function(item){return item.unread_count > 0}).list;
    },
    get_unread_feeds_count: function(){
        if(this.unread_feeds_count_cache){
            return this.unread_feeds_count_cache;
        } else {
            return 0;
            return this.unread_feeds_count_cache = this.get_unread_feeds().length;
        }
    },
    get_unread_count: function(){
        if(this.unread_count_cache){
            return this.unread_count_cache
        } else {
            return this.unread_count_cache = this.list.sum_of("unread_count");
        }
    }
});

/*
 絞り込んだリスト
*/
Subscribe.Collection = Class.create().extend({
    initialize: function(list){ this.list = list },
    isCollection : true,
    get_list : function(){return this.list},
    get_unread_count: function(){
        return this.list.sum_of("unread_count")
    }
});

Subscribe.Formatter = {
    item: function(v){ return new TreeItem(v) },
    flat: function(model){
        return model.get_list().map(SF.item).join("");
    },
    folder: function(model){
        var folder_names = model.get_folder_names();
        var folders = folder_names.map(function(v){
            var filtered = model.get_by_folder(v);
            var param = {
                name : v,
                unread_count : filtered.get_unread_count()
            };
            var folder = new TreeView(
                ST.folder.fill(param),
                SF.flat.curry(filtered)
            );
            folder.param = param;
            return folder;
        });
        var sep = folders.partition(function(v){return v.param.name == ""});
        var root   = sep[0];
        var folder = sep[1];
        if(root[0]) root[0].open();
        return $DF(
            root.pluck("child").toDF(),
            folder.pluck("element").toDF()
        )
    },
    rate: function(model){
        var rate_names = model.get_rate_names();
        var rates = rate_names.map(function(v){
            var filtered = model.get_by_rate(v);
            var hosi = HTML.IMG({src:LDR.Rate.image_path + v + ".gif"});
            var param = {
                name : hosi,
                unread_count : filtered.get_unread_count(),
                feed_count : filtered.list.length
            };
            var folder = new TreeView(
                ST.folder.fill(param),
                SF.flat.curry(filtered),
                { icon_type : "plus" }
            );
            folder.param = param;
            return folder;
        });
        if(app.config.show_all){
            return rates.pluck("element").toDF()
        } else {
            return rates.filter(
                function(v){ return v.param.feed_count > 0 }
            ).pluck("element").toDF();
        }
    },
    subscribers: function(model){
        var names = model.get_subscribers_names();
        var subscribers = names.map(function(v){
            var tmp = v.split("-");
            var max = Math.max(tmp[0],tmp[1]);
            var min = Math.min(tmp[0],tmp[1]);
            var filtered = model.get_by_subscribers_count(min,max);
            var param = {
                name : min + " - " + max + " " + I18n.t('users'),
                unread_count : filtered.get_unread_count()
            };
            var folder = new TreeView(
                ST.folder.fill(param),
                SF.flat.curry(filtered)
            );
            folder.param = param;
            return folder;
        });
        if(app.config.show_all){
            return subscribers.pluck("element").toDF()
        } else {
            return subscribers.filter(
                function(v){ return v.param.unread_count > 0 }
            ).pluck("element").toDF();
        }
    },
    domain: function(model){
        var folder_names = model.get_domain_names();
        var root_items = {list:[]};
        var folders = [];
        folder_names.forEach(function(v){
            if(model.domain_count[v] < 2){
                var filtered = model.get_by_domain(v);
                filtered.list.forEach(function(v){
                    root_items.list.push(v);
                });
                return;
            }
            var filtered = model.get_by_domain(v);
            var img = filtered.list.pluck("icon").mode();
            var favicon  = HTML.IMG({src:img});
            var param = {
                name :  favicon +" "+ v,
                unread_count : filtered.get_unread_count()
            };
            var folder = new TreeView(
                ST.folder.fill(param),
                SF.flat.curry(filtered),
                { icon_type : "plus" }
            );
            folder.param = param;
            folders.push(folder);
        });
        var param = {
            name : " *"
        };
        var root = new TreeView(
            ST.folder.fill(param),
            SF.flat.curry(root_items),
            { icon_type : "plus" }
        );
        return $DF(
            root.element,
            folders.pluck("element").toDF()
        )
    }
};

