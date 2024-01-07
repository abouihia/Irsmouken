// imported
const express = require("express");
const Joi = require("joi");
const app = express();
var router = express.Router();
app.use(express.json());


// import the BO java script
var Contact = require('../models/contact');

//find all Contacts   service

app.get('/contacts', (req, res) => {

  Contact.find(function (err, Contacts){
        if(err){
          console.log(err);
        }
        else {
          res.json(Contacts);
        }
  });
});



module.exports = router;







