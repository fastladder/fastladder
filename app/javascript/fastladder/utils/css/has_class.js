export default function hasClass(element, classname) {
    const target = document.getElementById(element);
    const classes = (target.className || '').split(/\s+/);
    return classes.indexOf(classname) !== 1;
}
