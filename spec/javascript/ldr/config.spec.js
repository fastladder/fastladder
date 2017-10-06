import sinon from 'sinon';
import API from '../../../app/javascript/fastladder/ldr/api';
import Config from '../../../app/javascript/fastladder/ldr/config';

describe('LDR.Config', () => {
    describe('#constructor', () => {
        it('has onConfigChange', () => {
            const config = new Config();
            expect(config.onConfigChange).toEqual({});
        })
    });

    describe('#addCallback', () => {
        it('add callback to onConfigChange', (done) => {
           const config = new Config();
            config.addCallback('foo', done);
            config.onConfigChange.foo();
        });
    });

    describe('#set', () => {
        it('call #save after set', () => {
            const config = new Config();
            const saveStub = sinon.stub(config, 'set');
            config.set('param', 1);
            expect(saveStub.called).toEqual(true);
        });

        it('callback onConfigChange methods with old and new', (done) => {
            const config = new Config();
            sinon.stub(config, 'save');
            const key = 'param';
            const callback = (old, current) => {
                if (current === 2 && old === 1) {
                    done();
                }
            }
            config.addCallback(key, callback);
            config.set(key, 1);
            config.set(key, 2);
        });
    });

    describe('#save', () => {
        it('post to server', () => {
            const config = new Config();

            const postSpy = sinon.spy();
            API.prototype.post = postSpy;
            config.save();

            expect(postSpy.called).toBe(true)
        });
    });

    describe('#load', () => {
        // not valid case
        it('load config from server', () => {
            const config = new Config();

            const postSpy = sinon.spy();
            API.prototype.post = postSpy;
            config.save();

            expect(postSpy.called).toBe(true)
        });
    });

    describe('#startListener', () => {
        // not valid case
        const config = new Config();
        const spy = sinon.spy();
        config.addCallback = spy;
        config.startListener();

        expect(spy.withArgs('view_mode', sinon.match.any).calledOnce).toBe(true);
        expect(spy.withArgs('sort_mode', sinon.match.any).calledOnce).toBe(true);
        expect(spy.withArgs('current_font', sinon.match.any).calledOnce).toBe(true);
        expect(spy.withArgs('show_all', sinon.match.any).calledOnce).toBe(true);
    });
});
