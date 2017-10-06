import { get as _$ } from '../../utils/dom';
import printFeed from './print_feed';

export const baseTarget = '_blank';

export default function fixLinktarget(el = _$(printFeed.target)) {
    [...el.getElementsByTagName('a')].forEach((a) => {
        if (a.target !== '_self') {
            a.target = baseTarget;
        }
    });
}
