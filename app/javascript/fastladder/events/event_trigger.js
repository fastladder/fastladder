import Hook from './hook';

export default class EventTrigger {
    constructor(...points) {
        this.triggers = points.reduce((triggers, name) => {
            const hookName = name.toLowerCase();
            triggers[hookName] = new Hook();
            return triggers;
        }, {});
    }

    addTrigger(point, callback) {
        const hookName = point.toLowerCase();
        if (this.triggers.hasOwnProperty(hookName)) {
            this.triggers[hookName].add(callback);
        }
    }

    callTrigger(point, args) {
        const hookName = point.toLowerCase();
        if (this.triggers.hasOwnProperty(hookName)) {
            this.triggers[hookName].exec(args);
        }
    }
}
