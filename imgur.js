require('dotenv').config()
var https = require("https");

var options = {
  protocol: "https:",
  host: 'api.imgur.com',
  path: '/3/gallery/r/funny/top/today',
  method: 'GET',
  headers: {
    'Authorization': process.env.VALUE
  }
};

var req = https.get(options, function(res) {
  console.log('STATUS: ', Object.keys(res), res.statusCode);
  console.log('WTF: ', res.connection);
  console.log('HEADERS: ' + JSON.stringify(res.headers));

  // Buffer the body entirely for processing as a whole.
  var bodyChunks = [];
  res.on('data', function(chunk) {
    // You can process streamed parts here...
    bodyChunks.push(chunk);
  }).on('end', function() {
    var body = Buffer.concat(bodyChunks);
    console.log('BODY: ' + body);
    // ...and/or process the entire body here.
  })
});

req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});


// var options = {
//     host: 'somesite.com',
//     port: 443,
//     path: '/some/path',
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// };
