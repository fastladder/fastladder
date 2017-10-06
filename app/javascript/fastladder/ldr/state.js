export default class State {
    constructor() {
        this.requested = false;
        this.lastScroll = 0;
        this.lastUserAction = new Date();
        this.offsetCache = [];
        // どの範囲を表示しているのかを管理する
        this.viewrange = {
            start: 0,
            end: 0,
        };
        this.hasNext = true;
        this.autoscrollWait = 2000;
        this.showLeft = true;
    }
}
