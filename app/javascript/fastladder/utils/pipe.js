export default class Pipe {
    static get(label) {
        return Pipe[`_${label}`];
    }

    constructor(label) {
        this.queue = [];
        Pipe[`_${label}`] = this;
    }

    add(task) {
        this.queue.push(task);
    }

    call(arg) {
        let result = arg;
        this.queue.forEach((task) => {
            result = task(result);
        });
        return result;
    }
}
