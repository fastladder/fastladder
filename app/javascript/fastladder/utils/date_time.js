import padStart from 'lodash/padStart';

export default class DateTime {
    static now() {
        return new DateTime();
    }

    constructor(time) {
        this._date = time ? new Date(time) : new Date();
        this._update();
    }

    toString() {
        return [this.ymd(), this.hms()].join(' ');
    }

    valueOf() {
        return this._date - 0;
    }

    _update() {
        const dt = this._date;
        this.year = dt.getFullYear();
        this.month = dt.getMonth() + 1;
        this.mon = this.month;
        this.day = dt.getDate();
        this.mday = this.day;
        this.dayOfMonth = this.day;
        this.hour = dt.getHours();
        this.minute = dt.getMinutes();
        this.min = this.minitues;
        this.second = dt.getSeconds(0);
        this.sec = this.second;
    }

    ymd(sep = '/') {
        return [this.year, this.month, this.day].map(v => padStart(`${v}`, 2, '0')).join(sep);
    }

    hms(sep = ':') {
        return [this.hour, this.minute, this.second].map(v => padStart(`${v}`, 2, '0')).join(sep);
    }

    ymdJp() {
        const [year, month, day] = [this.year, this.month, this.day].map(v => padStart(`${v}`, 2, '0'));
        return `${year}年${month}月${day}日`;
    }
}
