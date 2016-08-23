require('dotenv').config()

var https = require('https');
var PictureController = require('./con trollers/pictures');

var options = {
  protocol: "https:",
  host: 'api.imgur.com',
  path: '/3/gallery/r/funny/top/today',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': process.env.VALUE
  }
};

//if it doesn't
// https.get(options, PictureController.parsePictureData)

https.get(options, (res) => {
  console.log(res.statusCode)
  var content = ''
  res.on('data', (chunk) => { content += chunk })

  res.on('end', () => {
    console.log('done!', content)
    https.post({})
    // put a new http request ot your api
  })
})
.on('error', (e) => { console.log('explode :(')})
// getReq.on('error', function(err){
//     console.log("Error: ", err);
// });
