import I18n from 'i18n-js';
import Template from '../../utils/template';

export default class FeedFormatter {
    static TMPL = Template.get('inbox_items');
    static TMPL_ADS = Template.get('inbox_adfeeds');

    constructor({ ads } = {}) {
        if (ads) {
            this.tmpl = new Template(FeedFormatter.TMPL_ADS);
        } else {
            this.tmpl = new Template(FeedFormatter.TMPL);
        }
        const feedFilters = {
            image(src) {
                if (!src) {
                    return '';
                }

                return [
                    '<img ',
                    'class="channel_image" ',
                    'src="/img/alpha/apha_01.png" ',
                    'alt="">',
                ].join('');
            },
            folder(v) {
                if (v) {
                    return v.length > 8 ? `${v.slice(0, 8)}...` : v;
                }
                return I18n.t('Uncategolized');
            },
        };
        this.tmpl.addFilter(feedFilters);
    }

    compile() {
        return this.tmpl.compile();
    }
}
