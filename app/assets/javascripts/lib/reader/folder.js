var folder = null;
var feedlink2id = {};
var Ordered = {};

function create_folder(name){
    if(!name){
        name = prompt(I18n.t('Folder Name'),"");
        if(!name) return;
    }
    var api = new LDR.API("/api/folder/create");
    api.post({name:name},function(res){
        message('create_folder_complete');
        // clear cache
        folder = null;
        Control.move_to(name)
    });
    return name;
}

var HTML = {};
HTML.IMG = function(o){
    return '<img src="'+o.src+'">';
}


// Folderを登録する。
FolderList = {};
var TreeView = Class.create();
TreeView.lazy = false;
TreeView.icon_plus = [
    HTML.IMG({src:"/img/icon/m.gif"}),
    HTML.IMG({src:"/img/icon/p.gif"})
];
TreeView.icon_open = [
    HTML.IMG({src:"/img/icon/m.gif"}) + HTML.IMG({src:"/img/icon/open.gif"}),
    HTML.IMG({src:"/img/icon/p.gif"}) + HTML.IMG({src:"/img/icon/close.gif"})
];
TreeView.count = 0;
TreeView.get_control = function(id){
    return TreeView.instance[id]
}
TreeView.instance = {};
TreeView.destroy = function(){
    for(var i=0;i<TreeView.count;i++){
        TreeView.instance["treeview_" + i] = null;
    }
};
TreeView.extend({
    initialize: function(name,value,config){
        var tv = TreeView;
        tv.count++;
        tv.instance["treeview_" + tv.count ] = this;
        var self = this;
        // var Folder = this.constructor;
        var Folder = TreeView;
        this.icon_folder = Folder["icon_open"];
        if(config){
            if(config.icon_type){
                this.icon_folder = Folder["icon_"+config.icon_type]
            }
        }
        this.state = 0;
        this.printed = 0;
        this.generator = value.isFunction ? value: function(){return value};
        this.label_text = name;

        this.element = $N("div",{
                "id"    : "treeview_" + tv.count,
                "class" : "folder_root"
            },[
            this.label = $N("span"),
            this.child = $N("div",{style:"display:none"})
        ]);
        this.set_status(name);
        this.label.onclick = this._onclick(tv.count);
        // function(){self.toggle()};
        /*this.element.className = "folder_root";*/
        if(!Folder.lazy){
            this.print( this.generator() );
            this.printed = 1;
        }
    },
    _onclick: function(id){
        return function(){ TreeView.instance["treeview_" + id].toggle() }
    },
    set_status: function(text){
        this.label.innerHTML = (
                (this.state) ? this.icon_folder[0] : this.icon_folder[1]
            ) + text;
    },
    print: function(text){
        this.child.innerHTML = text;
    },
    update: function(){
        this.set_status(this.label_text);
    },
    open: function(){
        this.state = 1;
        /* Lazy */
        if(!this.printed){
            this.print( this.generator() );
            this.printed = 1;
        }
        DOM.show(this.child);
        this.update();
    },
    close: function(){
        this.state = 0;
        DOM.hide(this.child);
        this.update();
    },
    toggle: function(){
        this.state ? this.close() : this.open();
    }
});
/*
  TreeItem
*/
function TreeItem(data){
    this.item = clone(data);
    if(this.item.unread_count == 0){
        this.item.classname = "rs-read"
    } else if(this.item.cached){
        this.item.classname = "ps-prefetched"
    } else {
        this.item.classname = " ";
    }
}
TreeItem.prototype.toString = function(){
    var item = this.item;
    return TreeItem.formatter(item)
}
TreeItem.cache = new Cache;
TreeItem.formatter = Template.get("subscribe_item").compile();


function HTMLView(element){
    this.element = element;
}
HTMLView.prototype = {
    print: function(){
        this.element.innerHTML = Array.from(arguments).join("")
    },
    clear: function(){
        this.element.innerHTML = "";
    },
    append: function(el){
        this.element.appendChild(el)
    }
};
var ListItem = Class.create().extend({
    initialize: function(){
        var self = this;
        this.onhover = function(e){
            var el = this;
            setStyle(el, self.focus_style);
            addClass(el, self.focus_class);
        };
        this.onunhover = function(e){
            var el = this;
            setStyle(el, self.normal_style);
            removeClass(el, self.focus_class);
        }
    }
});
