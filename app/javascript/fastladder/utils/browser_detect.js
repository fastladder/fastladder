export default class BrowserDetect {
    constructor() {
        this.ua = navigator.userAgent;
    }

    get isKHTML() {
        return this.ua.indexOf('KHTML') > -1;
    }

    get isMac() {
        return this.ua.indexOf('Macintosh') > -1;
    }

    get isWin() {
        return this.ua.indexOf('Windows') > -1;
    }

    get isWindows() {
        return this.isWin;
    }

    get isGecko() {
        return this.ua.indexOf('Gecko') > -1 && !this.isKHTML;
    }

    get isFirefox() {
        return this.ua.indexOf('Firefox') > -1;
    }

    get isOpera() {
        return !!window.opera;
    }

    get isIE() {
        return !this.isOpera && this.ua.indexOf('MSIE') > -1;
    }
}
