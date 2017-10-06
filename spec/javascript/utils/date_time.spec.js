import DateTime from '../../../app/javascript/fastladder/utils/date_time';

describe('DateTime', () => {
    describe('#ymd', () => {
        if('returns a formatted date', () => {
            const datetime = new DateTime(new Date(2013, 4, 5, 6, 7, 8).getTime());
            expect(datetime.ymd()).toEqual('2013/05/05');
        });
    });

    describe('#hms', () => {
        it('returns a formatted time', () => {
            const datetime = new DateTime(new Date(2013, 4, 5, 6, 7, 8).getTime());
            expect(datetime.hms()).toEqual('06:07:08');
        });
    });

    describe('#ymdJp', () => {
        it('returns a formatted date in Japanese', () => {
            const datetime = new DateTime(new Date(2013, 4, 5, 6, 7, 8).getTime());
            expect(datetime.ymdJp()).toEqual('2013年05月05日');
        });
    });
});
