// use the line below on command line (not mongo command line) to import entire database; 
// mongoimport --jsonArray --db readme --collection articles --file articles.json  

// not sure what this require is for
// require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index');

// configure app
const app = express();
const port = prcoess.env.PORT || 3001;
const mongodb_uri = "mongodb://localhost:27017/readme"; 

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);

// for deployment
app.use(express.static(path.join(__dirname, "client", "build")));

mongoose.connect(process.env.MONGODB_URI || mongodb_uri, { useNewUrlParser: true, useFindAndModify: false }); 
mongoose.connection.once('open', function() { 
  console.log('Connected to the Database.');
});

mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
});

// for deployment
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(port, function() { 
  console.log(`Server listening on port ${port}.`);
});