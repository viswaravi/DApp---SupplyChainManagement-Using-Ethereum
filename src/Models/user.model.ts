export class  User {
    _id: string;
    password: string;
    name: string;
    username: string;
    email: string;
    public_key: String;

    
    constructor(id: string, password: string, name: string ,username: string , email: string, public_key: String) {
        this._id = id;
        this.password = password;
        this.name = name;
        this.username = username;
        this.email = email;
        this.public_key = public_key;
    }
}
