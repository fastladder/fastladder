/*
 DateTime
*/
function DateTime(time){
    this._date = time ? new Date(time) : new Date;
    this._update();
    this.toString = function(){ return [this.ymd(),this.hms()].join(" ")}
    this.valueOf  = function(){ return this._date - 0 };
}

DateTime.prototype = {
    _update : function(){
        var dt = this._date;
        this.year  = dt.getFullYear();
        this.month = this.mon  = dt.getMonth() + 1;
        this.day   = this.mday = this.day_of_month = dt.getDate();
        this.hour  = dt.getHours();
        this.minute = this.min = dt.getMinutes();
        this.second = this.sec = dt.getSeconds();
    },
    ymd : function(sep){
        sep = arguments.length ? sep : "/";
        return [this.year,this.month,this.day].invoke("zerofill",2).join(sep)
    },
    hms : function(sep){
        sep = arguments.length ? sep : ":";
        return [this.hour,this.minute,this.second].invoke("zerofill",2).join(sep)
    },
    ymd_jp : function() {
        var ymd = [this.year,this.month,this.day].invoke("zerofill",2)
        return ymd[0]+"年"+ymd[1]+"月"+ymd[2]+"日";
    }
};

DateTime.now = function(){
    return new DateTime;
};
