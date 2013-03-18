/* DOM  */
var DOM = {};
DOM.create = function(tag){
    return document.createElement(tag);
};
DOM.build = function(obj){

}
DOM.remove = function(el){
    el = $(el);
    el.parentNode.removeChild(el);
};
DOM.hide = function(el){
    $(el).style.display = "none";
};
DOM.show = function(el){
    $(el).style.display = "block";
}
DOM.clone = function(el){
    return el.cloneNode(true);
}
DOM.insert = function(p,el,point){
    p.insertBefore(el,point);
};
DOM.scrollTop = function(el){
    var element = $(el);
    return element.scrollTop;
};
DOM.move = function(el,x,y){
    el = $(el);
    setStyle(el,{
        left : x+"px",
        top  : y+"px"
    });
}


