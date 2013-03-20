/*
 Prototype拡張
*/
Function.empty = function(){};

/*
 String.prototype
*/
String.prototype.startWith = function(str){
	return this.indexOf(str) == 0
};
String.prototype.aroundTag = function(tag){
	return ["<",tag,">",this,"</",tag,">"].join("")
};
String.prototype.strip_tags = function(){
	return this.replace(/<.*?>/g, "")
};

/*
String.prototype.escapeHTML = function() {
	var div = document.createElement('div');
	var text = document.createTextNode(this);
	div.appendChild(text);
	return div.innerHTML;
};
String.prototype.unescapeHTML = function() {
	var div = document.createElement('div');
	div.innerHTML = this.stripTags();
	return div.childNodes[0] ? div.childNodes[0].nodeValue : '';
};
*/
// 簡易テンプレート
String.prototype.fill  = function(){
	var param = {};
	Array.from(arguments).forEach(function(o){
		extend(param,o)
	})
	return this.replace(/\[\[(.*?)\]\]/g,function($0,$1){
		var key = $1.strip();
		return param[key] ? param[key] : "";
	})
};
/*
 Number.prototype
*/
Number.prototype.toRelativeDate = function(){
	var k = this > 0 ? this : -this;
	var u = "sec";
	var jp = {
		sec : "秒",
		min : "分",
		hour: "時間",
		day : "日",
		Mon : "ヶ月"
	};
	var vec = this >= 0 ? "前" : "後";
	var st = 0;
	(k>=60) ? (k/=60,u="min",st=1) : 0;
	(st && k>=60) ? (k/=60,u="hour",st=1) : st=0;
	(st && k>=24) ? (k/=24,u="day" ,st=1) : st=0;
	(st && k>=30) ? (k/=30,u="Mon" ,st=1) : st=0;
	k = Math.floor(k);
	v = jp[u];
	return (isNaN(k)) ? "nan" : k+v+vec;
}

Array.prototype.reject = function(callback, thisObj){
	return this.filter(callback.invert(), thisObj);
}

Array.prototype.filter_by = function(attr,value){
	return this.filter(function(v){
		return v[attr] == value
	})
}
Array.prototype.sum = function(){
	var sum = 0;
	this.forEach(function(v){
		sum += v;
	});
	return sum;
};
Array.prototype.sum_of = function(name){
	return this.pluck(name).sum();
};
// documentFragmentに変換
Array.prototype.toDF = function(){
	var nodelist = this;
	var df = document.createDocumentFragment();
	foreach(nodelist,function(node){
		df.appendChild(node)
	});
	return df;
};
// 条件に一致する最初のoffset値を返す
Array.prototype.indexOfA = function(callback,thisObj){
	for(var i=0,len=this.length;i<len;i++){
		if(callback.call(thisObj,this[i],i,this)){
			return i
		}
	}
	return -1
}
// 複数の関数をひとつにまとめる
Array.prototype.asCallback = function(){
	var self = this;
	var args = arguments;
	return function(){
		return self.map(function(fn){
			return fn.apply(self,args)
		})
	}
}

Array.prototype.indexOfStr = function(searchElement,fromIndex){
	searchElement = "" + searchElement;
	var i = (fromIndex < 0) ? this.length+fromIndex : fromIndex || 0;
	for(;i<this.length;i++)
		if(searchElement == this[i]) return i;
	return -1
};

Array.prototype.mode = function(){
	var hash = {};
	var len = this.length;
	this.forEach(function(v,i){
		hash[v] = hash[v] ? hash[v]+1 : 1;
	});
	var mode = keys(hash).sort(function(a,b){
		return  hash[b] - hash[a];
	});
	return mode[0];
};

Array.prototype.sort_by = function(key){
	return this.sort(function(a,b){
		return(
			a[key] == b[key] ? 0:
			a[key] <  b[key] ? 1: -1
		)
	})
}

// 補完
Array.prototype.like = function(str){
	var res;
	var find = 0;
	this.forEach(function(v){
		if(find) return;
		if(v.startWith(str)){
			find = 1;
			res  = v;
		}
	});
	return res;
}

/*
 Function.prototype
*/
Function.prototype.add_bench = function(id){
	var self = this;
	return function(){
		var start = new Date;
		var res = self.apply(this,arguments);
		var end = new Date;
		_$(id).innerHTML = end-start + "ms";
		return res;
	}
};
// 束縛
Function.prototype.curry = function () {
	var args = Array.from(arguments);
	var self = this;
	return function () {
		return self.apply(this, args.concat(Array.from(arguments)));
	};
};
Function.prototype.bindArgs = Function.prototype.curry;

Function.prototype.addAfter = function(callback){
	var self = this;
	return function(){
		var res = self.apply(this, arguments);
		if(isFunction(callback)){
			callback();
		}
		return res;
	}
}


Function.prototype.later = function(ms){
	var self = this;
	return function(){
		var args = arguments;
		var thisObject = this;
		var res = {
			complete: false,
			cancel: function(){clearTimeout(PID);},
			notify: function(){clearTimeout(PID);later_func()}
		};
		var later_func = function(){
			self.apply(thisObject,args);
			res.complete = true;
		};
		var PID = setTimeout(later_func,ms);
		return res;
	};
};

Function.prototype.invert = function(){
	var self = this;
	return function(){
		var res = self.apply(this, arguments);
		return res ? false : true;
	}
}

Function.prototype.next = function(fn){
	var self = this;
	fn = isFunction(fn) ? fn : Function.empty;
	return function(){
		var res = self.apply(this,arguments);
		fn();
		return res;
	}
};

