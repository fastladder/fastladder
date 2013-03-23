/*
 usage
  new Template("$id") -> $("id")
  new Template("aiueo") -> string
*/
function Template(str){
	if(str.isTemplate){
		str = str.tmpl;
	}
	this.tmpl = str;
	if(str.charAt(0) == "$"){
		var el = _$(str.slice(1));
		this.tmpl = (el.tagName == "textarea") ? el.value : el.innerHTML;
	}
	this.stash = {
		pre : {},
		params : {}
	};
	this.filters = [];
	this.filter_for_param = {};
	this.use_filter = false;
}
Template.prototype = {
	isTemplate: true,
	fill: function(){
		var args = Array.from(arguments);
		var builder = this.compile();
		return builder.apply(this,args);
	},
	pre_fill : function(){

	},
	add_filter: function(expr,filter){
		this.use_filter = true;
		if(expr.isString){
			var f = this.filter_for_param;
			f[expr] ? f[expr].push(filter) : (f[expr] = [filter]);
			return;
		}
		if(expr.isFunction){
			var f = function(value){return filter(value)};
			f.gate = expr;
			this.filters.push(f)
		}
	},
	add_filters : function(o){
		var self = this;
		each(o,function(value,key){
			self.add_filter(key,value)
		});
	},

	get_param : function(key){
		var params = this.stash.params;
		var pre = this.stash.pre;
		if(params.hasOwnProperty(key))
			return params[key]
		else if(pre.hasOwnProperty(key))
			return pre[key]
		return null;
	},

	filtered: function(key){
		var self  = this;
		var value = this.get_param(key);
		var res = value;
		// filters
		if(this.filters.length){
			this.filters.forEach(function(filter){
				if(filter.gate.call(self,value,key,self))
					res = filter.call(self,res,key,self)
			})
		}else if(this.filter_for_param[key]){
				this.filter_for_param[key].forEach(function(filter){
					res = filter.call(self,res,key,self)
				})
		}
		return res;
	},
	make_builder: function(buffer_ref){
		var self = this;
		var buf  = buffer_ref;
		return function(){
			var args = Array.from(arguments);
			self.stash.params = {};
			args.forEach(function(p){
				extend(self.stash.params,p)
			});
			return buf.join("")
		};
	},
	compile: function(pre_vars){
		var self = this;
		var buf = [];
		var builder = this.make_builder(buf);
		var sep = /\[\[(.*?)\]\]/g;
		var offset = 0;
		var tmpl = this.tmpl;
		tmpl.replace(sep, function(){
			var a = arguments;
			var stash = self.stash;
			var match_text = a[0];
			var match_idx = a[2];
			var key = a[1].strip();
			buf.push(tmpl.slice(offset,match_idx));
			offset = match_idx + match_text.length;
			var n = {};
			// function
			if(key.charAt(0) == "#"){
				var context = [];
				var expr = key.match(/{(.*)}/)[1];
				context.push("with(this.params){return(");
				context.push(expr);
				context.push(")}");
				n.toString = new Function(context.join("")).bind(stash);
			} else {
				n.toString = function(){
					var expr = stash.params[key];
					var res = (expr != null) ?
						(expr.isFunction)
							? "" + expr()
							: "" + self.filtered(key)
							: "";
					return res
				}
			};
			buf.push(n);
		});
		buf.push(tmpl.slice(offset));
		return builder;
	}
};


Template.get = function(id){
	var el = _$(id);
	//TODO refactor later
	if(!el) return new Template('test');
	var is_textarea = (el.tagName.toLowerCase() == "textarea");
	var v = is_textarea ? el.value : el.innerHTML;
	return new Template(v)
}
