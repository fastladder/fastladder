import { get as _$ } from '../dom';

export default function removeClass(element, classname) {
    element = _$(element);
    element.classList.remove(classname);
}
