import { get as _$ } from '../dom';

export default function switchClass(element, classname) {
    element = _$(element);
    const cl = element.className;
    const [ns] = classname.split('-');
    const cls = cl.split(/\s+/);
    const buf = [];
    cls.forEach((v) => {
        if (!v.startsWith(`${ns}-`)) {
            buf.push(v);
        }
    });
    buf.push(classname);
    element.className = buf.join(' ');
}
