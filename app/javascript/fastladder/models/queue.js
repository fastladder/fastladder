(function () {
    LDR.Queue = Class.create();
    LDR.Queue.extend({
        initialize() {
            this.queue = [];
        },

        step: 1,
        interval: 100,

        push(f) {
            this.queue.push(f);
        },

        exec() {
            const queue = this.queue;
            const step = this.step;
            const interval = this.interval;
            (function () {
                const self = arguments.callee;
                let count = 0;
                while (count < step) {
                    const f = queue.shift();
                    isFunction(f) && f();
                    count++;
                }
                if (queue.length) {
                    self.later(interval)();
                }
            }).later(interval)();
            // TODO あとでlasterは消す
        },
    });
}).call(LDR);
