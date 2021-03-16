import { HomeMask, Pff2Mask } from '../src/mask';
import { MaskHolder } from '../src/mask';

describe('Class Pff2Mask', () => {
    let headHolderStandardPff2Mask: Pff2Mask
    let earHolderStandardPff2Mask: Pff2Mask
    let headHolderNonStandardPff2Mask: Pff2Mask
    let earHolderNonStandardPff2Mask: Pff2Mask

    beforeAll(() => {
        headHolderStandardPff2Mask = new Pff2Mask(
            ['POLIESTER', 'NONWOVEN', 'COTTON'],
            MaskHolder.HEAD,
            true);

        earHolderStandardPff2Mask = new Pff2Mask(
            ['POLIESTER', 'NONWOVEN', 'COTTON'],
            MaskHolder.EAR,
            true);

        headHolderNonStandardPff2Mask = new Pff2Mask(
            ['POLIESTER', 'WOOL', 'COTTON'],
            MaskHolder.HEAD,
            true);

        earHolderNonStandardPff2Mask = new Pff2Mask(
            ['POLIESTER', 'WOOL', 'COTTON'],
            MaskHolder.EAR,
            true);
    });

    describe('protecionRate', () => {
        it('should have a regular material protection rate for MASK HEAD HOLDER', () => {
            expect(headHolderStandardPff2Mask.protectionRate).toBe(95.00);
            expect(headHolderNonStandardPff2Mask.protectionRate).toBe(65.00);
        });

        it('should have a penalized regular material protection rate for MASK EAR HOLDER', () => {
            expect(earHolderStandardPff2Mask.protectionRate).toBe(80.75);
            expect(earHolderNonStandardPff2Mask.protectionRate).toBe(55.25);
        });
    });

    describe('assignInmetroStamp', () => {
        it('should assign InMetro stamp for OMS recommended materials with HEAD holder', () => {
            headHolderStandardPff2Mask.assignInmetroStamp();
            expect(headHolderStandardPff2Mask.inMetroStamp).toBe(true);
        });

        it('should NOT assign InMetro stamp for OMS recommended materials BUT with HEAD holder', () => {
            earHolderStandardPff2Mask.assignInmetroStamp();
            expect(earHolderStandardPff2Mask.inMetroStamp).toBe(false);
        });

        it('should NOT assign InMetro stamp for random materials REGARDLESS of holder type', () => {
            headHolderNonStandardPff2Mask.assignInmetroStamp();
            earHolderNonStandardPff2Mask.assignInmetroStamp();

            expect(headHolderNonStandardPff2Mask.inMetroStamp).toBe(false);
            expect(earHolderNonStandardPff2Mask.inMetroStamp).toBe(false);
        });

    });

    describe('isEPI', () => {
        it('should be an EPI if has a high air filtering rate', () => {
            expect(headHolderStandardPff2Mask.isEPI).toBe(true);
            expect(earHolderStandardPff2Mask.isEPI).toBe(true);
        });

        it('should NOT be an EPI if has low air filtering rate', () => {
            expect(headHolderNonStandardPff2Mask.isEPI).toBe(false);
            expect(earHolderNonStandardPff2Mask.isEPI).toBe(false);
        });
    });

});

describe('Class HomeMask', () => {
    let headHolderHomeMask: HomeMask
    let earHolderHomeMask: HomeMask

    beforeAll(() => {
        headHolderHomeMask = new HomeMask(
            ['NONWOVEN', 'COTTON', 'COFFEEFILTER'],
            MaskHolder.HEAD);

        earHolderHomeMask = new HomeMask(
            ['NONWOVEN', 'COTTON', 'COFFEEFILTER'],
            MaskHolder.EAR);
    });

    describe('protecionRate', () => {
        it('should have some protection rate for MASK HEAD HOLDER', () => {
            expect(headHolderHomeMask.protectionRate).toBe(71.25);
            expect(earHolderHomeMask.protectionRate).toBe(61.75);
        });
    });

    describe('isEPI', () => {
        it('should NOT be an EPI since it is HOME MADE', () => {
            expect(headHolderHomeMask.isEPI).toBe(false);
            expect(earHolderHomeMask.isEPI).toBe(false);
        });
    });

});