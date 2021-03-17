
describe('Class Pff2Mask', () => {

    beforeEach();
    afterEach();
    afterAll();

    describe('Verified PFF2', () => {
        let pff2Mask: Pff2Mask
        beforeAll(() => {
            pff2Mask = new Pff2Mask(
                true,
                ['POLIESTER', 'NONWOMEN', 'COTTON'],
                MaskHolder.HEAD);
        });
        describe('protecionRate', () => {
            it('should have a brazilian standartized protection rate', () => {

            });
        });

        describe('isEPI', () => {

        });
    });

    describe('Unverified PFF2', () => { });
});