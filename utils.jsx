
Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

export class i18n extends Object{
    constructor(props) {
        super(props);
        this.__ = (a) => {a}
    }
}

export function c(styleVar, styles) {
    return styles.map((s) => {return styleVar[s]}).join(' ')
}

export function prettyTime(time) {
    var seconds = Math.floor(time/1000);
    var minutes = Math.floor(seconds/60);
    var hours = Math.floor(minutes/60);

    if (hours) return hours + ':' + (minutes%60).pad(2) + ':' + (seconds%60).pad(2);
    return minutes + ':' + (seconds%60).pad(2)
}
