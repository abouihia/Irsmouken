// imported
const express = require("express");
const Joi = require("joi");
const path        = require('path');
const app = express();
const  mongoose = require('mongoose');
var fs = require('fs');



// import the BO java script
var Contact = require('./models/contact');
var routes = require('./models/event');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mean").then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);




app.use(express.json());
app.use(routes);

const courses  =[
  {id:1, name:'course1'},
  {id:2, name:'course2'},
  {id:3, name:'course3'},
  {id:4, name:'course4'}
]

//Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

//Send all other requests to the angular app
app.get('/', (req, res) => {
  res.sendFile((path.join(__dirname, 'dist/index.html')));
});


app.get('/api/contacts', (req, res)=>{
  Contact.find(function (err, Contacts){
    if(err){
      console.log(err);
    }
    else {
      res.json(Contacts);
    }
  });
});

//request to add new contact
app.post('/api/addContact', (req, res)=>{

  //Joi for validation
 // const resultValidation  = validationCourse(req.body);

  var contact = new Contact(req.body);
  contact.save().then(item => {
    res.status(200).json({'Contact': 'contact added successfully'});
  })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });

});

/************Image filed **************************/









app.get('/api/courses/:id', (req, res)=>{

  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course){
    res.status(404).send('the course with the given ide was not found');
  }

  res.send(course);
});



app.put('/api/courses/:id', (req, res)=>{
  //Lookup the course and  if not existe , return 404
  let course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course){
    return res.status(404).send('the course with the given ide was not found');
  }

  // validate if invalide , return  400  Bad request
  const {error}  = validationCourse(req.body);
  if(error){
    res.status(400).send(error.details[0].message);
    return;
  }

  // update course and return the updated course

  course.name = req.body.name;
  res.send(course);

} );


app.delete('/api/courses/:id', (req, res)=>{
  //Lookup the course and  if not existe , return 404
  let course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course){
    return res.status(404).send('the course with the given ide was not found');
  }

  // remove
  const index = courses.indexOf(courses);
  courses.splice(index,1);
  res.send(courses);
});

// PORT
const port = process.env.PORT ||4500;
// listening to
app.listen(port, () => console.log(`listening on port ${port}...`));




function validationCourse(course ){

  const schema = {
    name : Joi.string().min(3).required()
  }

  return  Joi.validate(course, schema);

}
