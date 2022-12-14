// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API !! :)'});
});
//return current time in utc and unix keys
app.get("/api", (req, res) => {
  res.json({
    utc: new Date().toUTCString(), 
    unix: new Date().getTime()
  })
}); 

app.get("/api/:timestamp", (req, res) => {
  const timestamp = req.params.timestamp; 

  if(!isNaN(Number(timestamp)) && timestamp.length === 13){
    return res.json({
      unix: Date(timestamp).valueOf(), 
      utc: new Date(Number(timestamp)).toString()
    })
  }
  //

  if(new Date(timestamp).toUTCString() !== "Invalid Date"){
    return res.json({
      unix: new Date(timestamp).valueOf(), 
      utc: new Date(timestamp).toString()
    })
    // parses and formats new dates 
  }
  res.json({error: "Invalid Date"})
  //return error message if date structure is invalid 
}); 

// listen for requests :) using process.env.PORT
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
