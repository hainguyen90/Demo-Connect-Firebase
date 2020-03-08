const express = require('express');
const firebase = require('firebase');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); //need to parse HTTP request body

const config = {
    apiKey: "AIzaSyANWbskeQcS9Fl-X_YeiFHlARzIcORwWeU",
    authDomain: "robotic-incline-270104.firebaseapp.com",
    databaseURL: "https://robotic-incline-270104.firebaseio.com",
    projectId: "robotic-incline-270104",
    storageBucket: "robotic-incline-270104.appspot.com",
    messagingSenderId: "655915623147",
    appId: "1:655915623147:web:b71bdb4f0f627b720c54ae",
    measurementId: "G-4VBDD5RG50"
  };
firebase.initializeApp(config);


app.post('/', function (req, res) {

  console.log("HTTP Post Request");
  const userName = req.body.UserName;
  const name = req.body.Name;
  const age = req.body.Age;

  const referencePath = '/Users/'+userName+'/';
  const userReference = firebase.database().ref(referencePath);
  userReference.set({Name: name, Age: age}, 
    function(error) {
      if (error) {
        res.send("Data could not be saved!. " + error);
      } 
      else {
        res.send("Data saved successfully!");
      }
    }
  );
});


app.get('/', function (req, res) {

	console.log("HTTP Get Request");
	var userReference = firebase.database().ref("/Users/");

	//Attach an asynchronous callback to read the data
	userReference.on("value", 
    function(snapshot) {
      console.log(snapshot.val());
      res.json(snapshot.val());
      userReference.off("value");
    }, 
    function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    }
  );
});




//start server on port: 8080
const server = app.listen(8080, function () {

  const host = server.address().address;
  const port = server.address().port;

  console.log("server listening at http://%s:%s", host, port);
});