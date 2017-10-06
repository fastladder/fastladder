import Application from '../../../app/javascript/fastladder/ldr/application';

describe('LDR.Application', () => {
    beforeEach(() => {
        global.ApiKey = 'dummy';
    });

    describe('getInstance', () => {
        const app1 = Application.getInstance();
        const app2 = Application.getInstance();
        expect(app1).toEqual(app2);
    });

    describe('#load', () => {
        it('callback with `initialized` true', (done) => {
            const app = Application.getInstance();

            app.load({}, () => {
                expect(app.initialized).toBe(true);
                done();
            });
        });
    });
});
