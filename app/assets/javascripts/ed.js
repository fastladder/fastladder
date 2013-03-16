/*
 EventDispatcher
*/
var Event = {};
Event.list = [];
//Event.sweep_queue = [];
Event.sweep = function(){
	var q = Event.list;
	for(var i=0;i<q.length;i++){
		try{
			removeEvent.apply(this,q[i]);
			q[i] = null;
		}catch(e){alert(e)}
	}
};
Event.observe = addEvent;
Event.stop = function(e){
	Event.stopAction(e);
	Event.stopEvent(e);
};
Event.stopAction = function(e){
	e.preventDefault ? e.preventDefault() : (e.returnValue = false)
};
Event.stopEvent = function(e){
	e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true)
};
Event.pointerX = function(event) {
	return event.pageX || (event.clientX +
		(document.documentElement.scrollLeft || document.body.scrollLeft));
};
Event.pointerY = function(event){
	return event.pageY || (event.clientY +
		(document.documentElement.scrollTop || document.body.scrollTop));
};
Event.cancelFlag = {};
Event.cancelNext = function(type){
	Event.cancelFlag[type] = true;
}

window.onunload = Event.sweep;
function addEvent(obj, evType, fn, useCapture){
	Event.list.push(arguments);
	if(obj.addEventListener){
		obj.addEventListener(evType, fn, useCapture);
	}else if (obj.attachEvent){
		obj.attachEvent("on"+evType, fn);
	}
	var args = arguments;
	return function(){
		removeEvent.apply(this,args);
	}
}
function removeEvent(obj, evType, fn, useCapture){
	if (obj.addEventListener){
		obj.removeEventListener(evType, fn, useCapture);
		return true;
	}else if (obj.detachEvent){
		obj.detachEvent("on"+evType, fn);
	}
}
var Trigger = Class.create();
Trigger.create = function(type){
	return new Trigger(type)
};
Trigger.extend({
	_type   : null,
	initialize : function(type){
		this.event_list = [];
		this.enable = true;
		this.type = type;
	},
	apply : function(target){
		if(!target){
			target = document.body;
		} else {
			target = $(target)
		}
		addEvent(target, this.type, function(e){
			var e = e || window.event;
			var element = e.target || e.srcElement;
			if(Event.cancelFlag[e.type] == true){
				Event.cancelFlag[e.type] = false;
				return;
			}
			this.event_list.forEach(function(pair){
				this.enable && pair[0].call(element,e) && pair[1].call(element,e)
			},this)
		}.bind(this))
		this.destroy();
	},
	destroy : function(){},
	add : function(trigger, callback){
		if(isString(trigger)){
			trigger = cssTester(trigger);
		}
		this.event_list.push([
			trigger,callback
		]);
		return this
	},
	toggle : function(state){
		this.enable = arguments.length ? !this.enable : state;
		return this.enable;
	}
});
