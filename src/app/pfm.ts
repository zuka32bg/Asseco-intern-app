export class Pfm {
    public id: number;

    public beneficiaryName: string;

    public date: Date;

    public direction: string;

    public amount: string;

    public currency: string;


    public description: string;
    public mcc: number;
    public kind: string;
    public catcode: string;


    constructor(
        id: number,
        beneficiaryName: string,
        date: Date,
        direction: string,
        amount: string,
        description: string,
        currency: string,
        subCategory: string,
        mcc: number,
        kind: string,
        catcode: string

    ) {
        this.id = id;
        this.beneficiaryName = beneficiaryName;
        this.date = date;
        this.direction = direction;
        this.amount = amount;
        this.currency = currency;
        this.description = description;
        this.mcc = mcc;
        this.kind = kind;
        this.catcode = catcode;


    }
}

