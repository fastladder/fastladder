import { get as _$ } from '../dom';

export default function addClass(element, classname) {
    element = _$(element);
    element.classList.add(classname);
}
