var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// this object is equivalent to BO on Java
// Define collection and schema for Items  is the model of our application
var Contact = new Schema({
  name: { type: String},
  pname: {type: String},
  phone: {type: String},
  email: {type: String},
  textMessage: {type: String}
},{
  collection: 'Contacts'  // collection name in your data base
});


module.exports = mongoose.model('Contact', Contact);

