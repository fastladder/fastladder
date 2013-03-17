// compat
Array.prototype.forEach = Array.prototype.forEach || function(callback,thisObject){
	for(var i=0,len=this.length;i<len;i++)
		callback.call(thisObject,this[i],i,this)
};
Array.prototype.map = Array.prototype.map || function(callback,thisObject){
	for(var i=0,res=[],len=this.length;i<len;i++)
		res[i] = callback.call(thisObject,this[i],i,this);
	return res
};
Array.prototype.filter = Array.prototype.filter || function(callback,thisObject){
	for(var i=0,res=[],len=this.length;i<len;i++)
		callback.call(thisObject,this[i],i,this) && res.push(this[i]);
	return res
};
Array.prototype.indexOf = Array.prototype.indexOf || function(searchElement,fromIndex){
	var i = (fromIndex < 0) ? this.length+fromIndex : fromIndex || 0;
	for(;i<this.length;i++)
		if(searchElement === this[i]) return i;
	return -1
};
Array.prototype.lastIndexOf = Array.prototype.lastIndexOf || function(searchElement,fromIndex){
	var max = this.length-1;
	var i = (fromIndex < 0)   ? Math.max(max+1 + fromIndex,0) :
			(fromIndex > max) ? max :
			max-(fromIndex||0) || max;
	for(;i>=0;i--)
		if(searchElement === this[i]) return i;
	return -1
};
Array.prototype.every = Array.prototype.every || function(callback,thisObject){
	for(var i=0,len=this.length;i<len;i++)
		if(!callback.call(thisObject,this[i],i,this)) return false;
	return true
};
Array.prototype.some = Array.prototype.some || function(callback,thisObject){
	for(var i=0,len=this.length;i<len;i++)
		if(callback.call(thisObject,this[i],i,this)) return true;
	return false
};

// generic
if(!Array.forEach){
	(function(){
		var methods = (
			"concat slice shift push unshift pop sort reverse " +
			"forEach map filter indexOf lastIndexOf every some "
		).split(" ");
		methods.forEach(function(mn){
			Array[mn] = Array[mn] || function(self,args){
				args = Array.prototype.slice.call(arguments,1);
				return Array.prototype[mn].apply(self,args);
			}
		});
	})();
}
