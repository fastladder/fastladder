export default function parseCSS(text) {
    const pairs = text.split(';');
    return pairs.reduce((res, pair) => {
        const [key, value] = pair.split(':');
        res[key.trim()] = value;
        return res;
    }, {});
}
