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
    POLIESTER: 10,
    COTTON: 30,
    WOOL: 20,
    COFFEEFILTER: 20,
    NONWOVEN: 40
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
    private inMetroStamp: boolean;

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
        if (this.inMetroStamp) {
            return cumulativeRate;
        }

        if (this.holder === MaskHolder.EAR) {
            cumulativeRate = cumulativeRate * 0.75;
        }

        return cumulativeRate * 0.6;
    }

    public get isEPI() {
        return this.protectionRate >= 94 && this.inMetroStamp ? true : false;
    }

    public assignInmetroStamp() {
        if (this.materials.length < 3) {
            this.inMetroStamp = false;
        }

        // Regarding WHO recomendations, this material constitutes how PFF2 are made
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
            cumulativeRate = cumulativeRate * 0.75;
        }

        return cumulativeRate;

    }

    public get isEPI() {
        return false;
    }
};