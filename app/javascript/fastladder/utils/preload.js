import { Flow } from 'flow_js';

function _preload(url, done, timeout = 2000) {
    const image = new Image();
    image.src = url;
    image.onload = done;
    image.onerror = done; // allow failure
    setTimeout(() => {
        image.onload = null;
        image.onerror = null;
        done();
    }, timeout);
}

export default function preload(assetsList, done) {
    const flow = new Flow(assetsList.length, done);
    assetsList.map(url => _preload(url, () => flow.pass()));
}
