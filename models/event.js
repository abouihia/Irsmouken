var express = require('express');
var router = express.Router();
var multer = require('multer');
var bodyParser = require("body-parser")
var fs = require("fs");
var mongoose = require('mongoose');

//path and originalname are the fields stored in mongoDB
var imagePath = mongoose.Schema({
  path: {
    type: String,
    required: true,
    trim: true
  },
  originalname: {
    type: String,
    required: true
  }
},{
  collection: 'ImageStore'  // collection name in your data base
});

// var ImageData = module.exports = mongoose.model('ImageData', imagedata);
var Image = module.exports = mongoose.model('files', imagePath);

router.getImages = function(callback, limit) {

  Image.find(callback).limit(limit);
}


router.getImageById = function(id, callback) {

  Image.findById(id, callback);

}

router.addImage = function(image, callback) {
  Image.create(image, callback);
}


// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log("je passe par la1");
    cb(null, 'uploads/')
    console.log("je passe par la2");
  },
  filename: function(req, file, cb) {
    console.log("je passe par la3");
    cb(null, req.body.img.replace("C:\\fakepath\\", ""));
  }
});

var upload = multer({
  storage: storage
});


router.post('/api/addImage', upload.any(), function(req, res, next) {


  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      console.log("je passe par la1");
      cb(null, 'uploads/')
      console.log("je passe par la2");
    },
    filename: function(req, file, cb) {
      console.log("je passe par la3");
      cb(null, req.body.img.replace("C:\\fakepath\\", ""));
    }
  });



  console.log("je passe par la0");
  var path = 'uploads/'+req.body.img.replace("C:\\fakepath\\", "");
  var imageName = req.body.img.replace("C:\\fakepath\\", "");

  var imagepath = {};
  imagepath['path'] = path;
  imagepath['originalname'] = imageName;

  router.addImage(imagepath, function(err) {
  });

});
//======================================================================================

router.get('/picture/:id',function(req,res){
  Image.findById(req.params.id,function(err,file){
    if (err) {
      throw err;
    }
    console.log(file);
    console.log(file.path);
    res.render("home.ejs",{image: file.path});

  });
});

//======================================================================================

module.exports = router;
