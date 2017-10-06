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
function cssTester(rule) {
    return function () {
        return queryCSS(this, rule);
    };
}
function queryCSS(el, rule) {
    const tokens = rule.split(' ');
    let checkFunctions = [];
    function cmp(a, b) {
        return (`${a}`).toLowerCase() == (`${b}`).toLowerCase();
    }
    function isFunction(obj) {
        return typeof obj === 'function';
    }
    function isArray(obj) {
        return obj instanceof Array;
    }
    function expr_rules(rules) {
        return function (el) {
            let flag = true;
            for (let i = 0; i < rules.length; i++) {
                const rule = rules[i];
                flag = isArray(rule) ? cmp(el[rule[0]], rule[1]) :
                    isFunction(rule) ? rule(el) : rule;
                if (flag == false) return false;
            }
            return true;
        };
    }
    function attrGetter(attr) {
        return function (el) {
            const res = el.getAttribute(attr);
            return res || '';
        };
    }
    tokens.forEach((token) => {
        const rules = [];
        token = token.replace(/^\s+(.*?)\s+$/, '$1');
        // class or id selector
        const sep =
   token.indexOf('#') > -1 ? '#' :
       token.indexOf('.') > -1 ? '.' : null;
        if (sep) {
            const bits = token.split(sep);
            var tagName = bits[0];
            const value = bits[1];
            const id_or_class = sep == '#' ? 'id' : 'className';
            tagName && rules.push(['tagName', tagName]);
            rules.push([id_or_class, value]);
            checkFunctions.push(expr_rules(rules));
            return;
        }
        if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
            var tagName = RegExp.$1;
            const attrName = RegExp.$2;
            const op = RegExp.$3;
            const attrValue = RegExp.$4;
		 	const getA = attrGetter(attrName);
		 	if (tagName) {
		 		tagName == '*' ? rules.push(true) : rules.push(['tagName', tagName]);
		 	}
            const expression =
    op == '=' ? function (el) { return (getA(el) == attrValue); } :
		 		op == '~' ? function (el) { return (getA(el).match(new RegExp(`\\b${attrValue}\\b`))); } :
            op == '|' ? function (el) { return (getA(el).match(new RegExp(`^${attrValue}-?`))); } :
                op == '^' ? function (el) { return (getA(el).indexOf(attrValue) == 0); } :
                    op == '$' ? function (el) { return (getA(el).lastIndexOf(attrValue) == (getA(el)).length - attrValue.length); } :
                        op == '*' ? function (el) { return (getA(el).indexOf(attrValue) > -1); } :
                            function (e) { return getA(e); };
            rules.push(expression);
            checkFunctions.push(expr_rules(rules));
            return;
        }
        // just tagName
        var tagName = token;
        if (tagName == '*') {
            checkFunctions.push(() => true);
        } else {
            checkFunctions.push(expr_rules([
                ['tagName', tagName],
            ]));
        }
    });
    checkFunctions = checkFunctions.reverse();
    let currentNode = el;
    return checkFunctions.every((test, i) => {
        // 最後の条件
        if (i == 0) {
            return test(currentNode);
        }
        // 2番目以降、親を辿る
        while (currentNode = currentNode.parentNode) {
            const res = test(currentNode);
            if (res) return true;
        }
        return false;
    });
}

(function () {
    const matchesSelector = (
        HTMLElement.prototype.matchesSelector ||
  HTMLElement.prototype.oMatchesSelector ||
  HTMLElement.prototype.msMatchesSelector ||
  HTMLElement.prototype.mozMatchesSelector ||
  HTMLElement.prototype.webkitMatchesSelector
    );
    let originalQueryCSS;
    if (typeof matchesSelector === 'function') {
        originalQueryCSS = queryCSS;
        queryCSS = function (el, rule) {
            try {
                return matchesSelector.call(el, rule);
            } catch (e) {
                return originalQueryCSS.call(this, el, rule);
            }
        };
    }
}());
