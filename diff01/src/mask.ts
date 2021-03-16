/**
 * Material refs:
 * https://casafirjan.com.br/coronavirus/covid-19-guia-de-especificacoes-para-producao-de-mascaras-e-texteis
 */

type Material = [string, number];

abstract class Mask {
    industrial: boolean;
    holder: MaskHolder;
    materials: Array<Materials>; //Material Layers in order from outside to inside
    constructor(materials: Array<string>, holder: MaskHolder) { };
    public abstract get protectionRate(): number;
    public abstract get isEPI(): boolean;

};

export class Pff2Mask extends Mask {
    private inMetroStamp: boolean;

    constructor(inMetroStamp: boolean, materials: Array<string>, holder: MaskHolder) {
        super(materials, holder);
        this.inMetroStamp = inMetroStamp;
        this.industrial = this.inMetroStamp ? true : false;
        this.materials = materials;
        this.holder = holder;
    }

    public get protectionRate() {
        return 95;
    }

    public get isEPI() {
        return this.protectionRate >= 94 && this.inMetroStamp ? true : false;
    }
};

export class HomeMask extends Mask {

    constructor(materials: Array<string>, holder: MaskHolder) {
        super(materials, holder);
        this.materials = materials;
        this.industrial = false;
    }

    public get protectionRate() {
        let cumulativeRate: number = 0;
        if (this.materials.length < 2) {
            for (let material in this.materials) {
                cumulativeRate = cumulativeRate + MaterialProtection[material]; //TODO: melhorar esse enum aqui
            }
            return cumulativeRate;
        }

        if (this.materials[0] === Materials.POLIESTER &&
            this.materials[1] === Materials.NONWOVEN &&
            this.materials[2] === Materials.COTTON) {
            cumulativeRate = cumulativeRate + 10;
        }

    }

    public get isEPI() {
        return false;
    }
};
const MaskMaterials = {
    POLIESTER: ['POLIESTER', 10] as Material,
    COTTON: ['COTTON', 30] as Material,
    WOOL: ['WOOL', 20] as Material,
    COFFEEFILTER: ['COFFEEFILTER', 20] as Material,
    NONWOVEN: ['NONWOVEN', 40] as Material,
};

export enum MaskHolder {
    EAR = 'EAR',
    HEAD = 'HEAD'
};