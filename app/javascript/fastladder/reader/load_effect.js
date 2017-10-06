import setStyle from '../utils/css/set_style';
import { get as _$ } from '../utils/dom';

const LoadEffect = {
    ICON_PATH: '/img/icon/',
    LOADICON_NUM: 1,
    RESTICON_NUM: 3,

    Start() {
        const L = LoadEffect;
        let path = L.ICON_PATH;
        if (L.LOADICON_NUM > 1) {
            const n = 1 + Math.floor(Math.random() * L.LOADICON_NUM);
            path += `loading${n}.gif`;
        } else {
            path += 'loading.gif';
        }
        _$('loadicon').src = path;
        setStyle('loading', { visibility: 'visible' });
    },

    Stop() {
        const L = LoadEffect;
        let path = L.ICON_PATH;
        if (L.RESTICON_NUM > 1) {
            const n = 1 + Math.floor(Math.random() * L.LOADICON_NUM);
            path += `rest${n}.gif`;
        } else {
            path += 'rest.gif';
        }
        _$('loadicon').src = path;
    },
};

export default LoadEffect;
