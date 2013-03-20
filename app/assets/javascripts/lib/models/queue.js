(function(){
	LDR.Queue = Class.create();
	LDR.Queue.extend({
		initialize: function(){
			this.queue = [];
		},

		step : 1,
		interval : 100,

		push: function(f){
			this.queue.push(f);
		},

		exec: function(){
			var queue = this.queue;
			var step = this.step;
			var interval = this.interval;
			(function(){
				var self = arguments.callee;
				var count = 0;
				while(count < step){
					var f = queue.shift();
					isFunction(f) && f();
					count++;
				}
				if(queue.length){
					self.later(interval)()
				}
			}).later(interval)();
			//TODO あとでlasterは消す
		}
	});
}).call(LDR);
