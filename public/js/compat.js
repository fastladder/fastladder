// compat
Array.prototype.forEach = function(callback,thisObject){
	for(var i=0,len=this.length;i<len;i++)
		callback.call(thisObject,this[i],i,this)
};
Array.prototype.map = function(callback,thisObject){
	for(var i=0,res=[],len=this.length;i<len;i++)
		res[i] = callback.call(thisObject,this[i],i,this);
	return res
};
Array.prototype.filter = function(callback,thisObject){
	for(var i=0,res=[],len=this.length;i<len;i++)
		callback.call(thisObject,this[i],i,this) && res.push(this[i]);
	return res
};
Array.prototype.indexOf = function(searchElement,fromIndex){
	var i = (fromIndex < 0) ? this.length+fromIndex : fromIndex || 0;
	for(;i<this.length;i++)
		if(searchElement === this[i]) return i;
	return -1
};
Array.prototype.lastIndexOf = function(searchElement,fromIndex){
	var max = this.length-1;
	var i = (fromIndex < 0)   ? Math.max(max+1 + fromIndex,0) :
			(fromIndex > max) ? max :
			max-(fromIndex||0) || max;
	for(;i>=0;i--)
		if(searchElement === this[i]) return i;
	return -1
};
Array.prototype.every = function(callback,thisObject){
	for(var i=0,len=this.length;i<len;i++)
		if(!callback.call(thisObject,this[i],i,this)) return false;
	return true
};
Array.prototype.some = function(callback,thisObject){
	for(var i=0,len=this.length;i<len;i++)
		if(callback.call(thisObject,this[i],i,this)) return true;
	return false
};

// generic
if(!Array.forEach){
	(function(){
		var methods = "forEach map filter indexOf lastIndexOf every some".split(" ");
		methods.forEach(function(mn){
			Array[mn] = function(){
				// var args = Array.from(arguments);
				var args = Array.prototype.slice.call(arguments, 0);
				var self = args.shift();
				return Array.prototype[mn].apply(self,args);
			}
		});
	})();
}


(function(){
// IE
if(typeof ActiveXObject == "function"){
	var empty = function(){};
	_XMLHttpRequest = function(){
		var self = this;
		var props = "readyState,responseText,responseXML,status,statusText".split(",");
		this.readyState  = 0;
		this.__request__ = new ActiveXObject("Microsoft.XMLHTTP");
		this.__request__.onreadystatechange = function(){
			for(var i=0;i<props.length;i++){
				try{
					self[props[i]] = self.__request__[props[i]]
				}catch(e){
				}
			}
			self.onreadystatechange();
			if(self.readyState == 4){
				self.onload();
				self.__request__.onreadystatechange = empty;
				self.__request__ = null;
				self.onreadystatechange = empty;
				self.onload = empty;
			}
		}
		this.onreadystatechange = empty;
		this.onload = empty;
	}
	var methods = "open,abort,send,setRequestHeader,getResponseHeader,getAllResponseHeaders".split(",");
	var make_method = function(name){
		_XMLHttpRequest.prototype[name] = function(){
			var params = new Array(arguments.length);
			for(var i=0;i<params.length;i++) params[i] = "_"+i;
			return Function(
				params.join(","),
				["return this.__request__.",name,"(",params.join(","),")"].join("")
			).apply(this,arguments);
		}
	};
	for(var i=0;i<methods.length;i++) make_method(methods[i]);
	try{ XMLHttpRequest = _XMLHttpRequest } catch(e){}
} else if(typeof XMLHttpRequest != "undefined"){
	_XMLHttpRequest = XMLHttpRequest;
}
})();