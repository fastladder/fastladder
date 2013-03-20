/* DOM  */
var DOM = {};
DOM.create = function(tag){
    return document.createElement(tag);
};
DOM.build = function(obj){

}
DOM.remove = function(el){
    el = _$(el);
    el.parentNode.removeChild(el);
};
DOM.hide = function(el){
    _$(el).style.display = "none";
};
DOM.show = function(el){
    _$(el).style.display = "block";
}
DOM.clone = function(el){
    return el.cloneNode(true);
}
DOM.insert = function(p,el,point){
    p.insertBefore(el,point);
};
DOM.scrollTop = function(el){
    var element = _$(el);
    return element.scrollTop;
};
DOM.move = function(el,x,y){
    el = _$(el);
    setStyle(el,{
        left : x+"px",
        top  : y+"px"
    });
};


