// Application is singleton class for manage global state.
(function(){
    // What happen? plz someone add test
    LDR.StyleInitializer = (function(){
        function StyleInitializer(){
            var that = this;
            // self override
            that.addRule = function(){
                if(document.styleSheets){
                    // Mozilla, (safari?)
                    if(document.styleSheets[0].insertRule){
                        that.addRule = (function(selector, property){
                            document.styleSheets[0].insertRule(
                                selector + "{" + property + "}",
                                document.styleSheets[0].cssRules.length);
                        })._try();
                    // IE
                    } else if(document.styleSheets[0].addRule){
                        that.addRule = function(selector, property){
                            document.styleSheets[0].addRule(selector, "{" + property + "}");
                        }._try();
                    }
                } else if(window.opera){
                    that.addRule = function(selector, property){
                        var sheet = selector + "{" + property + "}";
                        var link = document.createElement('link');
                        link.setAttribute('rel',  'stylesheet');
                        link.setAttribute('type', 'text/css');
                        link.setAttribute('href', 'data:text/css,' + encodeURIComponent(sheet));
                        document.getElementsByTagName('head')[0].appendChild(link);
                    }._try();
                }
            }._try();
        }

        var fn = StyleInitializer.prototype;

        fn.applyRule = function(){
            var that = this;
            (function(tag, props){
                var arg = arguments;
                if(isString(tag) && isArray(props)){
                    props.forEach(function(v){
                        that.addRule(tag,v);
                    });
                } else {
                    that.addRule.apply(this,arguments)
                }
            })("pre",[
                "font-family:monospace;",
                "border:1px solid #808080;",
                "background:#f4f2ef;",
                "padding:1em;"
            ]);
        }

        return StyleInitializer;
    })();

}).call(LDR);

