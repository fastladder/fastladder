import preload from '../../../app/javascript/fastladder/utils/preload';

describe('utils/preload', () => {
    it('callback after all image fetched', (done) => {
        const assets = [
            '/img/rate/0.gif',
            '/img/rate/1.gif',
            '/img/rate/2.gif',
        ];

        preload(assets, done);
    });
});
