var round_corner_init;

(function(){
	function addEvent(obj, evType, fn, useCapture){
		if(obj.addEventListener){
			obj.addEventListener(evType, fn, useCapture);
		}else if (obj.attachEvent){
			obj.attachEvent("on"+evType, fn);
		}
	}
	function make_corner(){
		if(document.body.className == "top") return;
		var c = _$("content");
		round_corner(c);
		return;
	}
	round_corner_init = function(){
		addEvent(window, "load", make_corner);
	}
	function round_corner(el){
		el = _$(el);
		var browser = new BrowserDetect;
		if(browser.isFirefox){
			setStyle(el, {"-moz-border-radius" : "20px"});
			return;
		}
		var bar_style = {position:"relative",textAlign:"left"};
		function dot_style(o){
			var base = {
				position:"absolute",display:"block",color:"#fff",
				width:"20px",height:"20px",fontSize:"1px",
				border: "0px solid #000",
				backgroundRepeat:"no-repeat"
			};
			return Object.extend(base, o);
		}
		function create_corner(style){
			return $N("SPAN", {style:dot_style(style)});
		}
		var top_left = create_corner({
			top:"0px",left:"0px",backgroundImage:"url(/img/r_01.gif)"
		})
		var top_right = create_corner({
			top:"0px",right:"-1px",backgroundImage:"url(/img/r_02.gif)"
		});
		var bottom_left = create_corner({
			top:"-0px",left:"0px",backgroundImage:"url(/img/r_03.gif)"
		});
		var bottom_right = create_corner({
			top:"-0px",right:"-0px",backgroundImage:"url(/img/r_04.gif)"
		});
		setStyle(el, {position: "relative"});
		var top = $N("DIV",{style:bar_style},[top_left,top_right]);
		var bottom_white = $N("DIV",{style:{margin: "0 20px", border: "0px solid #000",height:"20px", background:"#fff" }});
		var bottom_inner = $N("DIV",{style:bar_style},[bottom_left,bottom_right]);
		var bottom = $N("DIV", {style:{margin: "0 20px", height: "20px" }}, [bottom_inner, bottom_white]);
		bottom.className = "corner_bottom";
		el.style.borderBottom = "1px solid #fff";
		el.insertBefore(top,el.firstChild);
		el.parentNode.insertBefore(bottom, el.nextSibling);
	}
})();

round_corner_init();

