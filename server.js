// Get dependencies

var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const Document = require("./server/models/projects");
// import the routing file to handle the default (index) route
var index = require('./server/routes/app');

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ...

const messageRoutes = require('./server/routes/message');
const contactRoutes = require('./server/routes/contacts')
const documentsRoutes = require('./server/routes/documents')
const completedtasksRoutes = require('./server/routes/completedtasks')

var app = express(); // create an instance of express
/*

CIT 470 - Computer Security II

 https://www.byui.edu/computer-information-technology/courses
 */

 require('dotenv').config(); // Load environment variables from .env file


const uri = `mongodb+srv://josuebcenturion:${process.env.MONGO_DB_PASSWORD}@tasks.hdcfvsq.mongodb.net/tasks?retryWrites=true&w=majority`;
// establish a connection to the mongo database
mongoose
  .set('strictQuery', false)
  // .connect("mongodb://127.0.0.1:27017/tasks", { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 })
  // CONNECTION STRING mongodb+srv://josuebcenturion:<password>@tasks.hdcfvsq.mongodb.net/tasks?retryWrites=true&w=majority"
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Connected to MongoDB');
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  })
  .catch((err) => console.log("Connection failed: " + err));


// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'

  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});



// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/tasks')));

// Tell express to map the default route ('/') to the index route
app.use('/',index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
app.use("/api/messages", messageRoutes);
app.use("/api/documents", documentsRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/completedtasks", completedtasksRoutes)

// Tell express to map all other non-defined routes back to the index page
/* app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/tasks/index.html'));
}); */

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function () {
  console.log('API running on localhost: ' + port)
});
