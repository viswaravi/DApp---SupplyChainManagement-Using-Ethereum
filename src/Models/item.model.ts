export class  Item {
    _id: number;
    name: string;
    quantity: number;
    location: string;
    cost: number;
    owner: String;
    txcount: number;

    constructor(id: number, 
        name: string, 
        quantity: number,
        location: string,
        cost: number,
        owner: String,
        txcount: number) {
        
            this._id = id;
            this.cost = cost;
            this.location =location;
            this.name =name;
            this.owner =owner;
            this.quantity = quantity;
            this.txcount = txcount;
    }
}
