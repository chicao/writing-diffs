/**
 * Material refs:
 * https://casafirjan.com.br/coronavirus/covid-19-guia-de-especificacoes-para-producao-de-mascaras-e-texteis
 */

const availableMaterials = [
    'POLIESTER',
    'COTTON',
    'WOOL',
    'COFFEEFILTER',
    'NONWOVEN'
];

const materialsProtectionRate = {
    POLIESTER: 20.0,
    COTTON: 25.0,
    WOOL: 20.0,
    COFFEEFILTER: 20.0,
    NONWOVEN: 50.0
};

export enum MaskHolder {
    EAR = 'EAR',
    HEAD = 'HEAD'
};

abstract class Mask {
    industrial: boolean;
    holder: MaskHolder;
    materials: Array<string>;
    public abstract get protectionRate(): number;
    public abstract get isEPI(): boolean;
};

export class Pff2Mask extends Mask {
    public inMetroStamp: boolean;

    constructor(materials: Array<string>, holder: MaskHolder, industrial: boolean) {
        super();
        this.inMetroStamp = false;
        this.industrial = industrial;
        this.materials = materials;
        this.holder = holder;
    }

    public get protectionRate(): number {
        let cumulativeRate = 0;
        this.materials.forEach(material => {
            cumulativeRate = cumulativeRate + materialsProtectionRate[material]
        });

        if (this.holder === MaskHolder.EAR) {
            cumulativeRate = cumulativeRate * 0.85;
        }

        if (this.holder === MaskHolder.HEAD) {
            cumulativeRate = cumulativeRate * 1.00;
        }

        return cumulativeRate;
    }

    public get isEPI() {
        return this.protectionRate >= 80 && this.industrial ? true : false;
    }

    public assignInmetroStamp() {
        if (this.materials.length < 3) {
            this.inMetroStamp = false;
        }

        if (this.materials[0] === availableMaterials[0] &&
            this.materials[1] === availableMaterials[4] &&
            this.materials[2] === availableMaterials[1] &&
            this.holder === MaskHolder.HEAD) {
            this.inMetroStamp = true;
        }
    }
};

export class HomeMask extends Mask {

    constructor(materials: Array<string>, holder: MaskHolder) {
        super()
        this.materials = materials;
        this.industrial = false;
        this.holder = holder;
    }

    public get protectionRate(): number {
        let cumulativeRate: number = 0;
        this.materials.forEach(material => {
            cumulativeRate = cumulativeRate + materialsProtectionRate[material]
        });

        if (this.holder === MaskHolder.EAR) {
            cumulativeRate = cumulativeRate * 0.65;
        }

        if (this.holder === MaskHolder.HEAD) {
            cumulativeRate = cumulativeRate * 0.75;
        }

        return cumulativeRate;

    }

    public get isEPI() {
        return false;
    }
};