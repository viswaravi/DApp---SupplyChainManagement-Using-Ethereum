var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    password: {type: String},
    name : {type:String},
    username:{type:String},
    email:{type:String},
    public_key:{type:String}
    });

module.exports = mongoose.model('user',schema);