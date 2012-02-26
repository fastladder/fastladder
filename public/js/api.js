/*
 API
*/
var API = Class.create();
API.extend({
	initialize: function(ap){ this.ap = ap },
	onCreate:   function(){},
	onComplete: function(){},
	post: function(param,onload){
		this.req = new _XMLHttpRequest;
		var onload = onload || this.onload;
		var oncomplete = this.onComplete;
		if(typeof onload != "function"){
			onload = Function.empty;
		}
		var req = this.req;
		Object.extend(param, API.StickyQuery);
		var postdata = Object.toQuery(param);
		this.req.open("POST",this.ap,true);
		this.req.setRequestHeader(
			"Content-Type", "application/x-www-form-urlencoded"
		);
		/*
		this.req.onreadystatechange = function(){
			//window.status = req.readyState;
		};*/
		this.req.onload = function(){
			oncomplete();
			//alert([this.ap,this.req.responseText.length]);
			API.last_response = req.responseText;
			var json = JSON.parse(this.req.responseText);
			if(json){
				onload(json);
			} else {
				message("データをロードできません");
				show_error();
			}
			this.req = null;
			
		}.bind(this);
		// alert(postdata);
		this.onCreate();
		this.req.send(postdata);
		return this;
	},
	get: function(param,onload){
		this.req = new _XMLHttpRequest;
		var onload = onload || this.onload;
		var oncomplete = this.onComplete;
		if(typeof onload != "function"){
			onload = Function.empty;
		}
		var req = this.req;
		Object.extend(param, API.StickyQuery);
		var postdata = Object.toQuery(param);
		this.req.open("GET",this.ap + "?" + postdata,true);
		this.req.onload = function(){
			oncomplete();
			API.last_response = req.responseText;
			var json = JSON.parse(this.req.responseText);
			if(json){
				onload(json);
			} else {
				message("データをロードできません")
			}
			this.req = null;
		}.bind(this);
		this.onCreate();
		this.req.send(null);
		return this;
	},
	requester: function(method,param){
		return function(onload){
			return this[method.toLowerCase()](param,onload)
		}.bind(this)
	},
	onload:  function(){},
	onerror: function(error_code){
		alert("エラーコード :"+ error_code)
	}
});
API.last_response = "";
API.registerCallback = function(options){
	each(options,function(value,key){
		API.prototype["on"+key] = value;
	})
};

/* for JSONP */
function ScriptLoader(ap){
	this.ap = ap;
};
ScriptLoader.prototype = {
	pre_params: {},
	get: function(param, callback){
		var self = this;
		this.count = ScriptLoader.count;
		ScriptLoader.count++;
		self.param = param;
		callback = callback || self.onload;
		ScriptLoader.callback["_"+this.count] = function(){
			callback.apply(self, arguments);
			self._remove();
		};
		ScriptLoader.connection_count++;
		var p = {};
		Object.extend(p, this.pre_params);
		Object.extend(p, param);
		if(!p.callback){
			p["callback"] = "ScriptLoader.callback._" + this.count;
		}
		var query = this._query(p);
		var url = this.ap + "?" + query;
		this._append(url);
	},
	post: function(){ /* Not support */
	},
	onload: function(){},
	_query: function(self){
		var buf = [];
		for(var key in self){
			var value = self[key];
			if(isFunction(value)) continue;
			buf.push(
				encodeURIComponent(key)+"="+
				encodeURIComponent(value)
			)
		}
		return buf.join("&");
	},
	_append: function(url){
		var s = document.createElement("script");
		s.type = "text/javascript";
		s.charset = "utf-8";
		s.src = url;
		this._script = s;
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(s)
	},
	_remove: function(){
		ScriptLoader.connection_count--;
		if(ScriptLoader.DEBUG) return;
		delete ScriptLoader.callback["_" + this.count];
		try{
			var head = document.getElementsByTagName("head")[0];
			head.removeChild(this._script)
		}catch(e){}
	}
};
ScriptLoader.count = 0;
ScriptLoader.callback = {};
ScriptLoader.connection_count = 0;
ScriptLoader.DEBUG = true;
