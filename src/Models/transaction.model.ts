export class  Transaction {
    _id: number;
    from: string;
    to: string;
    location: string;
    cost: number;

    constructor(id: number, 
        from: string,
        to: string,
        cost: number,
        location: string
        ) {
            this.from = from;
            this.to = to;
            this._id = id;
            this.cost = cost;
            this.location =location;
    }
}
