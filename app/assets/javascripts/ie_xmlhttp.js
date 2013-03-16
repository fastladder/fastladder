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
