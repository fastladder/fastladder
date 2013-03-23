/*
 queryCSS
 - 特定のElementがCSSruleにマッチするかどうかを判別する
 based on Behaviour.js / BSD Licensed.
*/
/* That revolting regular expression explained
/^(\w+)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/
  \---/  \---/\-------------/    \-------/
    |      |         |               |
    |      |         |           The value
    |      |    ~,|,^,$,* or =
    |   Attribute
   Tag
*/
function cssTester(rule){
	return function(){
		return queryCSS(this,rule)
	}
}
function queryCSS(el,rule){
	var tokens = rule.split(' ');
	var checkFunctions = [];
	function cmp(a,b){
		return (""+a).toLowerCase() == (""+b).toLowerCase();
	}
	function isFunction(obj){
		return typeof obj == "function";
	}
	function isArray(obj){
		return obj instanceof Array;
	}
	function expr_rules(rules){
		return function(el){
			var flag = true;
			for(var i=0;i<rules.length;i++){
				var rule = rules[i];
				flag = isArray(rule) ? cmp(el[rule[0]], rule[1]) :
					isFunction(rule) ? rule(el) : rule;
				if(flag == false) return false;
			}
			return true;
		}
	}
	function attrGetter(attr){
		return function(el){
			var res = el.getAttribute(attr);
			return res ? res : ""
		}
	}
	tokens.forEach(function(token){
		var rules = [];
		token = token.replace(/^\s+(.*?)\s+$/,"$1");
		// class or id selector
		var sep =
			token.indexOf('#') > -1 ? '#' :
			token.indexOf('.') > -1 ? '.' : null;
		if(sep){
			var bits = token.split(sep);
			var tagName = bits[0];
			var value = bits[1];
			var id_or_class = sep == '#' ? 'id' : 'className';
			tagName && rules.push(['tagName', tagName]);
			rules.push([id_or_class,value]);
			checkFunctions.push(expr_rules(rules));
			return;
		}
		if(token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)){
			var tagName   = RegExp.$1;
			var attrName  = RegExp.$2;
			var op = RegExp.$3;
			var attrValue = RegExp.$4;
		 	var getA = attrGetter(attrName);
		 	if(tagName){
		 		tagName == '*' ? rules.push(true) : rules.push(['tagName', tagName]);
		 	}
			var expression =
				op == '=' ? function(el){ return (getA(el) == attrValue) } :
		 		op == '~' ? function(el){ return (getA(el).match(new RegExp('\\b'+attrValue+'\\b'))) } :
				op == '|' ? function(el){ return (getA(el).match(new RegExp('^'+attrValue+'-?'))) } :
				op == '^' ? function(el){ return (getA(el).indexOf(attrValue) == 0) } :
				op == '$' ? function(el){ return (getA(el).lastIndexOf(attrValue) == (getA(el)).length - attrValue.length) }:
				op == '*' ? function(el){ return (getA(el).indexOf(attrValue) > -1) } :
				function(e) { return getA(e) };
			rules.push(expression)
			checkFunctions.push(expr_rules(rules));
			return;
		}
		// just tagName
		var tagName = token;
		if(tagName == "*"){
			checkFunctions.push(function(){return true});
		} else {
			checkFunctions.push(expr_rules([
				["tagName", tagName]
			]));
		}
		return;
	});
	checkFunctions = checkFunctions.reverse();
	var currentNode = el;
	return checkFunctions.every(function(test,i){
		// 最後の条件
		if(i == 0){
			return test(currentNode);
		}
		// 2番目以降、親を辿る
		while(currentNode = currentNode.parentNode){
			var res = test(currentNode);
			if(res) return true
		}
		return false;
	});
}

(function (){
	var matchesSelector = (
		HTMLElement.prototype.matchesSelector ||
		HTMLElement.prototype.oMatchesSelector ||
		HTMLElement.prototype.msMatchesSelector ||
		HTMLElement.prototype.mozMatchesSelector ||
		HTMLElement.prototype.webkitMatchesSelector
	);
	var originalQueryCSS;
	if (typeof matchesSelector === 'function') {
		originalQueryCSS = queryCSS;
		queryCSS = function(el, rule) {
			try {
				return matchesSelector.call(el, rule);
			} catch (e) {
				return originalQueryCSS.call(this, el, rule);
			}
		};
	}
})();
