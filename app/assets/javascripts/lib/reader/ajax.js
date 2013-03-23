// TODO move to utils : refactor browser detector

/*
 Ajax and Ahah
*/

function ajax(url, onload){
    var x = new _XMLHttpRequest;
    x.onload = function(){
        var res = ajax.filter(x.responseText)
        onload(res)
    }
    x.open("GET",url,true);
    x.send("");
}

// formをAjax化する
function ajaxize(element, callback){
    element = _$(element);
    var method = element.method;
    var action = element.getAttribute("action");
    // ひとつの場合は完了時処理
    if(isFunction(callback)){
        var before = True;
        var after  = callback
    } else {
        var before = callback.before || True;
        var after  = callback.after  || Function.empty;
    }
    var onsubmit = function(e){
        if(e) Event.stop(e);
        var request = Form.toJson(element);
        if(before(request)){
            var api = new LDR.API(action);
            api.onload = function(response){
                after(response,request);
            }
            api.post(request);
        }
    };
    addEvent(element, "submit", onsubmit);
    element.submit = onsubmit;
}

ajax.filter = new Pipe;
var browser = new BrowserDetect;
if(browser.isKHTML){
    ajax.filter.add(function(t){
        var esc = escape(t);
        return(esc.indexOf("%u") < 0 && esc.indexOf("%") > -1) ? decodeURIComponent(esc) : t
    })
}

function ahah(url,el,onload){
    var uniq = new Date - 0;
    onload = onload || Function.empty;
    ajax(url+"?"+uniq,function(txt){
        el = _$(el);
        txt = ahah.filter(txt);
        el.innerHTML = txt;
        ahah.global_callback(el);
        onload(txt);
    })
}

var TT = {
    config : {
        base_url  : 'http://' + location.host,
        image_base: 'http://' + location.host
    }
}
ahah.filter = new Pipe;
ahah.filter.add(function(txt){
    return txt.replace(/\[%(.*?)%\]/g, function($0,$1){
        try{
            eval("var str = TT."+$1);
            return str
        }catch(e){return ""}
    })
});
ahah.global_callback = new Pipe;
ahah.global_callback.add(function(el){
    fix_linktarget(el);
    return el;
})

function Pipe(label){
    var q = [];
    Pipe["_" + label] = q;
    var f = function(arg){
        var result = arg;
        foreach(q,function(v,i){
            result = v(result)
        })
        return result;
    };
    f.add = function(task){q.push(task)}
    return f;
}
Pipe.get = function(label){
    return Pipe["_" + label];
};

