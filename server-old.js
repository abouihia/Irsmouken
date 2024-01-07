const express     = require('express');
const  mongoose = require('mongoose');
const path        = require('path');

const app = express();
app.use(express.json());

//API file for interacting with mongoDB
const api  = require ('./router/api');


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mean").then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);



//Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));


//API location
app.use('/api', api);

// PORT
const port = process.env.PORT ||4500;

// listening to
app.listen(port, () => console.log(`listening on port ${port}...`));


//Send all other requests to the angular app
app.get('*', (req, res) => {
  res.sendFile((path.join(__dirname, 'dist/index.html')));
});
