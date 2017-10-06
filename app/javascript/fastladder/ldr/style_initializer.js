import isArray from 'lodash/isArray';
import isString from 'lodash/isString';

export default class StyleInitializer {
    constructor() {}

    // self override
    addRule(...args) {
        if (document.styleSheets) {
            // Mozilla, (safari?)
            if (document.styleSheets[0].insertRule) {
                this.addRule = (selector, property) => {
                    try {
                        document.styleSheets[0].insertRule(
                            `${selector} { ${property} }`,
                            document.styleSheets[0].cssRules.length,
                        );
                    } catch (e) {}
                };
            // IE
            } else if (document.styleSheets[0].addRule) {
                this.addRule = (selector, property) => {
                    try {
                        document.styleSheets[0].addRule(`${selector} { ${property} }`);
                    } catch (e) {}
                };
            }
        } else if (window.opera) {
            this.addRule = (selector, property) => {
                try {
                    const sheet = `${selector} { ${property} }`;
                    const link = document.createElement('link');
                    const uri = `data:text/css,${enocdeURIComponent(sheet)}`;
                    link.setAttribute('rel', 'stylesheet');
                    link.setAttribute('type', 'text/css');
                    link.setAttribute('href', uri);
                    document.getElementsByTagName('head')[0].appendChild(link);
                } catch (e) {}
            };
        }

        return this.addRule(...args);
    }

    applyRule() {
        ((...args) => {
            const [tag, props] = args;
            if (isString(tag) && isArray(props)) {
                props.forEach(v => this.addRule(tag, v));
            } else {
                this.addRule(...args);
            }
        })('pre', [
            'font-family: monospace;',
            'border: 1px solid #808080;',
            'background: #f4f2ef;',
            'padding: 1em;',
        ]);
    }
}
